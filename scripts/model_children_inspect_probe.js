/*
============================================================

Bazis 2026

Probe:

model_children_inspect_probe.js

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

    L("=== MODEL CHILDREN INSPECT ===");


    var ch = Model.Children();


    L("typeof:");
    L(typeof ch);


    L("toString:");
    L(ch);


    try
    {
        L(
            "constructor: " +
            ch.constructor
        );
    }
    catch(e)
    {
        L("constructor ERROR " + e);
    }


    var props =
    [
        "Count",
        "Length",
        "Items",
        "Objects",
        "Current",
        "MoveNext",
        "Reset"
    ];


    L("--- PROPERTIES ---");


    for(var i=0;i<props.length;i++)
    {

        var p = props[i];

        try
        {
            L(
                p +
                " : " +
                typeof ch[p] +
                " = " +
                ch[p]
            );
        }
        catch(e)
        {
            L(
                p +
                " ERROR " +
                e
            );
        }

    }


    L("--- INDEX ---");


    for(var n=0;n<5;n++)
    {

        try
        {
            var item = ch[n];

            L(
                "["+
                n+
                "] " +
                typeof item +
                " " +
                item
            );

        }
        catch(e)
        {
            L(
                "["+
                n+
                "] ERROR " +
                e
            );
        }

    }


}
catch(e)
{
    L("GLOBAL ERROR");
    L(e);
}


var file =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\model_children_inspect_probe.txt";


fs.writeFileSync(
    file,
    log.join("\n")
);


console.log("DONE");