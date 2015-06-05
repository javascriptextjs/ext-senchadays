/**
* 
* This plugin allows the user to configure the pivot grid using drag and drop.
*/
Ext.define('Ext.pivot.plugin.Configurator', {
    alternateClassName: [
        'Mz.pivot.plugin.Configurator'
    ],

    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.util.DelayedTask',
        'Ext.menu.Menu',        
        'Ext.menu.CheckItem',        
        'Ext.pivot.plugin.configurator.Panel'
    ],

    alias: [
        'plugin.pivotconfigurator',
        'plugin.mzconfigurator'
    ],
    
    /**
    * @cfg {Array} fields This is the array of fields you want to be used in the configurator.
    * Each field is an object with the following properties: dataIndex, header.
    * If no fields are defined then all fields are fetched from the store model.
    * 
    */
    fields:         [],
    
    /**
    * @cfg {Number} refreshDelay Number of miliseconds to wait for pivot refreshing when a config change occured.
    */
    refreshDelay:   300,

    /**
     * @cfg {String} dock Docking position for the configurator panel. Possible values: top, right, bottom, left
     */
    dock: 'top',

    /**
     * @cfg {Boolean} collapsible Is the configurator panel collapsible?
     */
    collapsible: true,

    /**
    * @private
     *  `"both"` (the default) - The plugin is added to both grids
     *  `"top"` - The plugin is added to the containing Panel
     *  `"locked"` - The plugin is added to the locked (left) grid
     *  `"normal"` - The plugin is added to the normal (right) grid
    * 
    * @type String
    */
    lockableScope:  'top',

    init: function(grid) {
        var me = this;

        if(grid.down('pivotconfigpanel')){
            return;
        }
        
        me.grid = grid;
        me.fields = Ext.Array.from(me.fields);

        me.gridListeners = me.grid.on({
            beforerender:   me.onBeforeGridRendered,
            afterrender:    me.onAfterGridRendered,
            single:         true,
            scope:          me,
            destroyable:    true
        });
        
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        var me = this;

        delete me.grid;
        delete me.fields;
        if(me.gridMaster){
            delete me.gridMaster;
        }
        Ext.destroy(me.fieldsCt, me.gridListeners, me.gridStateListeners);
        me.callParent(arguments);
    },
    
    /**
    * Enable the plugin to show the configurator panel.
    * 
    */
    enable: function() {
        var me = this;

        me.disabled = false;
        
        if(me.configCt){
            me.configCt.enable();
        }
        if(me.gridMaster){
            me.gridMaster.fireEvent('showconfigpanel', me.configCt);
        }
    },
    
    /**
    * Disable the plugin to hide the configurator panel.
    * 
    */
    disable: function() {
        var me = this;

        me.disabled = true;
        
        if(me.configCt){
            me.configCt.disable();
        }
        if(me.gridMaster){
            me.gridMaster.fireEvent('hideconfigpanel', me.configCt);
        }
    },
    
    onBeforeGridRendered: function(){
        var me = this;
        
        if(me.grid instanceof Ext.pivot.Grid){
            me.gridMaster = me.grid;
        }else{
            me.gridMaster = me.grid.up('pivotgrid');
        }
        
        if(!me.gridMaster){
            me.destroy();
            return;
        }
        
        me.setDock(me.dock);

        /**
        * Fired on the pivot grid when the configuration changes.
        * Return false if you don't want to apply the new configuration to the pivot grid.
        *
        * @event configchange
        * @param {Ext.pivot.plugin.Configurator} panel
        * @param {Object} config
        */

        /**
        * @event showconfigpanel
        * @param {Ext.pivot.plugin.configurator.Panel} panel
        */

        /**
        * @event hideconfigpanel
        * @param {Ext.pivot.plugin.configurator.Panel} panel
        */

    },
    
    onAfterGridRendered: function(){
        var me = this;
        
        if(me.disabled === true){
            me.disable();
        }else{
            me.enable();
        }
    },

    /**
     * Change configurator panel position.
     *
     * @param dock
     */
    setDock: function(position){
        var me = this,
            exists = Ext.isDefined(me.configCt);

        Ext.destroy(me.configCt);
        me.configCt = me.gridMaster.addDocked({
            xtype:          'pivotconfigpanel',
            dock:           position || me.dock,
            grid:           me.gridMaster,
            fields:         me.fields,
            refreshDelay:   me.refreshDelay,
            collapsible:    me.collapsible
        })[0];

        if(exists) {
            // we only initialize the fields if docking is changed
            me.configCt.initPivotFields();
        }
    }
    

});