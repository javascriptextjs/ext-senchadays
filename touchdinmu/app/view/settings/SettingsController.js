Ext.define('Dinmu.view.settings.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings-settings',

    requires: [
        'Dinmu.utils.Functions'
    ],

    onToggle: function(tf) {
    	if(tf.up('settingsview')){
	    	var city = this.lookupReference('city'),
	    		country = this.lookupReference('country');

	        if (tf.getValue() === 0) {
	            city.enable();
	            country.enable();
	        } else {
	            city.disable();
	            country.disable();
	            city.reset();
	            country.reset();
	        }
    	}
    },
    onRefresh: function() {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            indicator: true,
            message: 'Save Settings...'
        });

        var errorstring = "";
        var store = this.getViewModel().getStore('settings');

        store.removeAll();
        store.sync();

        var record = Ext.create("Dinmu.model.Setting", {});
        this.getView().updateRecord(record);
        var errors = record.validate();

        if (record.get('geo') === 0 && errors.isValid() === false) {
            errors.each(function(errorObj) {
                errorstring += errorObj.getMessage() + "<br />";
            });

            Ext.Msg.alert("Oops", errorstring);

        } else {
            store.add(record.getData());
            store.sync();
            Dinmu.utils.Functions.loadData();
        }

        Ext.Viewport.unmask();
    }
    
});
