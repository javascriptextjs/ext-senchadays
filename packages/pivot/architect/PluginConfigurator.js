{
    "classAlias":       "plugin.mzconfigurator",
    "className":        "Mz.pivot.plugin.Configurator",
    "inherits":         "Ext.AbstractPlugin",
    "autoName":         "MyConfigurator",
    "validParentTypes": ["Mz.pivot.Grid"],
    "helpText":         "A plugin which allows to easily configure the pivot grid",

    "toolbox": {
        "name":     "Configurator",
        "category": "Pivot Grid plugins",
        "groups":   ["Grids"]
    },

    "configs": [{
        "name":         "fields",
        "type":         "array",
        "initialValue": []
    }]
}