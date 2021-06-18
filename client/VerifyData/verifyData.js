import { ImportData } from '../../imports/api/importData.js';


Template.verifyData.onCreated(function() {
    this.subscribe("importObject");
});

Template.verifyData.onRendered(function() {
    Session.set("duplicateState", true);
});

Template.verifyData.helpers({
    items: function() {
        let data = ImportData.find({});
        console.dir(data);
        return data;
    },
    duplicate: function() {
        return Session.get("duplicateState");
    }
});

Template.verifyData.events({
    'click #CleanUpDuplicateSRN' (event) {
        event.preventDefault();

        Meteor.call('fix_duplicate_srn', function(err, result) {
            if (err) {
                console.log("There was an error fixing the duplicate SRNs: " + err);
            } else {
                console.log("SRNs updated to remove duplicates successfully.");
                Session.set("duplicateState", false);
            }
        });
    },
    'click #SaveDataToMetabase' (event) {
        event.preventDefault();
        console.log("Clicked the Save button");
        // Let's call a meteor method that will pull the mongo
        // db data, and save it to mariadb via mysql queries.
        Meteor.call('saveDataToMariaDB', function (err, result) {
            if (err) {
                console.log("Error saving data to MariaDB: " + err);
            } else {
                console.log("Successfully saved data to MariaDB!");
            }
        });
    },
    'change .Size-Input' (event) {
        event.preventDefault();
        let edit_id = event.currentTarget.id;
        // create an object to hold the edit_id and a boolean
        // that says you changed the value for that field.
        // Set that as a session variable, and use it to
        // change the value in mongo db on focusout event.
        Session.set("changeId", edit_id);
    },
    'focusout .Size-Input' (event) {
        event.preventDefault();
        let edit_id = event.currentTarget.id;
        let change_id = Session.get("changeId");
        let sizeEnt = $("#" + edit_id).val();

        if (change_id == edit_id) {
            // call method to update the size for the _id of 
            // this record.
            let idParts = edit_id.split('_');
            let changeId = idParts[1];
            // console.log("_id to change in db id: " + changeId);
            
            Meteor.call('update_size', changeId, sizeEnt, function(err, result) {
                if (err) {
                    console.log("Error updating size: " + err);
                } else {
                    console.log("Size updated successfully.");
                }
            });
        }
        
    },
});