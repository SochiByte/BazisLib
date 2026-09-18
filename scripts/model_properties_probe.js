/*
============================================================

SochiCabinetMaker

Probe:

    model_properties_probe.js

Purpose:

    Исследование свойств Model

============================================================
*/


var fs = require("fs");

var out = "";


function log(text)
{
    out += text + "\n";
}


try
{

    log("=== MODEL PROPERTIES PROBE ===");


    log(
        "Model type: " + typeof Model
    );


    for (var p in Model)
    {

        try
        {
            log(
                p + " : " + typeof Model[p]
            );
        }
        catch(e)
        {
            log(
                p + " ERROR: " + e
            );
        }

    }

}
catch(e)
{
    log(
        "GLOBAL ERROR: " + e
    );
}



fs.writeFileSync(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\model_properties_probe.txt",
out
);