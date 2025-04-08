from flask import Flask
from config import init_app, db
from models import Contact
from resources import api

app = Flask(__name__)
init_app(app)
app.register_blueprint(api)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
