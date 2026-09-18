/*
============================================================

SochiCabinetMaker

Probe:

children_native_probe.js

Purpose:
Исследование Model.Children()

============================================================
*/

try
{
    console.log("=== CHILDREN NATIVE PROBE ===");

    var c = Model.Children();

    console.log("TYPE:");
    console.log(typeof c);

    console.log("STRING:");
    console.log(c.toString());

    console.log("OWN PROPERTIES:");

    for (var p in c)
    {
        try
        {
            console.log(
                p + " : " +
                typeof c[p] +
                " = " +
                c[p]
            );
        }
        catch(e)
        {
            console.log(
                p + " ERROR"
            );
        }
    }


    console.log("=== INDEX TEST ===");

    for(var i=0;i<5;i++)
    {
        try
        {
            var o=c[i];

            console.log(
                "["+i+"] "+
                typeof o+
                " "+
                o
            );
        }
        catch(e)
        {
            console.log(
                "["+i+"] ERROR "+
                e
            );
        }
    }


}
catch(e)
{
    console.log("GLOBAL ERROR");
    console.log(e.toString());
}