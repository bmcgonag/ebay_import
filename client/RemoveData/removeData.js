import { ImportData } from '../../imports/api/importData.js';

Template.removeData.onCreated(function() {
    this.subscribe("importObject");
});

Template.removeData.onRendered(function() {
    Session.set("removeData", "none");
});

Template.removeData.helpers({
    dataRemoved: function() {
        return Session.get("removeData");
    },
});

Template.removeData.events({
    'click #removeAllData' (event) {
        event.preventDefault();

        Meteor.call('removeTheData', function(err, result) {
            if (err) {
                console.log("Error deleting the data: " + err);
                Session.set("removeData", "error");
            } else {
                Session.set("removeData", "success");
            }
        });
    },
});
