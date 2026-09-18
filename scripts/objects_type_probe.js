/*
============================================================

SochiCabinetMaker

Probe:

objects_type_probe.js

Bazis2026

============================================================
*/


try
{

console.log("=== OBJECT TYPE PROBE ===");


var obj = Model.Objects;


console.log(
    "typeof:",
    typeof obj
);


console.log(
    "constructor:",
    obj.constructor
);


console.log(
    "toString:",
    obj.toString()
);


console.log(
    "keys:"
);


for(var k in obj)
{
    console.log(
        k,
        ":",
        typeof obj[k]
    );
}


console.log(
    "=== END ==="
);


}
catch(e)
{

console.log(
    "ERROR:"
);

console.log(
    e.toString()
);

}