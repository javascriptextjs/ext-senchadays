Ext.define('PlayStation.view.slider.Slider', {
	extend: "Ext.view.View",

	xtype: 'gamesslider',
	config: {
		games: null
	},
    bind: {
        games: '{games}'
    },

    componentCls: 'gamesslider',
    itemCls: 'game',
    overItemCls: 'over',
    selectedItemCls: 'selected',

    reference: 'gamesslider',
    scrollable: true,
    tpl: ['<div class="gamesliderroot"><tpl for=".">',
        '<div class="game">',
            '<img src="http:{img}"><h3>{title}</h3>',
        '</div>',
        '</tpl></div>'],
    itemSelector: 'div.game',

    updateGames: function(games){
    	this.setStore(Ext.create('Ext.data.Store', {
	        storeId: 'Games',
	        data: games,
	        model: 'PlayStation.model.Game'
	    }));
    },

    listeners: {
        itemmouseenter: function(view, record) {
            var panel = Ext.getCmp('extra');
            panel.setData(record.getData());
            panel.enable();
        },
        itemmouseleave: function(){
            Ext.getCmp('extra').disable();
        }
    }
});

