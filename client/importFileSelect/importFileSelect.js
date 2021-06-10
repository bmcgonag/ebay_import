

Template.importFileSelect.onCreated(function() {

});

Template.importFileSelect.onRendered(function() {

});

Template.importFileSelect.helpers({

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
                    FlowRouter.go('/verifyData');
                },
                error: function(error) {
                    console.log("Error on import: " + error);
                },
            });
        }

    },
});