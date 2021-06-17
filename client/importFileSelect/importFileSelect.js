import {ImportData} from '../../imports/api/importData';

Template.importFileSelect.onCreated(function() {
    this.subscribe("importObject");
});

Template.importFileSelect.onRendered(function() {
    Session.set("infoImported", false);
});

Template.importFileSelect.helpers({
    infoImported: function() {
        return Session.get("infoImported");
    },
});

Template.importFileSelect.events({
    'change #ebayFile' (event) {
        var filename = $("#ebayFile").val();
        // console.log("Filename is: " + filename);
        document.getElementById('customFileUpload').innerHTML = filename;
        document.getElementById("customFileUpload").className = "custom-file-selected";
    },
    'click #parseFileBtn' (event) {
        event.preventDefault();
        console.log("Got Here!");
        var importFile = document.getElementById("ebayFile").files[0];
        // make sure we have a file
        if (importFile == "" || importFile == null) {
            console.log("Error: No File Detected!");
        } else {
            console.log("Made it to parsing.");
            Papa.parse(importFile, {
                delimiter: ",",
                header: true,
                dynamicTyping: false,
                complete: function(results) {
                    console.log("Waiting...");
                    console.dir(results);
                    Session.set("importResults", results);
                    Meteor.call("import_parsedData", results, function(err, result) {
                        if (err) {
                            console.log("Error calling the import API: " + err);
                            Session.set("infoImported", false);
                        } else {
                            // console.log("Import API Called Successfully! Result is: " + result);
                            Session.set("infoImported", true);
                        }
                    });
                    // FlowRouter.go('/verifyData');
                },
                error: function(error) {
                    console.log("Error on parse: " + error);
                },
            });
        }

    },
    'click #showPrevImportedData' (event) {
        event.preventDefault();
        Session.set("infoImported", true);
    },
});