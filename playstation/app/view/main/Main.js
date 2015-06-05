/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PlayStation.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'PlayStation.view.main.MainController',
        'PlayStation.view.main.MainModel',
        'PlayStation.view.dashboard.RssBoard'
    ],
    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'center'
    },

    items: [{
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    xtype: 'button',
                    cls: 'shop',
                    scale: 'large',
                    glyph: '105@playstation'
                }, {
                    xtype: 'button',
                    cls: 'info',
                    scale: 'large',
                    glyph: '115@playstation'
                }, '->', {
                    xtype: 'button',
                    cls: 'username',
                    scale: 'large',
                    glyph: '112@playstation',
                    publishes: ['text'],
                    bind: {
                        text: 'Username: {profile.username}'
                    }
                }, '-', {
                    xtype: 'button',
                    cls: 'trophies',
                    scale: 'large',
                    glyph: '116@playstation',
                    publishes: ['text'],
                    bind: {
                        text: '{profile.trophies.total}'
                    }
                }, 
                {
                    xtype: 'component',
                    cls: 'bronze',
                    bind: {
                        html: '<span class="bronze">{profile.trophies.bronze}</span>'
                    }
                },
                {
                    xtype: 'component',
                    cls: 'silver',
                    bind: {
                        html: '<span class="silver">{profile.trophies.silver}</span>'
                    }
                },
                {
                    xtype: 'component',
                    cls: 'gold',
                    bind: {
                        html: '<span class="gold">{profile.trophies.gold}</span>'
                    }
                },
                {
                    xtype: 'component',
                    cls: 'platinum',
                    bind: {
                        html: '<span class="platinum">{profile.trophies.platinum}</span>'
                    }
                }, '-', {
                    xtype: 'component',
                    cls: 'timer',
                    reference: 'timer'
                }]
            }],
        xtype: 'rssboard',
        height: '90%',
        width: '90%'
    }]
});