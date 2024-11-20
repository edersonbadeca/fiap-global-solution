from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@0.0.0.0:5432/mydatabase'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)
