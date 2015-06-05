/**
 *   Class used to create an Excel cell
 *
 *   @private
 *
 */
Ext.define('Ext.exporter.excel.Cell', {

    constructor: function (config) {
        Ext.applyIf(config, {
            type:   "String",
            style:  'Default'
        });

        Ext.apply(this, config);
    },

    render: function () {
        return this.tpl.apply(this);
    },

    tpl: new Ext.XTemplate(
        '<ss:Cell ss:MergeAcross="{merge}" <tpl if="style">ss:StyleID="{style}"</tpl>>',
            '<ss:Data ss:Type="{type}">',
                '<tpl switch="type">',
                    '<tpl case="String">',
                        '{[this.formatString(values.value)]}',
                    '<tpl default>',
                        '{value}',
                '</tpl>',
            '</ss:Data>',
        '</ss:Cell>', {
            formatString: Ext.String.htmlEncode
        }
    )
});