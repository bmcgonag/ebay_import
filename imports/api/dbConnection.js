import { Meter } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import mysql from 'mysql2';

export const DBConnect = new Mongo.Collection('db_connect');

DBConnect.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    "saveDBCreds" (dbhost, dbname, dbuser, dbpass, dbport) {
        check(dbhost, String);
        check(dbname, String);
        check(dbuser, String);
        check(dbpass, String);
        check(dbport, String);

        let dbCredscount = DBConnect.find({}).count();
        let dbCreds = DBConnect.findOne({});
        if (dbCredscount > 0) {
            return DBConnect.update({ _id: dbCreds._id }, {
                $set: {
                    dbhost: dbhost,
                    dbname: dbname,
                    dbuser: dbuser,
                    dbpass: dbpass,
                    dbport: dbport
                }
            });
        } else {
            return DBConnect.insert({
                dbhost: dbhost,
                dbname: dbname,
                dbuser: dbuser,
                dbpass: dbpass,
                dbport: dbport
            });
        }  
    },
});