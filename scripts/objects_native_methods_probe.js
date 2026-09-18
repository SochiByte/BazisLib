var fs = require("fs");

var out =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\objects_native_methods_probe.txt";


var log = [];

function L(x)
{
    log.push(String(x));
}


try
{

    var obj = Model.Objects;


    L("=== MODEL OBJECTS NATIVE METHODS ===");


    var names =
    [
        "Count",
        "Length",
        "Size",
        "Get",
        "Item",
        "Add",
        "Clear",
        "Delete",
        "Find",
        "forEach",
        "Enumerate",
        "GetEnumerator",
        "Children"
    ];


    for(var i=0;i<names.length;i++)
    {

        var n = names[i];

        try
        {
            L(
                n +
                " typeof = " +
                typeof obj[n]
            );
        }
        catch(e)
        {
            L(
                n +
                " ERROR " +
                e
            );
        }

    }


    L("--- direct tests ---");


    try
    {
        L(
          "Count value: " +
          obj.Count
        );
    }
    catch(e)
    {
        L("Count ERROR "+e);
    }


    try
    {
        L(
          "Length value: " +
          obj.Length
        );
    }
    catch(e)
    {
        L("Length ERROR "+e);
    }


}
catch(e)
{
    L("GLOBAL ERROR "+e);
}


fs.writeFileSync(
    out,
    log.join("\n")
);


console.log("DONE");