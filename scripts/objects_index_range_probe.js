var fs = require("fs");

var out =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\objects_index_range_probe.txt";


var log = [];

function L(x)
{
    log.push(String(x));
}


try
{

    L("=== OBJECTS INDEX RANGE ===");


    for(var i = 0; i < 10; i++)
    {

        try
        {
            var obj = Model.Objects[i];

            L(
                "[" + i + "] " +
                typeof obj +
                " " +
                obj
            );

        }
        catch(e)
        {
            L(
                "[" + i + "] ERROR " + e
            );
        }

    }


}
catch(e)
{
    L("GLOBAL ERROR");
    L(e);
}


fs.writeFileSync(
    out,
    log.join("\n")
);

console.log("DONE");