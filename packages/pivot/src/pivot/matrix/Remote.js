/**
* This matrix allows you to do all the calculations on the backend.
* This is handy when you have large datasets.
* 
* Basically this class sends to the specified URL the configurations for
* leftAxis, topAxis and aggregate and expects back a JSON with the following format:
* 
* - success = true/false
* 
* - leftAxis = array of items that were generated for the left axis. Each item is an 
* object with keys for: key, value, name, dimensionId. If you send back the item name and you also
* have a renderer defined then the renderer is not called anymore.
* 
* - topAxis = array of items that were generated for the top axis.
* 
* - results = array of results for all left/top axis items. Each result is an object
* with keys for: leftKey, topKey, values. The 'values' object has keys for each
* aggregate id that was sent to the backend.
* 
* It is very important to use the dimension IDs that were sent to the backend
* instead of creating new ones.
* 
* This class can also serve as an example for implementing various types of
* remote matrix.
* 
*/
Ext.define('Ext.pivot.matrix.Remote', {
    alternateClassName: [
        'Mz.aggregate.matrix.Remote'
    ],

    extend: 'Ext.pivot.matrix.Abstract',
    
    alias:  'pivotmatrix.remote',

    /**
    * URL on the server side where the calculations are performed.
    * 
    * @cfg
    * @type String
    */
    url:        '',
    /**
    * The timeout in miliseconds to be used for the server side request.
    * Default to 30 seconds.
    * 
    * @type Number
    */
    timeout:    3000,
    
    constructor: function(){
        var me = this;
        
        me.callParent(arguments);
        
        /**
        * Fires before requesting data from the server side.
        * Return false if you don't want to make the Ajax request.
        *
        * @event beforerequest
        * @param {Ext.pivot.matrix.Remote} matrix Reference to the Matrix object
        * @param {Object} params Params sent by the Ajax request
        */

        /**
        * Fires if there was any Ajax exception or the success value in the response was false.
        *
        * @event requestexception
        * @param {Ext.pivot.matrix.Remote} matrix Reference to the Matrix object
        * @param {Object} response The Ajax response object
        */
    },
    
    /**
    * Template function called before doing the Ajax request
    * You could change the request params in a subclass if you implement this method.
    * Return false if you don't want to make the Ajax request.
    * 
    * @param {Object} params
    */
    onBeforeRequest: Ext.emptyFn,
    
    /**
    * Template function called if there was any Ajax exception or the success value 
    * in the response was false.
    * You could handle the exception in a subclass if you implement this method.
    * 
    * @param {Object} response
    */
    onRequestException: Ext.emptyFn,

    onInitialize: function(){
        var me = this;
        
        me.remoteDelayedTask = new Ext.util.DelayedTask(me.delayedProcess, me);
        
        me.callParent(arguments);
    },
    
    startProcess: function(){
        var me = this;
        
        if(Ext.isEmpty(me.url)){
            // nothing to do
            return;
        }
        
        me.clearData();
        
        // let's start the process
        me.fireEvent('start', me);

        me.statusInProgress = false;
        
        me.remoteDelayedTask.delay(5);
    },
    
    delayedProcess: function(){
        var me = this,
            leftAxis = [],
            topAxis = [],
            aggregate = [],
            ret, params;
        
        me.leftAxis.dimensions.each(function(item){
            leftAxis.push(item.serialize());
        });
        
        me.topAxis.dimensions.each(function(item){
            topAxis.push(item.serialize());
        });
        
        me.aggregate.each(function(item){
            aggregate.push(item.serialize());
        });
        
        params = {
            keysSeparator:  me.keysSeparator,
            grandTotalKey:  me.grandTotalKey,
            leftAxis:       leftAxis,
            topAxis:        topAxis,
            aggregate:      aggregate
        };
        
        ret = me.fireEvent('beforerequest', me, params);
        
        if(ret !== false){
            if(Ext.isFunction(me.onBeforeRequest)){
                ret = me.onBeforeRequest(params);
            }
        }
        
        if(ret === false){
            me.endProcess();        
        }else{
            // do an Ajax call to the configured URL and fetch the results
            Ext.Ajax.request({
                url:        me.url,
                timeout:    me.timeout,
                jsonData:   params,
                callback:   me.processRemoteResults,
                scope:      me
            });
        }
    },
    
    /**
    * @private
    * Ajax request callback
    */
    processRemoteResults: function(options, success, response){
        var me = this,
            exception = !success,
            data = Ext.JSON.decode(response.responseText, true);
        
        if(success){
            exception = (!data || !data['success']);
        }
        
        if(exception){
            // handle exception
            me.fireEvent('requestexception', me, response);
            
            if(Ext.isFunction(me.onRequestException)){
                me.onRequestException(response);
            }

            me.endProcess();
            return;
        }
        
        Ext.Array.each(Ext.Array.from(data.leftAxis || []), function(item){
            if(Ext.isObject(item)){
                me.leftAxis.addItem(item);
            }
        });
        
        Ext.Array.each(Ext.Array.from(data.topAxis || []), function(item){
            if(Ext.isObject(item)){
                me.topAxis.addItem(item);
            }
        });
        
        Ext.Array.each(Ext.Array.from(data.results || []), function(item){
            if(Ext.isObject(item)){
                var result = me.results.add(item.leftKey || '', item.topKey || '');
                Ext.Object.each(item.values || {}, result.addValue, result);
            }
        });
        
        me.endProcess();
    }
    
});