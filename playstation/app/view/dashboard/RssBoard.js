Ext.define('PlayStation.view.dashboard.RssBoard', {
    extend: 'Ext.panel.Panel',
    xtype: 'rssboard',

    requires: [
        'Ext.ux.dashboard.GoogleRssPart',
        'Ext.dashboard.Dashboard',
        'PlayStation.view.slider.Slider'
    ],

    layout: 'border',

    items: [
    {

        xtype: 'gamesslider',
        height: 185,
        region: 'north'
    },
    {

        lbar: [{
            xtype: 'component',
            width: 250,
            margin: 0,
            tpl: ['<span class="platformslider"><span>{platform}</span></span>',
            '<span class="progress">Progress: {progress}</span>',
            '<ul class="trophies"><li class="bronze">{trophies.bronze}</li><li class="silver">{trophies.silver}</li><li class="gold">{trophies.gold}</li><li class="platinum">{trophies.platinum}</li></ul>',
            '</div>'],
            height: 110,
            id: 'extra',
            disabled: true
        }],

        xtype: 'dashboard',
        reference: 'dashboard',
        stateful: false,
        region: 'center',
        columnWidths: [
            0.33,
            0.33,
            0.33
        ],
        parts: {
            rss: 'google-rss'
        },

        defaultContent: [{
            type: 'rss',
            columnIndex: 0,
            height: 300,
            feedUrl: 'http://feeds.ign.com/IGNPS4Reviews'
        }, {
            type: 'rss',
            columnIndex: 1,
            height: 300,
            feedUrl: 'http://feeds.ign.com/ign/ps3-all'
        }, {
            type: 'rss',
            columnIndex: 2,
            height: 300,
            feedUrl: 'http://feeds.ign.com/ign/ps-vita-all'
        }]
    }]
});
