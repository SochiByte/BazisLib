/*
============================================================

SochiCabinetMaker

Probe:

    0001_globals_dump.js


Purpose:

    Исследование глобальных объектов
    Runtime БАЗИС-Мебельщик 2026 Online.


Result:

    output/api_globals_dump.txt


============================================================
*/


var fs = require("fs");


var output =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\api_globals_dump.txt";


var result = [];


function check(name)
{
    try
    {
        result.push(
            name +
            " : " +
            typeof global[name]
        );
    }
    catch(e)
    {
        result.push(
            name +
            " : ERROR"
        );
    }
}


result.push(
"============================================================"
);

result.push(
"SochiCabinetMaker API GLOBALS DUMP"
);

result.push(
"Runtime globals inspection"
);


result.push(
"============================================================"
);


var names =
[
    "Application",
    "Model",
    "Document",
    "Editor",
    "System",
    "File",
    "Script",
    "Scene",
    "Selection",
    "Object",
    "Geometry",
    "Material"
];


for(
    var i = 0;
    i < names.length;
    i++
)
{
    check(names[i]);
}


result.push(
"============================================================"
);


fs.writeFileSync(
    output,
    result.join("\n")
);


console.log(
"GLOBALS DUMP SAVED"
);


console.log(
output
);