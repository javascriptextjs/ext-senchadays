/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('PlayStation.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'PlayStation.model.Base',
        'PlayStation.model.PsnProfile',
        'PlayStation.model.Game'
    ],

    data: {
        profile: null
    },

    formulas: {
        games: {
            bind: '{profile}',
            get: function(profile) {
                if (profile) {
                    return profile.games().getData().items;
                }
            }
        }
    },

    stores: {
        profiles: {
            model: 'PlayStation.model.PsnProfile',
            storeId: 'Profiles',
            autoLoad: true,
            listeners: {
                load: 'onProfileLoad'
            }
        }
    },

    getTime: function(){
        var me = this;

        setInterval(function() {
            var display = "",
                date = new Date();
            
            time = pad(date.getHours()) +":"+ pad(date.getMinutes());
            me.getView().lookupReference('timer').setHtml(time);
        }, 60000);

        function pad(number) {
            return (number < 10 ? "0" : "") + number;
        }
    }

});
