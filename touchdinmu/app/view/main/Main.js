Ext.define("Dinmu.view.main.Main", {
    extend: "Ext.carousel.Carousel",

    requires: [
        "Dinmu.view.main.MainController",
        "Dinmu.view.settings.Settings",
        "Ext.TitleBar",
    ],

    controller: "main-main",

    xtype: 'main',

    config: {
        direction: 'vertical',
        items: [{
            xtype: 'titlebar',
            cls: 'title',
            docked: 'top',
            reference: 'titlebar',
            title: 'Do I need my Umbrella?',
            items: [{
                cls: 'back',
                hidden: true,
                ui: 'back',
                action: 'back',
                reference: 'backbtn',
                align: 'left',
                text: 'back',
                handler: function(btn) {
                    btn.up('main').setActiveItem(0);
                }
            }, {
                iconCls: 'settings',
                reference: 'settingsbtn',
                ui: 'plain',
                align: 'right',
                handler: function(btn) {
                    btn.up('main').setActiveItem(1);
                }
            }]
        }, {
            itemId: 'mainview',
            cls: 'textview'
        }, {
            xtype: 'settingsview'
        }, {
            xtype: 'toolbar',
            cls: 'footer',
            ui: 'light',
            docked: 'bottom',
            //html: '<span>Powered by &copy; Sencha Touch and <a href="http://www.worldweatheronline.com/" title="Free local weather content provider" target="_blank">World Weather Online</a></span>'
        }]
    }
});