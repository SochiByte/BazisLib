/*
============================================================

SochiCabinetMaker

Probe:

    0011_scm_loader_test.js


Purpose:

    Проверка scm_loader

============================================================
*/


try
{

    var loader =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\scm_loader.js"
        );


    console.log("LOADER LOAD SUCCESS");


    var module =
        loader.load("test_module");


    console.log(module.name);

    console.log(module.version);


}
catch(e)
{

    console.log("LOADER ERROR");

    console.log(e.toString());

}