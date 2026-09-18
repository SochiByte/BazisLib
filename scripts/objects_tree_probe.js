/*
============================================================

Bazis 2026

Probe:

objects_tree_probe.js

Purpose:
Исследование дерева Model.Objects

============================================================
*/

var fs = require("fs");

var out = [];

function log(s)
{
    out.push(String(s));
}


try
{

    log("=== OBJECT TREE PROBE ===");


    var list = Model.Objects;


    log("Objects[0]");

    var obj = list[0];


    log("typeof: " + typeof obj);

    log("toString: " + obj);


    log("Name: " + obj.Name);

    log("UID: " + obj.UID);

    log("Owner: " + obj.Owner);

    log("List: " + obj.List);


    log("--- CHILDREN ---");


    try
    {

        var ch = obj.Children();

        log("Children type: " + typeof ch);

        log("Children: " + ch);

    }
    catch(e)
    {
        log("Children ERROR: " + e);
    }



}
catch(e)
{
    log("GLOBAL ERROR:");
    log(e);
}



var file =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\objects_tree_probe.txt";


fs.writeFileSync(
    file,
    out.join("\n")
);


console.log("DONE");
console.log(file);