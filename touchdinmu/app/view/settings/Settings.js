Ext.define("Dinmu.view.settings.Settings", {
    extend: "Ext.form.Panel",

    requires: [
        "Dinmu.view.settings.SettingsController",
        "Dinmu.view.settings.SettingsModel",
        "Ext.form.FieldSet",
        "Ext.field.Toggle",
        "Ext.field.Select",
        "Ext.field.Text",
        "Ext.Button"
    ],
    xtype: 'settingsview',
    controller: "settings-settings",
    viewModel: {
        type: "settings-settings"
    },
    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Your location',
            instructions: "In case you do not want the app to detect your location, you can prefill the city and country.",
            items: [{
                name: 'geo',
                xtype: 'togglefield',
                label: 'Detect location?',
                labelWidth: '55%',
                value: 1,
                listeners: {
                    'change' : 'onToggle'
                }
            }, {
                name: 'units',
                xtype: 'selectfield',
                options: [{
                    text: 'Celsius',
                    value: 'c'
                }, {
                    text: 'Fahrenheit',
                    value: 'f'
                }],
                label: 'Units'
            }, {
                name: 'city',
                xtype: 'textfield',
                label: 'City',
                reference: 'city',
                disabled: true
            }, {
                name: 'country',
                xtype: 'textfield',
                label: 'Country',
                reference: 'country',
                disabled: true
            }, {
                xtype: 'button',
                ui: 'confirm',
                margin: '10 5',
                handler: 'onRefresh',
                text: 'Refresh'
            }]
        }]
    }
});
