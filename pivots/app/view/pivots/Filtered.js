Ext.define('Pivot.view.pivots.Filtered', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.pivotfiltered',
    itemId: 'pivotfiltered',

    tbar: [{
        xtype: 'button',
        text: 'Set filter',
        menu: {
            items: [{
                text: 'Show companies that start with A',
                handler: function(btn) {
                    btn.up('pivotfiltered').reconfigurePivot({
                        leftAxis: [{
                            dataIndex: 'company',
                            header: 'Company',
                            sortable: false,
                            filter: {
                                mztype: 'label',
                                type: Mz.aggregate.filter.Label.TypeBeginsWith,
                                value: 'A'
                            }
                        }]
                    })
                }
            }, {
                text: 'Show countries with 50-320 records',
                handler: function(btn) {
                    btn.up('pivotfiltered').reconfigurePivot({
                        topAxis: [{
                            width: 120,
                            dataIndex: 'country',
                            filter: {
                                mztype: 'value',
                                dimensionId: 'agg2',
                                type: Mz.aggregate.filter.Value.TypeBetween,
                                from: 50,
                                to: 320
                            }
                        }]
                    })
                }
            }, {
                text: 'Show top 3 companies by Sum of value',
                handler: function(btn) {
                    btn.up('pivotfiltered').reconfigurePivot({
                        leftAxis: [{
                            header: 'Company',
                            sortable: false,
                            dataIndex: 'company',
                            filter: {
                                mztype: 'value',
                                dimensionId: 'agg2',
                                type: Mz.aggregate.filter.Value.TypeTop10,
                                topType: 'items',
                                topOrder: 'top',
                                value: 3
                            }
                        }]
                    })
                }
            }, {
                text: 'Show last 3 countries by Sum of value',
                handler: function(btn) {
                    btn.up('pivotfiltered').reconfigurePivot({
                        topAxis: [{
                            width: 120,
                            dataIndex: 'country',
                            filter: {
                                mztype: 'value',
                                dimensionId: 'agg2',
                                type: Mz.aggregate.filter.Value.TypeTop10,
                                topType: 'items',
                                topOrder: 'bottom',
                                value: 3
                            }
                        }]
                    })
                }
            }]
        }
    }, {
        xtype: 'button',
        text: 'Clear filter',
        handler: function(btn) {
            btn.up('pivotfiltered').reconfigurePivot({
                leftAxis: [{
                    dataIndex: 'company',
                    header: 'Company',
                    sortable: false
                }],

                topAxis: [{
                    width: 120,
                    dataIndex: 'country'
                }]
            })
        }
    }],

    aggregate: [{
        id: 'agg1',
        dataIndex: 'value',
        header: 'Sum of value',
        aggregator: 'sum'
    }, {
        id: 'agg2',
        dataIndex: 'value',
        header: '# records',
        aggregator: 'count',
        align: 'right',
        renderer: Ext.util.Format.numberRenderer('0')
    }],

    leftAxis: [{
        dataIndex: 'company',
        header: 'Company',
        sortable: false
    }],

    topAxis: [{
        width: 120,
        dataIndex: 'country'
    }]

});
