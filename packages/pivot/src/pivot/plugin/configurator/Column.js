/**
 *
 * This class is used for creating a configuration field.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.plugin.configurator.Column',{
    extend: 'Ext.Component',
    
    requires: [
        'Ext.menu.Menu',
        'Ext.pivot.plugin.configurator.FilterLabelWindow'
    ],
    
    alias: 'widget.pivotconfigcolumn',
    
    childEls: ['textCol', 'filterCol', 'sortCol'],
    
    renderTpl: 
        '<div id="{id}-configCol" class="' + Ext.baseCSSPrefix + 'config-column-inner">' +
            '<tpl if="isCustomizable">' +
                '<span id={id}-customCol class="' + Ext.baseCSSPrefix + 'config-column-customize ' + Ext.baseCSSPrefix + 'border-box ' + Ext.baseCSSPrefix + 'config-column-icon"></span>' +
            '</tpl>' +
            '<span id={id}-sortCol data-ref="sortCol" class="' + Ext.baseCSSPrefix + 'border-box ' + Ext.baseCSSPrefix + 'config-column-icon"></span>' +
            '<span id={id}-filterCol data-ref="filterCol" class="' + Ext.baseCSSPrefix + 'border-box ' + Ext.baseCSSPrefix + 'config-column-icon"></span>' +
            '<span id="{id}-textCol" data-ref="textCol" data-qtip="{header}{aggregator}" class="' + Ext.baseCSSPrefix + 'config-column-text ' + Ext.baseCSSPrefix + 'column-header-text ' + Ext.baseCSSPrefix + 'border-box">' +
                '{header}{aggregator}' +
            '</span>' +
        '</div>',
        
    header:         '&#160;',
    isCustomizable: false,
    dimension:      null,
    isAgg:          false,

    sumText:                    'Sum',
    avgText:                    'Avg',
    countText:                  'Count',
    minText:                    'Min',
    maxText:                    'Max',
    groupSumPercentageText:     'Group sum percentage',
    groupCountPercentageText:   'Group count percentage',
    varText:                    'Var',
    varPText:                   'Varp',
    stdDevText:                 'StdDev',
    stdDevPText:                'StdDevp',

    sortAscText:                'Sort A to Z',
    sortDescText:               'Sort Z to A',
    sortClearText:              'Disable sorting',
    clearFilterText:            'Clear filter from "{0}"',
    labelFiltersText:           'Label filters',
    valueFiltersText:           'Value filters',
    equalsText:                 'Equals...',
    doesNotEqualText:           'Does not equal...',
    beginsWithText:             'Begins with...',
    doesNotBeginWithText:       'Does not begin with...',
    endsWithText:               'Ends with...',
    doesNotEndWithText:         'Does not end with...',
    containsText:               'Contains...',
    doesNotContainText:         'Does not contain...',
    greaterThanText:            'Greater than...',
    greaterThanOrEqualToText:   'Greater than or equal to...',
    lessThanText:               'Less than...',
    lessThanOrEqualToText:      'Less than or equal to...',
    betweenText:                'Between...',
    notBetweenText:             'Not between...',
    top10Text:                  'Top 10...',

    equalsLText:                'equals',
    doesNotEqualLText:          'does not equal',
    beginsWithLText:            'begins with',
    doesNotBeginWithLText:      'does not begin with',
    endsWithLText:              'ends with',
    doesNotEndWithLText:        'does not end with',
    containsLText:              'contains',
    doesNotContainLText:        'does not contain',
    greaterThanLText:           'is greater than',
    greaterThanOrEqualToLText:  'is greater than or equal to',
    lessThanLText:              'is less than',
    lessThanOrEqualToLText:     'is less than or equal to',
    betweenLText:               'is between',
    notBetweenLText:            'is not between',
    top10LText:                 'Top 10...',
    topOrderTopText:            'Top',
    topOrderBottomText:         'Bottom',
    topTypeItemsText:           'Items',
    topTypePercentText:         'Percent',
    topTypeSumText:             'Sum',

    ascSortCls:         Ext.baseCSSPrefix + 'config-column-sort-ASC',
    descSortCls:        Ext.baseCSSPrefix + 'config-column-sort-DESC',
    baseCls:            Ext.baseCSSPrefix + 'config-column',
    filteredCls:        Ext.baseCSSPrefix + 'config-column-filtered',
    clearFilterIconCls: Ext.baseCSSPrefix + 'clearFilterIcon',
    ascSortIconCls:     Ext.baseCSSPrefix + 'sortAscIcon',
    descSortIconCls:    Ext.baseCSSPrefix + 'sortDescIcon',
    disableSortIconCls: Ext.baseCSSPrefix + 'sortDisableIcon',
    
    //height:         '100%',
    //height:         23,
    
    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);
        
        /**
        * @event sortchange
        * @param {Ext.pivot.plugin.configurator.Column} col
        * @param String direction
        */

        /**
         * @event filterchange
         * @param {Ext.pivot.plugin.configurator.Column} col
         * @param String direction
         */
    },
    
    destroy: function(){
        var me = this;
        
        delete(me.dimension);
        Ext.destroy(me.relayers, me.menu);
        me.callParent(arguments);
    },
    
    show: function(){
        var me = this;
        
        me.callParent();
    },
    
    initRenderData: function() {
        var me = this;

        return Ext.apply(me.callParent(arguments), {
            header:         me.dimension.header,
            aggregator:     me.isAgg ? ' (' + me.dimension.aggregator + ')' : '',
            dimension:      me.dimension,
            isCustomizable: me.isCustomizable
        });
    },
    
    afterRender: function(){
        var me = this;
        
        me.callParent();

        if(me.isCustomizable){
            if(me.dimension.sortable){
                me.addSortCls(me.dimension.direction);
            }
            
            if(me.dimension.filter){
                me.addFilterCls();
            }

            me.mon(me.getTargetEl(), {
                scope: me,
                click: me.handleColClick
            });
        } 
        
    },

    handleColClick: function(e, t){
        // handles grid column sorting
        var me = this;
        
        if(me.isAgg){
            me.showAggMenu();
            e.stopEvent();
        }else{
            me.showColMenu();
        }
    },
    
    handleMenuClick: function(item, e){
        var me = this,
            method;
        
        me.dimension.aggregator = item.aggregator;
        if(me.textCol){
            method = me.textCol.setHtml ? 'setHtml' : 'setHTML';
            me.textCol[method](me.header + ' (' + me.dimension.aggregator + ')');
        }
        me.ownerCt.updateLayout();
        me.fireEvent('configchange');
    },
    
    addSortCls: function(direction){
        var me = this;
        
        if(!me.sortCol){
            return;
        }
        
        if(direction === 'ASC'){
            me.sortCol.addCls(me.ascSortCls);
            me.sortCol.removeCls(me.descSortCls);
        }else{
            me.sortCol.addCls(me.descSortCls);
            me.sortCol.removeCls(me.ascSortCls);
        }

    },
    
    removeSortCls: function(direction){
        var me = this;
        
        if(!me.sortCol){
            return;
        }
        
        if(direction === 'ASC'){
            me.sortCol.removeCls(me.ascSortCls);
        }else{
            me.sortCol.removeCls(me.descSortCls);
        }

    },
    
    addFilterCls: function(){
        var me = this;
        
        if(me.filterCol && !me.filterCol.hasCls(me.filteredCls)){
            me.filterCol.addCls(me.filteredCls);
        }
    },
    
    removeFilterCls: function(){
        var me = this;
        
        if(me.filterCol){
            me.filterCol.removeCls(me.filteredCls);
        }
    },

    serialize: function(){
        var me = this;
        
        return Ext.applyIf({
            idColumn:       me.id
        }, me.initialConfig);
    },
    
    showAggMenu: function(){
        var me = this,
            aggregator = me.dimension.aggregator;
        
        //create a menu with possible aggregate functions
        Ext.destroy(me.menu);
        me.menu = Ext.create('Ext.menu.Menu', {
            floating:   true,
            defaults: {
                handler:    me.handleMenuClick,
                scope:      me,
                xtype:      'menucheckitem',
                group:      'aggregator'
            },
            items: [{
                text:       me.sumText,
                aggregator: 'sum',
                checked:    aggregator == 'sum'
            },{
                text:       me.avgText,
                aggregator: 'avg',
                checked:    aggregator == 'avg'
            },{
                text:       me.countText,
                aggregator: 'count',
                checked:    aggregator == 'count'
            },{
                text:       me.maxText,
                aggregator: 'max',
                checked:    aggregator == 'max'
            },{
                text:       me.minText,
                aggregator: 'min',
                checked:    aggregator == 'min'
            },{
                text:       me.groupSumPercentageText,
                aggregator: 'groupSumPercentage',
                checked:    aggregator == 'groupSumPercentage'
            },{
                text:       me.groupCountPercentageText,
                aggregator: 'groupCountPercentage',
                checked:    aggregator == 'groupCountPercentage'
            },{
                text:       me.stdDevText,
                aggregator: 'stdDev',
                checked:    aggregator == 'stdDev'
            },{
                text:       me.stdDevPText,
                aggregator: 'stdDevP',
                checked:    aggregator == 'stdDevP'
            },{
                text:       me.varText,
                aggregator: 'variance',
                checked:    aggregator == 'variance'
            },{
                text:       me.varPText,
                aggregator: 'varianceP',
                checked:    aggregator == 'varianceP'
            }]
        });
        me.menu.showBy(me);
    },
    
    showColMenu: function(){
        var me = this,
            items = [], 
            labelItems, valueItems, commonItems, i,
            filter = me.dimension.filter;

        Ext.destroy(me.menu);
        
        // check if the dimension is sortable
        items.push({
            text:       me.sortAscText,
            direction:  'ASC',
            iconCls:    me.ascSortIconCls,
            handler:    me.sortMe
        }, {
            text:       me.sortDescText,
            direction:  'DESC',
            iconCls:    me.descSortIconCls,
            handler:    me.sortMe
        }, {
            text:       me.sortClearText,
            direction:  '',
            disabled:   !me.dimension.sortable,
            iconCls:    me.disableSortIconCls,
            handler:    me.sortMe
        },{
            xtype:  'menuseparator'
        });
        
        commonItems = [{
            text:       me.equalsText,
            filterType: Ext.pivot.filter.Label.TypeEquals
        },{
            text:       me.doesNotEqualText,
            filterType: Ext.pivot.filter.Label.TypeDoesNotEqual
        },{
            xtype:  'menuseparator'
        },{
            text:       me.greaterThanText,
            filterType: Ext.pivot.filter.Label.TypeGreaterThan
        },{
            text:       me.greaterThanOrEqualToText,
            filterType: Ext.pivot.filter.Label.TypeGreaterThanOrEqualTo
        },{
            text:       me.lessThanText,
            filterType: Ext.pivot.filter.Label.TypeLessThan
        },{
            text:       me.lessThanOrEqualToText,
            filterType: Ext.pivot.filter.Label.TypeLessThanOrEqualTo
        },{
            xtype:  'menuseparator'
        },{
            text:       me.betweenText,
            filterType: Ext.pivot.filter.Label.TypeBetween
        },{
            text:       me.notBetweenText,
            filterType: Ext.pivot.filter.Label.TypeNotBetween
        }];

        labelItems = Ext.clone(commonItems);
        Ext.Array.insert(labelItems, 3, [{
            text:       me.beginsWithText,
            filterType: Ext.pivot.filter.Label.TypeBeginsWith
        },{
            text:       me.doesNotBeginWithText,
            filterType: Ext.pivot.filter.Label.TypeDoesNotBeginWith
        },{
            text:       me.endsWithText,
            filterType: Ext.pivot.filter.Label.TypeEndsWith
        },{
            text:       me.doesNotEndWithText,
            filterType: Ext.pivot.filter.Label.TypeDoesNotEndWith
        },{
            xtype:  'menuseparator'
        },{
            text:       me.containsText,
            filterType: Ext.pivot.filter.Label.TypeContains
        },{
            text:       me.doesNotContainText,
            filterType: Ext.pivot.filter.Label.TypeDoesNotContain
        },{
            xtype:  'menuseparator'
        }]);

        for(i = 0; i < labelItems.length; i++){
            labelItems[i]['checked'] = (filter && filter.mztype == 'label' && filter.type == labelItems[i].filterType);
        }
        
        valueItems = Ext.clone(commonItems);
        valueItems.push({
            xtype:  'menuseparator'
        },{
            text:       me.top10Text,
            filterType: Ext.pivot.filter.Value.TypeTop10
        });

        for(i = 0; i < valueItems.length; i++){
            valueItems[i]['checked'] = (filter && filter.mztype == 'value' && filter.type == valueItems[i].filterType);
        }
        
        items.push({
            text:       Ext.String.format(me.clearFilterText, me.header),
            iconCls:    me.clearFilterIconCls,
            disabled:   !filter,
            handler:    me.onRemoveFilter
        },{
            text:   me.labelFiltersText,
            menu: {
                defaults: {
                    handler:    me.onShowFilter,
                    scope:      me,
                    xtype:      'menucheckitem',
                    group:      'filterlabel',
                    mztype:     'label'
                },
                items: labelItems
            }
        },{
            text:   me.valueFiltersText,
            menu: {
                defaults: {
                    handler:    me.onShowFilter,
                    scope:      me,
                    xtype:      'menucheckitem',
                    group:      'filtervalue',
                    mztype:     'value'
                },
                items: valueItems
            }
        });
        
        me.menu = Ext.create('Ext.menu.Menu', {
            floating:   true,
            defaults: {
                scope:      me
            },
            items: items
        });
        me.menu.showBy(me);
    },
    
    sortMe: function(btn){
        var me = this;
            
        if(Ext.isEmpty(btn.direction)){
            //disable sorting
            me.dimension.sortable = false;
            me.removeSortCls(me.dimension.direction);
        }else{
            me.dimension.sortable = true;
            me.addSortCls(btn.direction);
            me.dimension.direction = btn.direction;
        }
        me.fireEvent('sortchange', me, btn.direction);
    },
    
    onShowFilter: function(btn){
        var me = this,
            win, store, winClass, winCfg = {}, data, dataAgg,
            filter = me.dimension.filter,
            values = {
                mztype:         btn.mztype,
                type:           btn.filterType,
                value:          (filter ? filter.value : ''),
                from:           (filter ? filter.from : ''),
                to:             (filter ? filter.to : ''),
                caseSensitive:  (filter ? filter.caseSensitive : false),
                topSort:        (filter ? filter.topSort : false)
            };
        
        dataAgg = [];
        Ext.each(me.ownerCt.aggregateDimensions, function(field){
            dataAgg.push([field.header, field.id]);
        });

        if(btn.mztype == 'label' || (btn.mztype == 'value' && btn.filterType != Ext.pivot.filter.Value.TypeTop10)){
            data = [
                [me.equalsLText, Ext.pivot.filter.Label.TypeEquals],
                [me.doesNotEqualLText, Ext.pivot.filter.Label.TypeDoesNotEqual],
                [me.greaterThanLText, Ext.pivot.filter.Label.TypeGreaterThan],
                [me.greaterThanOrEqualToLText, Ext.pivot.filter.Label.TypeGreaterThanOrEqualTo],
                [me.lessThanLText, Ext.pivot.filter.Label.TypeLessThan],
                [me.lessThanOrEqualToLText, Ext.pivot.filter.Label.TypeLessThanOrEqualTo],
                [me.betweenLText, Ext.pivot.filter.Label.TypeBetween],
                [me.notBetweenLText, Ext.pivot.filter.Label.TypeNotBetween]
            ];
            
            if(btn.mztype == 'label'){
                Ext.Array.insert(data, 3, [
                    [me.beginsWithLText, Ext.pivot.filter.Label.TypeBeginsWith],
                    [me.doesNotBeginWithLText, Ext.pivot.filter.Label.TypeDoesNotBeginWith],
                    [me.endsWithLText, Ext.pivot.filter.Label.TypeEndsWith],
                    [me.doesNotEndWithLText, Ext.pivot.filter.Label.TypeDoesNotEndWith],
                    [me.containsLText, Ext.pivot.filter.Label.TypeContains],
                    [me.doesNotContainLText, Ext.pivot.filter.Label.TypeDoesNotContain]
                ]);
                winClass = 'Ext.pivot.plugin.configurator.FilterLabelWindow';
            }else{
                winClass = 'Ext.pivot.plugin.configurator.FilterValueWindow';
                Ext.apply(values, {
                    dimensionId:    (filter ? filter.dimensionId : '')
                });
                
                winCfg.storeAgg = Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:   dataAgg
                });
            }
            
            winCfg.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['text', 'value'],
                data:   data
            });
        }else{
            winClass = 'Ext.pivot.plugin.configurator.FilterTopWindow';
            data = [];

            Ext.apply(winCfg, {
                storeTopOrder: Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:[
                        [me.topOrderTopText, 'top'],
                        [me.topOrderBottomText, 'bottom']
                    ]
                }),
                storeTopType: Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:[
                        [me.topTypeItemsText, 'items'],
                        [me.topTypePercentText, 'percent'],
                        [me.topTypeSumText, 'sum']
                    ]
                }),
                storeAgg: Ext.create('Ext.data.ArrayStore', {
                    fields: ['text', 'value'],
                    data:   dataAgg
                })
            });

            Ext.apply(values, {
                type:           Ext.pivot.filter.Value.TypeTop10,
                dimensionId:    (filter ? filter.dimensionId : ''),
                topType:        (filter ? filter.topType : 'items'),
                topOrder:       (filter ? filter.topOrder : 'top')
            });
        }
        
        win = Ext.create(winClass, Ext.apply(winCfg || {}, {
            title:      me.header,
            listeners: {
                filter: me.onApplyFilter,
                scope:  me
            }
        }));
        
        win.down('form').getForm().setValues(values);
        win.show();
    },
    
    onApplyFilter: function(win){
        var me = this,
            filter = win.down('form').getForm().getValues();
        
        filter.caseSensitive = (filter.caseSensitive === 'on');
        filter.topSort = (filter.topSort === 'on');
        win.close();
        me.addFilterCls();
        me.dimension.filter = filter;
        me.fireEvent('filterchange', me, filter);
    },
    
    onRemoveFilter: function(){
        var me = this;
        
        me.removeFilterCls();
        me.dimension.filter = null;
        me.fireEvent('filterchange', me, null);
    }
    
    
});