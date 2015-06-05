Ext.define('Dinmu.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-main',

    onCarouselChange: function(carousel, newVal, oldVal) {
        var backBtn = this.lookupReference('backbtn'),
            settingsBtn = this.lookupReference('settingsbtn'),
            titlebar = this.lookupReference('titlebar');

        if (newVal.getItemId() == "mainview") {
            back.hide();
            settings.show();
            titlebar.setTitle('Do I need my Umbrella?');
        } else {
            backBtn.show();
            settingsBtn.hide();
            titlebar.setTitle('Settings');
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
        this.getView().setActiveItem(0);
        Dinmu.utils.Functions.loadData();
    }
    
});