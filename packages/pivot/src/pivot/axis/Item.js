/**
* The axis has items that are generated when the records are processed.
* This class stores info about such an item.
* 
*/
Ext.define('Ext.pivot.axis.Item', {
    alternateClassName: [
        'Mz.aggregate.axis.Item'
    ],

    /**
    * The tree level this item belongs to
    * 
    * @type Number
    */
    level:          0,
    
    /**
    * The key that uniquely identifies this item in the tree. The key is a string compound of
    * all parent items keys separated by the matrix keysSeparator
    * 
    * @type String
    */
    key:            '',
    
    /**
    * The item value as it appears in the store
    * 
    * @type String
    */
    value:          '',
    
    /**
    * The item sort value as it appears in the store. This value will be used when sorting results.
    * 
    * @type String
    */
    sortValue:      '',
    
    /**
    * The item name after the grouperFn was applied to the value
    * 
    * @type String
    */
    name:           '',
    
    /**
    * Id of the dimension this item refers to.
    * 
    * @type String
    */
    dimensionId:    '',
    
    /**
    * The dimension instance
    * 
    * @type {Ext.pivot.dimension.Item}
    * 
    */
    dimension:      null,
    
    /**
    * Array of children items this item has
    * 
    * 
    * @type Array
    */
    children:       null,
    
    /**
    * When the Local matrix is used this is the pivot store record generated for this axis item
    * 
    * @type {Ext.data.Model}
    */
    record:         null,
    
    /**
    * Parent axis instance
    * 
    * @type {Ext.pivot.axis.Abstract}
    * 
    */
    axis:           null,
    
    /**
    * Object that stores all values from all axis items parents
    * 
    * @type Object
    */
    data:           null,
    
    /**
    * Is this item expanded or collapsed?
    * 
    * @type Boolean
    */
    expanded:       false,
    
    constructor: function(config){
        var me = this;
        
        Ext.apply(me, config || {});
        
        if(Ext.isEmpty(me.sortValue)){
            me.sortValue = me.value;
        }
        
        me.callParent(arguments);
    },
    
    destroy: function(){
        var me = this;
        
        if(me.axis){
            delete me.axis;
        }
        
        if(me.data){
            delete me.data;
        }
        
        if(me.dimension){
            delete me.dimension;
        }
        
        if(me.record){
            delete me.record;
        }
        
        if(Ext.isArray(me.children)){
            me.children.length = 0;
        }
        
        me.callParent(arguments);
    },
    
    /**
    * Returns the group total text formatted according to the template defined in the matrix
    * 
    */
    getTextTotal: function(){
        var me = this,
            groupHeaderTpl;
        
        if(Ext.XTemplate.getTpl){
            groupHeaderTpl = Ext.XTemplate.getTpl(me.axis.matrix, 'textTotalTpl');
        }else{
            groupHeaderTpl = new Ext.XTemplate(me.axis.matrix['textTotalTpl']);
        }
        
        return groupHeaderTpl.apply({
            groupField: me.dimension.dataIndex,
            columnName: me.dimension.dataIndex,
            name:       me.name,
            rows:       me.children || []
        });
    },
    
    /**
    * Expand this item and fire the groupexpand event on the matrix
    * 
    * @param {Boolean} includeChildren Expand the children tree too?
    */
    expand: function(includeChildren){
        var me = this;
        
        me.expanded = true;
        
        if(includeChildren === true){
            me.expandCollapseChildrenTree(me, true);
        }
        
        me.axis.matrix.fireEvent('groupexpand', me.axis.matrix, (me.axis.leftAxis ? 'row' : 'col'), me);
    },
    
    /**
    * Collapse this item and fire the groupcollapse event on the matrix
    * 
    * @param {Boolean} includeChildren Collapse the children tree too?
    */
    collapse: function(includeChildren){
        var me = this;
        
        me.expanded = false;
        
        if(includeChildren === true){
            me.expandCollapseChildrenTree(me, false);
        }

        me.axis.matrix.fireEvent('groupcollapse', me.axis.matrix, (me.axis.leftAxis ? 'row' : 'col'), me);
    },
    
    /**
    * @private
    * Expand or collapse all children tree of the specified item
    */
    expandCollapseChildrenTree: function(item, state){
        var me = this,
            i;
        
        item.expanded = state;
        if(Ext.isArray(me.children)){
            for(i = 0; i < me.children.length; i++){
                me.expandCollapseChildrenTree(me.children[i], state);
            }
        }
    }
});