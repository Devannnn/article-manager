from flask import Blueprint, jsonify
from sqlalchemy import select

from app.database import db
from app.decorators import validate_json
from app.models import Tag
from app.schemas import BasicSchema, IDSchema
from app.services import get_entities

tags_bp = Blueprint("tags", __name__, url_prefix="/tags")


@tags_bp.route("")
def list_tags():
    stmt = select(Tag)
    tags = db.session.execute(stmt).scalars().all()
    return jsonify([tag.to_dict() for tag in tags]), 200


@tags_bp.route("", methods=["POST"])
@validate_json
def add_tag(data):
    schema = BasicSchema.model_validate(data)
    tag = Tag(name=schema.name)
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.to_dict()), 201


@tags_bp.route("", methods=["DELETE"])
@validate_json
def delete_tags(data):
    schema = IDSchema.model_validate(data)
    tags = get_entities(schema.ids, Tag)
    for tag in tags:
        db.session.delete(tag)
    db.session.commit()
    return (
        jsonify({"deleted": [tag.to_dict() for tag in tags], "count": len(tags)}),
        200,
    )
