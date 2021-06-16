import { ImportData } from '../../imports/api/importData.js';


Template.verifyData.onCreated(function() {
    this.subscribe("importObject");
});

Template.verifyData.onRendered(function() {

});

Template.verifyData.helpers({
    items: function() {
        return ImportData.find({});
    },
});

Template.verifyData.events({

});