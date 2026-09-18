/*
============================================================

Bazis 2026

Probe:

model_children_probe.js

Purpose:
Проверка методов дерева Model

============================================================
*/

var fs = require("fs");

var log = [];

function L(x)
{
    log.push(String(x));
}


try
{

    L("=== MODEL TREE METHODS ===");


    var methods =
    [
        "Children",
        "Enumerate",
        "GetObjectsList",
        "GetEnumerator",
        "FindObjects"
    ];


    for(var i=0;i<methods.length;i++)
    {

        var name = methods[i];

        L("");
        L("METHOD: " + name);


        try
        {

            var result = Model[name]();


            L(
                "typeof result: " +
                typeof result
            );


            L(
                "result: " +
                result
            );


        }
        catch(e)
        {

            L(
                "ERROR: " +
                e
            );

        }

    }


}
catch(e)
{
    L("GLOBAL ERROR:");
    L(e);
}


var file =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\model_children_probe.txt";


fs.writeFileSync(
    file,
    log.join("\n")
);


console.log("DONE");