import { ImportData } from '../../imports/api/importData.js';

Template.importDb.onCreated(function() {
    this.subscribe("importObject");
});

Template.importDb.onRendered(function() {

});

Template.importDb.helpers({

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
            } else {
                console.log("Successfully pulled data from DB!");
            }
        });
    },
});
