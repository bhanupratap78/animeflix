# # Importing Libraries
from itertools import count
import sys
import os
import uuid
import base64
from app import app

import flask
from flask import jsonify

# from flask_cors import CORS
# app = flask.Flask(__name__)
# CORS(app)
app.config["DEBUG"] = True

from flask_cors import CORS
app = flask.Flask(__name__)
CORS(app)

import urllib.request
from flask import Flask, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename

# # Setting up configparser
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

# # MySQL
from datetime import date, datetime, timedelta
import mysql.connector

cnx = mysql.connector.connect(user=config['MYSQL']['user'], password=config['MYSQL']['password'],
                              host=config['MYSQL']['host'],
                              database=config['MYSQL']['database'])
# cnx.close()
cursor = cnx.cursor(buffered=True)


ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# # Setting Values
random_uuid = str(uuid.uuid4())

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
	
@app.route('/')
def upload_form():
	return render_template('signin.html')

@app.route('/authenticate', methods=['POST'])
def singin():
	# email=request.form.get("email", "")
	# enc_password= request.form.get("enc_password", "")

	req_data = request.get_json()
	email = req_data['username']
	enc_password = req_data['password']

	# print('email', file=sys.stdout)
	print(email)
	print('password')
	print(enc_password)

	# cursor = cnx.cursor()
	
	# select_customer = (:SELEC:)
	query = ("SELECT email, enc_password FROM customer WHERE email = %s AND enc_password = %s")
	cursor.execute(query, (email, enc_password))

	print('cursor')#, file=sys.stderr)
	print(cursor)

	user = cursor.fetchone()
	print('user')
	print(user)
	status = ''
	if user:
		print('Success')
		status = 'Success'
	else:
		print('Failure')
		status= 'Failure'

	return jsonify({ 'status': status})
	
	# cnx.commit()
	# cursor.close()
	# cnx.close()

@app.route('/adduser', methods=['POST'])
def upload_image():
	# if 'file' not in request.files:
	# 	flash('No file part')
	# 	return redirect(request.url)

	# file = request.files['file']

	req_data = request.get_json()
	firstname = req_data['name']
	email = req_data['username']
	enc_password= req_data['password']
	plan= req_data['owner_type']

	print(firstname)
	print(email)
	print(enc_password)
	print(plan)
	
	lastname=''#request.form.get("last_name", "")
	gender=''#request.form.get("gender", "")
	phone=''#request.form.get("phone", "")
	genres=''#request.form.get("genres", "")
	

	
	add_customer = ("INSERT INTO customer "
                "(firstname, lastname, gender, phone, email, enc_password, genres, plan) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
				
	data_customer = (firstname, lastname, gender, phone, 
                        email, enc_password, genres, plan)
						
	cursor.execute(add_customer, data_customer)
	cnx.commit()

	# cursor.close()
	# cnx.close()

	# print(cursor.rowcount)

	# flash('DB successfully updated')
	# return render_template('signin.html')#, filename=filename)

	return jsonify({
        'status': 'Success'
    })


@app.route('/display/<filename>')
def display_image(filename):
	#print('display_image filename: ' + filename)
	return redirect(url_for('static', filename='uploads/' + filename), code=301)

if __name__ == "__main__":
    app.run(host='0.0.0.0')