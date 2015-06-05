Ext.define('Dinmu.model.Setting', {
    extend: 'Ext.data.Model',
    requires: [
        //'Ext.data.identifier.Uuid',
        'Ext.data.proxy.LocalStorage'
    ],

    //idProperty: 'id',
    //identifier: 'uuid',

    fields: [{
            name: 'id',
            type: 'auto'
        }, {
            name: 'city',
            type: 'auto'
        }, {
            name: 'country',
            type: 'auto',
            value: 'Amsterdam'
        }, {
            name: 'units',
            type: 'auto'
        }
    ],

    validators: [{
            type: 'presence',
            field: 'city',
            message: "Please provide a city."
        }, {
            type: 'presence',
            field: 'country',
            message: "Please provide a country."
        }
    ],

    proxy: {
        type: 'localstorage',
        id: 'weathersettings'
    }
});