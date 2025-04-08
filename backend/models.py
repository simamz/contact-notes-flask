from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    telepon = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
