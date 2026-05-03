import logging

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import select

from app.database import db
from app.decorators import get_user_id, validate_json
from app.models import Article, Author
from app.schemas import ArticleSchema, IDSchema
from app.services import (
    associate_tags,
    check_url_uniqueness,
    get_entities,
    get_entity,
    get_or_create_by_name,
    update_model_fields,
)

logger = logging.getLogger("article_manager.articles")

articles_bp = Blueprint("articles", __name__, url_prefix="/articles")


@articles_bp.route("")
@jwt_required()
@get_user_id
def list_articles(user_id):
    stmt = select(Article).where(Article.user_id == user_id)
    articles = db.session.execute(stmt).scalars().all()
    logger.debug("Listed %d articles for user_id=%d", len(articles), user_id)
    return jsonify([article.to_dict() for article in articles]), 200


@articles_bp.route("", methods=["POST"])
@jwt_required()
@validate_json
@get_user_id
def add_article(data, user_id):
    schema = ArticleSchema.model_validate(data)
    if not check_url_uniqueness(schema.url, user_id):
        logger.warning("Add article failed — duplicate URL for user_id=%d: %s", user_id, schema.url)
        return jsonify({"error": "URL already exists"}), 409

    tags = associate_tags(schema.tags, user_id)
    author = get_or_create_by_name(Author, schema.author, user_id)

    article = Article(
        user_id=user_id,
        title=schema.title,
        url=schema.url,
        year=schema.year,
        summary=schema.summary,
        consulted=schema.consulted,
        read_later=schema.read_later,
        liked=schema.liked,
        author_id=author.id,
        tags=tags,
    )
    db.session.add(article)
    db.session.commit()
    logger.info("Article created: id=%d title=%r user_id=%d", article.id, article.title, user_id)
    return jsonify(article.to_dict()), 201


@articles_bp.route("", methods=["PUT"])
@jwt_required()
@validate_json
@get_user_id
def edit_article(data, user_id):
    schema = ArticleSchema.model_validate(data)
    if schema.id is None:
        logger.warning("Edit article failed — missing id for user_id=%d", user_id)
        return jsonify({"error": "Missing id"}), 400
    if not check_url_uniqueness(schema.url, user_id, schema.id):
        logger.warning("Edit article failed — duplicate URL for user_id=%d article_id=%d: %s", user_id, schema.id, schema.url)
        return jsonify({"error": "URL already exists"}), 409
    article = get_entity(schema.id, Article, user_id)
    tags = associate_tags(schema.tags, user_id)
    author = get_or_create_by_name(Author, schema.author, user_id)
    payload = schema.model_dump()
    payload["author_id"] = author.id
    payload["tags"] = tags
    update_model_fields(
        article,
        payload,
        {
            "title",
            "author_id",
            "tags",
            "url",
            "year",
            "summary",
            "consulted",
            "read_later",
            "liked",
        },
    )
    db.session.commit()
    logger.info("Article updated: id=%d title=%r user_id=%d", article.id, article.title, user_id)
    return (jsonify(article.to_dict()), 200)


@articles_bp.route("", methods=["DELETE"])
@jwt_required()
@validate_json
@get_user_id
def delete_articles(data, user_id):
    schema = IDSchema.model_validate(data)
    article_ids = schema.ids
    articles = get_entities(article_ids, Article, user_id)
    articles_dict = [article.to_dict() for article in articles]
    for article in articles:
        db.session.delete(article)
    db.session.commit()
    logger.info("Articles deleted: ids=%s user_id=%d count=%d", schema.ids, user_id, len(articles))
    return (
        jsonify(
            {
                "deleted": articles_dict,
                "count": len(articles),
            }
        ),
        200,
    )
