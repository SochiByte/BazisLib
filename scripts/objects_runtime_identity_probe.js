/*
============================================================
Bazis 2026

objects_runtime_identity_probe.js

Определение настоящего типа Model.Objects
============================================================
*/


var fs = require("fs");

var out =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\objects_runtime_identity_probe.txt";


var log = [];


function L(x)
{
    log.push(String(x));
}


try
{

    var obj = Model.Objects;


    L("=== OBJECT RUNTIME IDENTITY ===");


    L("typeof:");
    L(typeof obj);


    L("toString:");
    L(obj.toString());


    L("constructor:");
    L(obj.constructor);


    L("constructor name:");

    try
    {
        L(obj.constructor.name);
    }
    catch(e)
    {
        L("ERROR " + e);
    }


    L("prototype:");

    try
    {
        L(Object.getPrototypeOf(obj));
    }
    catch(e)
    {
        L("ERROR " + e);
    }


    L("properties:");

    for(var k in obj)
    {
        L(k + " : " + typeof obj[k]);
    }


}
catch(e)
{
    L("GLOBAL ERROR:");
    L(e);
}


fs.writeFileSync(
    out,
    log.join("\n")
);


console.log("DONE");