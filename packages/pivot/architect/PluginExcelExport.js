{
    "classAlias":       "plugin.mzexcelexport",
    "className":        "Mz.pivot.plugin.ExcelExport",
    "inherits":         "Ext.AbstractPlugin",
    "autoName":         "MyExcelExport",
    "validParentTypes": ["Mz.pivot.Grid"],
    "helpText":         "A plugin which allows to edit the pivot grid.",

    "toolbox": {
        "name":     "ExcelExport",
        "category": "Pivot Grid plugins",
        "groups":   ["Grids"]
    },

    "configs": [{
        "name":         "showTitle",
        "type":         "boolean",
        "initialValue": true
    },{
        "name":         "title",
        "type":         "string",
        "initialValue": "MyExcelExport"
    },{
        "name":         "cellFontName",
        "type":         "string",
        "initialValue": "Arial"
    },{
        "name":         "cellFontSize",
        "type":         "string",
        "initialValue": "10"
    },{
        "name":         "cellBorderColor",
        "type":         "string",
        "initialValue": "#E4E4E4"
    },{
        "name":         "cellFillColor",
        "type":         "string",
        "initialValue": ""
    },{
        "name":         "titleFontSize",
        "type":         "string",
        "initialValue": "14"
    },{
        "name":         "titleFillColor",
        "type":         "string",
        "initialValue": ""
    },{
        "name":         "headerFontSize",
        "type":         "string",
        "initialValue": "10"
    },{
        "name":         "headerFillColor",
        "type":         "string",
        "initialValue": "#BFBFBF"
    },{
        "name":         "groupHeaderFontSize",
        "type":         "string",
        "initialValue": "10"
    },{
        "name":         "groupHeaderFillColor",
        "type":         "string",
        "initialValue": "#D8D8D8"
    },{
        "name":         "groupFooterFontSize",
        "type":         "string",
        "initialValue": "10"
    },{
        "name":         "groupFooterFillColor",
        "type":         "string",
        "initialValue": "#BFBFBF"
    },{
        "name":         "dateFormat",
        "type":         "string",
        "initialValue": "Short Date"
    },{
        "name":         "numberFormat",
        "type":         "string",
        "initialValue": "Standard"
    },{
        "name":         "protectStructure",
        "type":         "boolean",
        "initialValue": false
    },{
        "name":         "protectWindows",
        "type":         "boolean",
        "initialValue": false
    }]
}