#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Imports
from flask_restful import Resource, reqparse
import rethinkdb as r

# Decorators imports
from api.decorators.rethinkdb_decorators import rethinkdb_connection

# Methods imports
from api.methods.encryption_methods import encrypt_password


# Users resource
class Users(Resource):

    # GET
    @rethinkdb_connection
    def get(self, conn):
        """
        Return all the existing users
        """
        users = r.table("users").run(conn)

        return {"response": [user for user in users]}, 200

    # POST
    @rethinkdb_connection
    def post(self, conn):
        """
        Create a new user
        """
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, help="This is the username of the user")
        parser.add_argument("password", type=str, help="This is the password of the user")
        parser.add_argument("email", type=str, help="This is the email address of the user")
        parser.add_argument("organization", type=str, help="This is the organization id that the user is going to be on")
        parser.add_argument("group", type=str, help="This is the group that the user is going to be on")
        args = parser.parse_args()

        result = r.table("users").insert([{
            "username": args["username"],
            "password": encrypt_password(args["password"]),
            "email": args["email"],
            "organizations": [args["organization"]],
            "groups": [args["group"]]
        }]).run(conn)

        if result["inserted"] == 1:
            return {"response": "Successfully created the user!"}, 201, {"Location": f"/user/{args['username']}"}

        else:
            return {"response": "Error 409! The user already exists!"}, 409
