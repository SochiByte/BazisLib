/*
============================================================
Bazis 2026

objects_index_access_probe.js

Проверка IndexedProperty Model.Objects
============================================================
*/

var fs = require("fs");

var out =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\objects_index_access_probe.txt";


var log = [];

function L(s)
{
    log.push(String(s));
}


try
{

    L("=== MODEL OBJECTS INDEX ACCESS ===");


    L("typeof Model.Objects: " + typeof Model.Objects);


    try
    {
        L("Count: " + Model.Objects.Count);
    }
    catch(e)
    {
        L("Count ERROR: " + e);
    }


    try
    {
        var a = Model.Objects[0];

        L("Objects[0] type: " + typeof a);
        L("Objects[0]: " + a);

    }
    catch(e)
    {
        L("Objects[0] ERROR: " + e);
    }


    try
    {
        var b = Model.Objects.Item(0);

        L("Item(0) type: " + typeof b);
        L("Item(0): " + b);

    }
    catch(e)
    {
        L("Item(0) ERROR: " + e);
    }


    try
    {
        var c = Model.Objects.Get(0);

        L("Get(0) type: " + typeof c);
        L("Get(0): " + c);

    }
    catch(e)
    {
        L("Get(0) ERROR: " + e);
    }


}
catch(e)
{
    L("GLOBAL ERROR:");
    L(e.toString());
}


fs.writeFileSync(
    out,
    log.join("\n")
);

console.log("DONE");
console.log(out);