Template.sidenav.onCreated(function() {

});

Template.sidenav.onRendered(function() {

});

Template.sidenav.helpers({

});

Template.sidenav.events({
    'click .navOption' (event) {
        event.preventDefault();
        let clickedId = event.currentTarget.id;
        console.log("clickedId: " + clickedId);
        switch (clickedId) {
            case "importData":
                FlowRouter.go('/');
                break;
            case "importDb":
                FlowRouter.go('/importDb');
                break;
            case "verifyData":
                FlowRouter.go('/verifyData');
                break;
            case "convertData":
                FlowRouter.go('/convertData');
                break;
            case "removeData":
                FlowRouter.go("/removeData");
                break;
            default:
                break;
        }
    },
});
