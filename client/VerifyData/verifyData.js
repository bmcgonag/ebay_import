import { ImportData } from '../../imports/api/importData.js';


Template.verifyData.onCreated(function() {
    this.subscribe("importObject");
});

Template.verifyData.onRendered(function() {

});

Template.verifyData.helpers({
    items: function() {
        let data = ImportData.find({});
        console.dir(data);
        return data;
    },
});

Template.verifyData.events({
    'click #CleanUpDuplicateSRN' (event) {
        event.preventDefault();

        Meteor.call('fix_duplicate_srn', function(err, result) {
            if (err) {
                console.log("There was an error fixing the duplicate SRNs: " + err);
            } else {
                console.log("SRNs updated to remove duplicates successfully.");
            }
        });
    },
    'click #SaveDataToMetabase' (event) {
        event.preventDefault();
        console.log("Clicked the Save button");
    },
});