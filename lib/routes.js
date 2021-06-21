FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout', { main: "importFileSelect" });
    }
});

FlowRouter.route('/importDb', {
    name: 'importDb',
    action() {
        BlazeLayout.render('MainLayout', { main: "importDb"});
    }
});

FlowRouter.route('/verifyData', {
    name: 'verifyData',
    action() {
        BlazeLayout.render('MainLayout', { main: "verifyData"});
    }
});

FlowRouter.route('/convertData', {
    name: 'convertData',
    action() {
        BlazeLayout.render('MainLayout', { main: "convertData"});
    }
});

FlowRouter.route('/removeData', {
    name: 'removeData',
    action() {
        BlazeLayout.render('MainLayout', { main: "removeData"});
    }
});