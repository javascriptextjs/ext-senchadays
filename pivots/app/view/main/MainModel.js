/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Pivot.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores: {
        'menuitems': {
            type: 'tree',
            root: {
                text: 'Menu',
                expanded: true,
                children: [{
                    text: 'Basic',
                    type: 'pivotbasic',
                    leaf: true
                }, {
                	text: 'Filtered',
                	type: 'pivotfiltered',
                	leaf: true
                },
                {
                  	text: 'Stateful Pivot',
                	type: 'pivotstateful',
                	leaf: true              	
                }, {
                	text: 'Drill Down Plugin',
                	type: 'pivotdrilldownplugin',
                	leaf: true
                }, {
                	text: 'Range Editor Plugin',
                	type: 'pivotrangeeditorplugin',
                	leaf: true
                }]
            }

        },

        'samples': {
            type: 'array',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data/dataset.json',
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'company',
                type: 'string'
            }, {
                name: 'country',
                type: 'string'
            }, {
                name: 'date',
                type: 'date',
                dateFormat: 'd/m/Y'
            }, {
                name: 'value',
                type: 'int'
            }, {
                name: 'quantity',
                type: 'int'
            }, {
                name: 'year',
                convert: function(v, record) {
                    return Ext.Date.format(record.get('date'), "Y");
                }
            }, {
                name: 'continent',
                convert: function(v, record) {
                    if (Ext.Array.indexOf(['Belgium', 'Netherlands', 'United Kingdom'], record.get('country')) >= 0) return 'Europe';
                    if (Ext.Array.indexOf(['Canada', 'United States'], record.get('country')) >= 0) return 'North America';
                    if (Ext.Array.indexOf(['Australia'], record.get('country')) >= 0) return 'Australia';
                }
            }]
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});
