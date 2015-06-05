Ext.define('Pivot.view.pivots.PivotConfiguratorPlugin', {
    extend: 'Pivot.view.pivots.Basic',
    alias: 'widget.pivotconfiguratorplugin',
    itemId: 'pivotconfiguratorplugin',

    requires: ['Mz.pivot.plugin.Configurator'],

    plugins: [{
        ptype: 'mzconfigurator'
    }]

});
