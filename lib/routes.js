FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout', { main: "importFileSelect" });
    }
});

FlowRouter.route('/verifyData', {
    name: 'verifyData',
    action() {
        BlazeLayout.render('MainLayout', { main: "verifyData"});
    }
});
