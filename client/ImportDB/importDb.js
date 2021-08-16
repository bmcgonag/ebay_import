import { ImportData } from '../../imports/api/importData.js';

Template.importDb.onCreated(function() {
    this.subscribe("importObject");
});

Template.importDb.onRendered(function() {
    Session.set("dbPull", "none");
    Session.set("dbhostval", false);
    Session.set("dbuserval", false);
    Session.set("dbpassval", false);
    Session.set("dbportval", false);
    Session.set("dbnameval", false);
});

Template.importDb.helpers({
    dbPull: function() {
        return Session.get("dbPull");
    },
    fieldsGood: function() {
        let dbhost = Session.get("dbhostval");
        let dbname = Session.get("dbnameval");
        let dbuser = Session.get("dbuserval");
        let dbpass = Session.get("dbpassval");
        let dbport = Session.get("dbportval");

        if (dbhost == false || dbname == false || dbuser == false || dbpass == false || dbport == false) {
            console.log("returning disabled.");
            return "disabled";
        } else {
            console.log("returning empty string.");
            return "";
        }
    },
});

Template.importDb.events({
    'click #importFromDb' (event) {
        event.preventDefault();
        let dbhost = $("#dbhost").val();
        let dbname = $("#dbname").val();
        let dbuser = $("#dbuser").val();
        let dbpass = $("#dbpass").val();
        let dbport = $("#dbport").val();

        Meteor.call('pullDataFromMariaDB', dbhost, dbuser, dbpass, dbname, function(err, result) {
            if (err) {
                console.log("Error puling data from DB: " + err);
                Session.set("dbPull", "error");
            } else {
                console.log("Successfully pulled data from DB!");
                Session.set("dbPull", "success");
            }
        });
    },
    'click #exportToDb' (event) {
        event.preventDefault();

        let dbhost = $("#dbhost").val();
        let dbname = $("#dbname").val();
        let dbuser = $("#dbuser").val();
        let dbpass = $("#dbpass").val();
        let dbport = $("#dbport").val();

        // call the method to export the data to Maria DB.

    },
    'click #saveConnectionInfo' (event) {
        event.preventDefault();

        let dbhost = $("#dbhost").val();
        let dbname = $("#dbname").val();
        let dbuser = $("#dbuser").val();
        let dbpass = $("#dbpass").val();
        let dbport = $("#dbport").val();

        if (dbhost == "" || dbhost == null) {
            console.log("dbhost is required.");
            return;
        }

        if (dbname == "" || dbname == null) {
            console.log("dbname is required.");
            return;
        }

        if (dbuser == "" || dbuser == null) {
            console.log("dbuser is required.");
            return;
        }

        if (dbpass == "" || dbpass == null) {
            console.log("dbpass is required.");
            return;
        }

        if (dbport == "" || dbport == null) {
            console.log("dbport is required.");
            return;
        }

        // call method to save the data to the database now.


    },
    'focusout #dbhost' (event) {
        let dbhost = $("#dbhost").val();
        if (dbhost == "" || dbhost == null) {
            Session.set("dbhostval", false);
        } else {
            Session.set("dbhostval", true);
        }
    },
    'focusout #dbuser' (event) {
        let dbuser = $("#dbuser").val();
        if (dbuser == "" || dbuser == null) {
            Session.set("dbuserval", false);
        } else {
            Session.set("dbuserval", true);
        }
    },
    'focusout #dbname' (event) {
        let dbname = $("#dbname").val();
        if (dbname == "" || dbname == null) {
            Session.set("dbnameval", false);
        } else {
            Session.set("dbnameval", true);
        }
    },
    'focusout #dbpass' (event) {
        let dbpass = $("#dbpass").val();
        if (dbpass == "" || dbpass == null) {
            Session.set("dbpassval", false);
        } else {
            Session.set("dbpassval", true);
        }
    },
    'focusout #dbport' (event) {
        let dbport = $("#dbport").val();
        if (dbport == "" || dbport == null) {
            Session.set("dbportval", false);
        } else {
            Session.set("dbportval", true);
        }
    },
    'click #testConnection' (event) {
        event.preventDefault();

        let dbhost = $("#dbhost").val();
        let dbname = $("#dbname").val();
        let dbuser = $("#dbuser").val();
        let dbpass = $("#dbpass").val();
        let dbport = $("#dbport").val();

        // Call the method to test the db connection

        
    },
});
