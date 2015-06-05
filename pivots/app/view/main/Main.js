/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pivot.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Pivot.view.main.MainController',
        'Pivot.view.main.MainModel',
        'Ext.toolbar.Toolbar',
        'Pivot.view.pivots.Basic',
        'Pivot.view.pivots.Filtered',
        'Pivot.view.pivots.PivotStateful',
        'Pivot.view.pivots.PivotDrillDownPlugin'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
    {
        region: 'north',
        xtype: 'toolbar',
        heigth: 20,
        items: ['Pivots KitchenSink']
    },
    {
        region: 'west',
        rootVisible: false,
        lines: false,
        rowLines: true,
        useArrows: true,
        title: 'Navigation',
        width: 220,
        xtype: 'treepanel',
        listeners: {
            itemclick: 'onMenuItem'
        },
        bind: {
            store: '{menuitems}'
        }
    }, {
        region: 'center',
        layout: 'card',
        reference: 'cardholder',
        items: [{
            xtype: 'pivotbasic',
            title: 'Basic Example',
            bind: {
                store: '{samples}'
            }
        },{
            xtype: 'pivotfiltered',
            title: 'Filtered',
            bind: {
                store: '{samples}'
            }           
        },
        {
            xtype: 'pivotstateful',
            title: 'Pivot Stateful - Expand and resize, then refresh the page',
            bind: {
                store: '{samples}'
            }           
        }, {
            xtype: 'pivotdrilldownplugin',
            title: 'Drill Down Plugin - Double click records',
            bind: {
                store: '{samples}'
            }             
        },
        {
            xtype: 'pivotrangeeditorplugin',
            title: 'Range Editor Plugin - Double click and edit records',
            bind: {
                store: '{samples}'
            }             
        }]
    }]
});
