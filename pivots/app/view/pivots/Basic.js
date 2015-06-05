Ext.define('Pivot.view.pivots.Basic', {
    requires: [
        'Ext.util.Format'
    ],
    extend: 'Ext.pivot.Grid',
    alias: 'widget.pivotbasic',
    itemId: 'pivotbasic',

    aggregate: [{
        dataIndex: 'value',
        header: 'Sum of value',
        aggregator: 'sum'
    }, {
        dataIndex: 'value',
        header: '# records',
        aggregator: 'count',
        align: 'right',
        renderer: Ext.util.Format.numberRenderer('0')
    }],

    selType : 'checkboxmodel',

    leftAxis: [
    {
        dataIndex:  'company',
        header:     'Company',
        sortable:   false
    },{
        dataIndex:  'year',
        header:     'Year',
        sortable:   false
    }],

    topAxis: [{
        width: 120,
        dataIndex: 'country'
    }]
});
