import { ImportData } from '../../imports/api/importData.js';

Template.convertData.onCreated(function() {
    this.subscribe("importObject");
});

Template.convertData.onRendered(function() {
    Session.set("showDataNow", false);
});

Template.convertData.helpers({
    showData: function() {
        return Session.get("showDataNow");
    },
    dataPreview: function() {
        let queryKey = Session.get("queryKey");
        let convertTo = Session.get("convertTo");
        let queryParam = {};
        queryParam[queryKey] = 1;
        
        return ImportData.find({}, queryParam);
    },
});

Template.convertData.events({
    'click #showDataPreview' (event) {
        event.preventDefault();
        let key = $("#data-field").val();
        let convType = $("#convert-to").val();
        Session.set("queryKey", key);
        Session.set("convertTo", convType);
        Session.set("showDataNow", true);
    },
});