Ext.define('PlayStation.model.Game', {
    extend: 'PlayStation.model.Base',

    fields: [
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'trophies',
            type: 'auto'
        },
        {
            name: 'img',
            type: 'string'
        }, {
            name: 'platform',
            type: 'string'
        }, {
            name: 'progress',
            type: 'string'
        }
    ],

    proxy: {
        type: 'memory'
    }
});
