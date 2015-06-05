Ext.define('Pivot.view.pivots.PivotRangeEditorPlugin.js', {
    extend: 'Pivot.view.pivots.Basic',
    alias: 'widget.pivotrangeeditorplugin',
    itemId: 'pivotrangeeditorplugin',

    requires: ['Mz.pivot.plugin.RangeEditor'],

    plugins: [{
        ptype: 'mzrangeeditor'
    }]

});
