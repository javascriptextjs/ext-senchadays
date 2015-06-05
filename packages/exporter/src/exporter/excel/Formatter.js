/**
 *   The excel formatter is a modified version of Ext.ux.Formatter (https://github.com/edspencer/Ext.ux.Exporter).
 *
 *   @private
 *
 */
Ext.define('Ext.exporter.excel.Formatter', {
    extend: 'Ext.exporter.Formatter',

    requires: [
        'Ext.exporter.excel.Workbook'
    ],

    format: function () {
        var me = this,
            workbook = Ext.create('Ext.exporter.excel.Workbook', me.config || {});
            
        workbook.addWorksheet(me.data, me.config || {});

        return workbook.render();
    }
});