/**
 *
 * This class is used for managing all fields for an axis.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.plugin.configurator.Container', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.pivot.plugin.configurator.Column',
        'Ext.pivot.plugin.configurator.DragZone',
        'Ext.pivot.plugin.configurator.DropZone'
    ],
    
    alias: 'widget.pivotconfigcontainer',
    
    childEls:       ['innerCt', 'targetEl'],
    handleSorting:  false,
    handleFiltering:false,
    position:       'top',
    isAgg:          false,

    dragDropText:   'Drop Column Fields Here',
    cls:            Ext.baseCSSPrefix + 'config-panel-ct',

    initComponent: function(){
        var me = this;

        if(me.position == 'top' || me.position == 'bottom'){
            Ext.apply(me, {
                style:          'overflow:hidden',
                layout:         'column',
                height:         'auto'
            });
        }else{
            Ext.apply(me, {
                layout: {
                    type: 'vbox',
                    align:  'stretch'
                }
            });
        }

        if(me.position == 'top' || me.position == 'right') {
            me.cls += ' ' + Ext.baseCSSPrefix + 'config-panel-ct-tr';
        }else{
            me.cls += ' ' + Ext.baseCSSPrefix + 'config-panel-ct-bl';
        }

        me.callParent(arguments);
    },

    destroy: function(){
        var me = this;
        
        Ext.destroy(me.dragZone, me.dropZone, me.relayers, me.targetEl);
        
        me.callParent();
    },
    
    enable: function(){
        var me = this;
        
        if(me.dragZone){
            me.dragZone.enable();
        }
        if(me.dropZone){
            me.dropZone.enable();
        }
    },
    
    disable: function(){
        var me = this;
        
        if(me.dragZone){
            me.dragZone.disable();
        }
        if(me.dropZone){
            me.dropZone.disable();
        }
    },

    afterRender: function(){
        var me = this;
        
        me.callParent();

        me.dragZone = new Ext.pivot.plugin.configurator.DragZone(me);
        me.dropZone = new Ext.pivot.plugin.configurator.DropZone(me);

        me.mon(me, 'afterlayout', me.showGroupByText, me);
    },
    
    /**
    * This is used for adding a new config field to this container.
    * 
    */
    addColumn: function(config, pos, notify){
        var me = this,
            cfg = {xtype: 'pivotconfigcolumn'},
            itemFound = me.items.findIndex('dimensionId', new RegExp('^' + config.id + '$', 'i')) >= 0,
            newCol;
        
        if(!me.isAgg){
            // if column found then don't do anything
            if(itemFound){
                if (notify === true) {
                    me.notifyGroupChange();
                }
                return;
            }
        }else{
            if(itemFound){
                config.id = Ext.id();
            }
        }

        if(me.items.getCount() == 0){
            me.hideGroupByText();
        }
        
        Ext.apply(cfg, {
            dimension:      config,
            dimensionId:    config.id,
            header:         config.header,
            isCustomizable: me.isCustomizable,
            isAgg:          me.isAgg
        });
        
        if(me.isAgg){
            config.aggregator = config.aggregator || 'sum';
        }
        
        //newCol = Ext.create('Ext.pivot.plugin.configurator.Column', cfg);
        
        if(pos != -1){
            newCol = me.insert(pos, cfg);
        }else{
            newCol = me.add(cfg);
        }
        me.updateColumnIndexes();
        newCol.relayers = me.relayEvents(newCol, ['sortchange', 'filterchange', 'configchange']);

        if(notify === true){
            me.notifyGroupChange();
        }
    },
    
    /**
    * This is used for calculating column position in this container.
    * 
    */
    getColumnPosition: function(column, position){
        var me = this,
            pos;
        
        if(column instanceof Ext.pivot.plugin.configurator.Column){
            //we have to insert before or after this column
            pos = me.items.findIndex('id', column.id);
            pos = (position === 'before') ? pos : pos + 1;
        }else{
            pos = -1;
        }
        return pos;
    },
    
    /**
    * This is used for moving a column inside this container.
    * 
    */
    moveColumn: function(idFrom, idTo, position){
        var me = this,
            pos = me.items.findIndex('id', idFrom),
            newPos = me.items.findIndex('id', idTo);
        
        if(pos != newPos){
            if(newPos > pos){
                newPos = (position === 'before') ? Math.max(newPos - 1, 0) : newPos;                        
            }else{
                newPos = (position === 'before') ? newPos : newPos + 1;
            }
            
            me.move(pos, newPos);
            me.updateColumnIndexes();
            me.notifyGroupChange();
        }
    },
    
    /**
    * @private
    * After a column is moved the indexes has to be updated.
    * 
    */
    updateColumnIndexes: function(){
        this.items.each(function(item, index, all){
            item.index = index;
        });
    },
    
    /**
    * This is used for firing the 'configchange' event
    * 
    */
    notifyGroupChange: function(){
        this.fireEvent('configchange');
    },
    
    /**
    * The container has an info text displayed inside. This function makes it visible.
    * 
    */
    showGroupByText: function(){
        var me = this,
            method;
        
        if(me.items.getCount() === 0){
            me.innerCt.setHeight(me.minHeight);
            if(me.targetEl){
                method = me.targetEl.setHtml ? 'setHtml' : 'setHTML';
                me.targetEl[method]('<div class="' + Ext.baseCSSPrefix + 'config-panel-text">' + me.dragDropText + '</div>');
            }else{
                me.targetEl = me.innerCt.createChild();
            }
        }
    },
    
    /**
    * The container has an info text displayed inside. This function hides it.
    * 
    */
    hideGroupByText: function(){
        var method;
        
        if(this.targetEl){
            method = this.targetEl.setHtml ? 'setHtml' : 'setHTML';
            this.targetEl[method]('');
        }
    }
    
    
});