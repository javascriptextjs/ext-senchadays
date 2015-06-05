Ext.define('Pivot.view.pivots.PivotStateful', {
    extend: 'Pivot.view.pivots.Basic',
    alias: 'widget.pivotstateful',
    itemId: 'pivotstateful',

    stateful: true,
    stateId: 'pivotgrid',

    trackOver: true,
    stripeRows: false,

    tbar: [{
        xtype: 'button',
        text: 'Clear State',
        handler: function(btn){
            Ext.state.Manager.getProvider().clear(btn.up('pivotstateful').stateId);
            //document.location = document.location;
        }
    }],

    initComponent: function(){
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        this.callParent(arguments);
    }

});
