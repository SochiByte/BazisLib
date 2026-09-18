/*
============================================================

Bazis 2026

Probe:

ienumerable_probe.js

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

    L("=== IENUMERABLE PROBE ===");


    var e = Model.Children();


    L(
        "constructor: " +
        e.constructor
    );


    var names =
    [
        "GetEnumerator",
        "next",
        "MoveNext",
        "Current",
        "Reset",
        "forEach",
        "iterator"
    ];


    for(var i=0;i<names.length;i++)
    {

        var n = names[i];

        try
        {
            L(
                n +
                " typeof=" +
                typeof e[n] +
                " value=" +
                e[n]
            );
        }
        catch(err)
        {
            L(
                n +
                " ERROR " +
                err
            );
        }

    }


    L("--- TRY GET ENUMERATOR ---");


    try
    {

        var en = e.GetEnumerator();


        L(
            "enum type: " +
            typeof en
        );

        L(
            "enum: " +
            en
        );


    }
    catch(err)
    {

        L(
            "GetEnumerator ERROR " +
            err
        );

    }



}
catch(e)
{
    L("GLOBAL ERROR");
    L(e);
}



var file =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\ienumerable_probe.txt";


fs.writeFileSync(
    file,
    log.join("\n")
);


console.log("DONE");