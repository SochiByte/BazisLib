/*
============================================================

SochiCabinetMaker

Probe:

objects_first_probe.js

Purpose:

Получение первого объекта Model.Objects

Bazis2026

============================================================
*/

try
{

    console.log("=== OBJECTS FIRST PROBE ===");


    console.log(
        "Objects count:",
        Model.Objects.Count
    );


    var index = 0;


    Model.Objects.forEach(
        function(obj)
        {

            console.log(
                "OBJECT INDEX:",
                index
            );


            console.log(
                "typeof:",
                typeof obj
            );


            try
            {
                console.log(
                    "Name:",
                    obj.Name
                );
            }
            catch(e)
            {
                console.log(
                    "Name ERROR:",
                    e.toString()
                );
            }


            try
            {
                console.log(
                    "UID:",
                    obj.UID
                );
            }
            catch(e)
            {
                console.log(
                    "UID ERROR:",
                    e.toString()
                );
            }


            try
            {
                console.log(
                    "ArtPos:",
                    obj.ArtPos
                );
            }
            catch(e)
            {
                console.log(
                    "ArtPos ERROR:",
                    e.toString()
                );
            }


            try
            {
                console.log(
                    "Designation:",
                    obj.Designation
                );
            }
            catch(e)
            {
                console.log(
                    "Designation ERROR:",
                    e.toString()
                );
            }


            index++;


            if(index >= 3)
            {
                return;
            }

        }
    );


    console.log(
        "=== END ==="
    );

}
catch(e)
{

    console.log(
        "GLOBAL ERROR:"
    );

    console.log(
        e.toString()
    );

}