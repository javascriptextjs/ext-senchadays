Ext.define('PlayStation.model.PsnProfile', {
    extend: 'PlayStation.model.Base',

    requires:[
        'PlayStation.model.Game'
    ],
    fields: [
        {
            name: 'id'
        },
        {
            name: 'username',
            type: 'auto'
        },
        {
            name: 'trophies',
            type: 'auto'
        },
        {
            name: 'games',
            type: 'auto'
        }
    ],
    hasMany: 'Game',

    proxy: {
        type: 'ajax',
        url: 'data/psntrophies/psn.json',
        reader: {
            type: 'json'
        }
    }
});
