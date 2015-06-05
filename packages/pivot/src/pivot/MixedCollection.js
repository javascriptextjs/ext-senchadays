/**
 *
 * This class enhances the Ext.util.MixedCollection class by allowing the
 * children objects to be destroyed on remove.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.MixedCollection', {
    extend: 'Ext.util.MixedCollection',

    alternateClassName: [
        'Mz.aggregate.MixedCollection'
    ],

    removeAt: function(index){
        var me = this,
            obj = me.callParent(arguments);
        
        Ext.destroy(obj);
    },
    
    clear: function(){
        var me = this;
        
        Ext.destroy(me.items);
        me.callParent(arguments);
    },
    
    removeAll: function(){
        var me = this;
        
        Ext.destroy(me.items);
        me.callParent(arguments);
    },
    
    destroy: function(){
        // destroy all objects in the items array
        this.clear();
    }
});