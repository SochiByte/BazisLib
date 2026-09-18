/*
============================================================

SochiCabinetMaker

Probe:

    0017_scm_loader_api_test.js


Purpose:

    Проверка API scm_loader


============================================================
*/


try
{

    var SCM =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\scm_loader.js"
        );


    console.log("SCM LOADER LOAD SUCCESS");


    console.log(
        "Loader type: " + typeof SCM
    );


    console.log(
        "Root: " + SCM.root
    );


    console.log(
        "Load method: " + typeof SCM.load
    );


    var Logger =
        SCM.load(
            "scm_logger"
        );


    console.log(
        "MODULE LOAD SUCCESS"
    );


    console.log(
        "Logger type: " + typeof Logger
    );


}
catch(e)
{

    console.log("SCM LOADER TEST ERROR");

    console.log(e.toString());

}