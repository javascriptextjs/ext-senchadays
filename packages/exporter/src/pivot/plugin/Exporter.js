/**
* 
* 
* This plugin allows the user to export the pivot table data to an Excel file.
*
#Example usage:#

    var excelExportPlugin = Ext.create('Ext.pivot.plugin.ExcelExport', {
        title:  'Pivot grid export'
    });

    // in a button/menu handler do like this
    var f = excelExportPlugin.getExcelData(true);
    document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(f);

*
*
* This solution doesn't work in all browsers so you might want to send the generated content
* to the backend server and get back the download file with proper HTTP headers. Please have a 
* look at this example: http://dean.edwards.name/weblog/2005/06/base64-ie/
*
*
*/
Ext.define('Ext.pivot.plugin.Exporter', {
    alternateClassName: [
        'Mz.pivot.plugin.ExcelExport'
    ],

    alias: [
        'plugin.pivotexporter',
        'plugin.mzexcelexport'
    ],

    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.exporter.excel.Formatter'
    ],

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

    constructor: function(config){
        var me = this;
        
        config = config || {};
        
        me.callParent(arguments);
        
        me.config = Ext.apply({
            /**
             * @cfg showTitle
             * @type Boolean
             * Show or hide the title
             */
            showTitle: true,

            /**
             * @cfg title
             * @type String
             * The title of the workbook
             */
            title: "Workbook",

            /**
             * @cfg cellFontName
             * @type String
             * The default font name used in the workbook. This is applied when {hasDefaultStyle} is true.
             */
            cellFontName: "Arial",

            /**
             * @cfg cellFontSize
             * @type String
             * The default font size used in the workbook. This is applied when {hasDefaultStyle} is true.
             */
            cellFontSize: "10",

            /**
             * @cfg cellBorderColor
             * @type String
             * The colour of border to use for each Cell
             */
            cellBorderColor: "#E4E4E4",

            /**
             * @cfg cellFillColor
             * @type String
             * The fill colour of each summary Cell
             */
            cellFillColor: "",

            /**
             * @cfg titleFontSize
             * @type String
             * Font size used for the table title
             */
            titleFontSize: "14",

            /**
             * @cfg titleFillColor
             * @type String
             * Fill folor used for the table title
             */
            titleFillColor: "",

            /**
             * @cfg headerFontSize
             * @type String
             * Font size used for the table header.
             */
            headerFontSize: "10",

            /**
             * @cfg headerFillColor
             * @type String
             * Fill folor used for the table header cells
             */
            headerFillColor: "#BFBFBF",

            /**
             * @cfg groupHeaderFontSize
             * @type String
             * Font size applied to the summary group header cells
             */
            groupHeaderFontSize: "10",

            /**
             * @cfg groupHeaderFillColor
             * @type String
             * Fill folor used for the summary group header cells
             */
            groupHeaderFillColor: "#D8D8D8",

            /**
             * @cfg groupFooterFontSize
             * @type String
             * Font size applied to the summary group footer cells
             */
            groupFooterFontSize: "10",

            /**
             * @cfg groupFooterFillColor
             * @type String
             * Fill folor used for the summary group footer cells
             */
            groupFooterFillColor: "#BFBFBF",

            /**
            * @cfg dateFormat
            * @type String
            * Default format used for the date values
            */
            dateFormat:     'Short Date',

            /**
            * @cfg numberFormat
            * @type String
            * Default format used for the number values
            */
            numberFormat:   'Standard',

            /**
             * @cfg hasDefaultStyle
             * @type Boolean
             * True to add the default styling options to all cells (defaults to true)
             */
            hasDefaultStyle: true,

            /**
             * @cfg windowHeight
             * @type Number
             * Excel window height
             */
            windowHeight: 9000,

            /**
             * @cfg windowWidth
             * @type Number
             * Excel window width
             */
            windowWidth: 50000,

            /**
             * @cfg protectStructure
             * @type Boolean
             * Protect structure
             */
            protectStructure: false,

            /**
             * @cfg protectWindows
             * @type Boolean
             * Protect windows
             */
            protectWindows: false
        }, config);
    },

    init: function (grid) {
        var me = this;
        
        me.grid = grid; 
        me.config = Ext.clone(me.config);

        me.gridListeners = me.grid.on({
            beforerender:   me.onBeforeGridRendered,
            single:         true,
            scope:          me,
            destroyable:    true
        });
    },

    destroy: function () {
        var me = this;
        
        delete me.grid;
        if(me.gridMaster){
            delete me.gridMaster;
        }
        
        Ext.destroy(me.gridListeners);
        
        me.callParent(arguments);
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
    },
    
    /**
    * Returns the generated xml text. 
    * 
    * Be careful that if you set includeTotals to false and onlyExpandedNodes to true then only 
    * those fully expanded group rows will be exported. 
    * 
    * @param {Boolean} onlyExpandedNodes Set to true if you want to have a WYSIWYG Excel file.
    * @param {Boolean} includeTotals Set to false if you don't want to export totals. Default is true.
    */
    getExcelData: function (onlyExpandedNodes, includeTotals) {
        var me = this;
        
        if(!me.gridMaster) return;

        var f = Ext.create('Ext.exporter.excel.Formatter', {
            matrix:             me.gridMaster.getMatrix(),
            onlyExpandedNodes:  onlyExpandedNodes,
            includeTotals:      includeTotals,
            config:             me.config
        });
        return f.format();
    }
});