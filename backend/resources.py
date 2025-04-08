from flask import Blueprint, request, jsonify
from models import Contact
from schemas import contact_schema, contacts_schema
from config import db

api = Blueprint('api', __name__)

@api.route('/contacts', methods=['GET'])
def get_contacts():
    all_contacts = Contact.query.all()
    return contacts_schema.jsonify(all_contacts)

@api.route('/contacts', methods=['POST'])
def add_contact():
    data = request.get_json()
    new_contact = Contact(
        nama=data['nama'],
        telepon=data['telepon'],
        email=data['email']
    )
    db.session.add(new_contact)
    db.session.commit()
    return contact_schema.jsonify(new_contact)

@api.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    contact = Contact.query.get_or_404(id)
    data = request.get_json()
    contact.nama = data['nama']
    contact.telepon = data['telepon']
    contact.email = data['email']
    db.session.commit()
    return contact_schema.jsonify(contact)

@api.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Deleted'})
