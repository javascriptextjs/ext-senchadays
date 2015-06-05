Ext.define('Pivot.view.pivots.PivotDrillDownPlugin', {
    extend: 'Pivot.view.pivots.Basic',
    alias: 'widget.pivotdrilldownplugin',
    itemId: 'pivotdrilldownplugin',

    requires: ['Mz.pivot.plugin.DrillDown'],

    plugins: [{
        ptype: 'mzdrilldown'
    }]

});
