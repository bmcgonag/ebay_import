import { ImportData } from '../../imports/api/importData.js';

Template.importDb.onCreated(function() {
    this.subscribe("importObject");
});

Template.importDb.onRendered(function() {
    Session.set("dbPull", "none");
});

Template.importDb.helpers({
    dbPull: function() {
        return Session.get("dbPull");
    }
});

Template.importDb.events({
    'click #importFromDb' (event) {
        event.preventDefault();
        let dbhost = $("#dbhost").val();
        let dbname = $("#dbname").val();
        let dbuser = $("#dbuser").val();
        let dbpass = $("#dbpass").val();

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
});
