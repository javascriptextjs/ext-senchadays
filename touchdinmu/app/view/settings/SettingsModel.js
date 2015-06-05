Ext.define('Dinmu.view.settings.SettingsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.settings-settings',
    
    requires: [
    	'Dinmu.model.Setting',
    ],	

    stores: {
    	'settings' : {
    		model: 'Dinmu.model.Setting',
        	autoLoad: true,
            listeners: {
                load: function(){
                    console.log(this.getProxy());
                }
            }
    	}
    }
});
