/**
 *   Class used to create an Excel workbook
 *
 *   @private
 *
 */
Ext.define('Ext.exporter.excel.Workbase', {
    requires: [
        'Ext.XTemplate',
        'Ext.exporter.excel.Style'
    ],
    
    constructor: function (config) {
        var me = this;
        
        config = Ext.clone(config || {});
        
        Ext.apply(me, config, {
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
             * @property styles
             * @type Array
             * The array of Ext.exporter.excel.Style objects attached to this object
             */
            styles: [],

            /**
             * @property compiledStyles
             * @type Array
             * Array of all rendered Ext.exporter.excel.Style objects for this object
             */
            compiledStyles: []            
        });
    },
    
    /**
     * Adds a new Ext.exporter.excel.Style to this Workbook
     * @param {Object} config The style config, passed to the Style constructor (required)
     */
    addStyle: function (config) {
        var me = this,
            style = Ext.create('Ext.exporter.excel.Style', config || {});

        me.styles.push(style);

        return style;
    },

    /**
    * @private
    * 
    * @param fillColor
    */
    getInteriorStyle: function(fillColor){
        var style = {
            name: "Interior"
        };
        
        if(!Ext.isEmpty(fillColor)){
            style.properties = [
                { name: "Pattern", value: "Solid" },
                { name: "Color", value: fillColor }
            ];
        }
        
        return style;
    }

    
});