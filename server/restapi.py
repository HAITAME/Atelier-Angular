from flask import Flask, request  , jsonify
import myCar as car

import users as User
import json
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import bcrypt
from flask_cors import CORS, cross_origin
import mysql.connector
import json
import datetime
from functools import wraps

import bcrypt
import os
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)

jwt=JWTManager(app)
app.config['JWT_SECRET_KEY']= 'super_secret'
cors = CORS(app)


mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="",
            database="crudcar"
        )
   
# les web methods 

@app.route('/savecar' , methods = ['POST'])
@jwt_required()
def saveCar():
    args = request.json
    id_car = args.get('id')
    model = args.get('model')
    hp = args.get('hp')
    marque = args.get('marque')

    myCursor = mydb.cursor()

    mycar = car.Car(0 , model ,hp , marque )
    req = "insert into car (model , hp , marque ) values (%s , %s , %s)"
    val = (mycar.model , mycar.hp , mycar.marque)
    myCursor.execute(req , val)
    mydb.commit()
    print(myCursor.rowcount, "record ins")

  
    return "Saved : "


@app.route('/cars' , methods = ['GET'])
@jwt_required()
def getCars():
    mylist = []
    req = "select * from car"
    

    myCursor = mydb.cursor()
    myCursor.execute(req)
    myresult = myCursor.fetchall()
    for x in myresult:
        mylist.append(car.Car(x[0] ,x[1], x[2] , x[3]).__dict__)

    return json.dumps(mylist)

@app.route('/deletecar/<int:id_car>', methods=['DELETE'])
@jwt_required()
def deleteCar(id_car):
    myCursor = mydb.cursor()
    req = "DELETE FROM car WHERE id_car = %s"
    val = (id_car,)
    myCursor.execute(req, val)
    mydb.commit()
    print(myCursor.rowcount, "record(s) deleted")
    return "Deleted"

@app.route('/updatecar/<int:id_car>', methods=['PUT'])
@jwt_required()
def updateCar(id_car):
    args = request.json
    model = args.get('model')
    hp = args.get('hp')
    marque = args.get('marque')
    
    myCursor = mydb.cursor()
    
    req = "UPDATE car SET model = %s , hp = %s , marque = %s WHERE id_car = %s"
    val = (model, hp, marque, id_car)
    myCursor.execute(req, val)
    mydb.commit()
    print(myCursor.rowcount, "record(s) updated")
    return "Updated"


@app.route('/login' , methods = ['POST'])
def login():
    try:
        username = request.json.get("username")
        password = request.json.get("password")

        if not username or not password or len(username) < 3 or len(password) < 3:
            return jsonify({"data": "Bad username or password"}), 401

        cursor = mydb.cursor()
        req = "SELECT * FROM users WHERE username = %s"
        val = (username,)
        cursor.execute(req, val)
        result = cursor.fetchone()
        if result is None:
            return jsonify({"status": "error", "data": "Bad username or password"}), 401
        user = User(result[1], result[2])
        compare_passwords = bcrypt.checkpw(password.encode('utf8'), user.password.encode('utf8'))
        if not compare_passwords:
            return jsonify({"status": "error", "data": "Bad username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify({"status": "success", "data": {"jwt": access_token}}), 201
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "data": "An error has occurred"}), 401
    
@app.route('/register' , methods = ['POST'])
def register():
    try:
        username = request.json.get("username")
        password = request.json.get("password")
        cursor = mydb.cursor()
        req = "INSERT INTO users (username, password) VALUES (%s, %s)"
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf8'), salt)
        user = User(username, hashed_password)
        val = (user.name, user.password)
        cursor.execute(req, val)
        mydb.commit()
        access_token = create_access_token(identity=username)
        return jsonify({"status": "success", "data": {"jwt": access_token}}), 201
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "data": "An error has occurred"}), 401



  
if __name__ == '__main__':
   app.run(host="0.0.0.0", port="5000", debug=True)