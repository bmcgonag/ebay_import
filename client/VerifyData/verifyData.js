Template.verifyData.onCreated(function() {

});

Template.verifyData.onRendered(function() {

});

Template.verifyData.helpers({
    parsedOut: function() {
        let parsedInfo = Session.get("importResults");
        return parsedInfo;
    }
});

Template.verifyData.events({

});