from flask import Blueprint, jsonify
from sqlalchemy import select

from app.database import db
from app.decorators import validate_json
from app.models import Author
from app.schemas import BasicSchema, IDSchema
from app.services import get_articles_by_author, get_entities

authors_bp = Blueprint("authors", __name__, url_prefix="/authors")


@authors_bp.route("")
def list_authors():
    stmt = select(Author)
    authors = db.session.execute(stmt).scalars().all()
    return jsonify([author.to_dict() for author in authors]), 200


@authors_bp.route("", methods=["POST"])
@validate_json
def add_author(data):
    schema = BasicSchema.model_validate(data)
    author = Author(name=schema.name)
    db.session.add(author)
    db.session.commit()
    return jsonify(author.to_dict()), 201


@authors_bp.route("", methods=["DELETE"])
@validate_json
def delete_authors(data):
    schema = IDSchema.model_validate(data)
    author_ids = schema.ids
    authors = get_entities(author_ids, Author)
    authors_dict = [author.to_dict() for author in authors]
    for author in authors:
        articles = get_articles_by_author(author.id)
        if articles:
            return (
                jsonify({"error": f"The author {author.id} has associated articles."}),
                409,
            )
        db.session.delete(author)
    db.session.commit()
    return (
        jsonify(
            {
                "deleted": authors_dict,
                "count": len(authors),
            }
        ),
        200,
    )
