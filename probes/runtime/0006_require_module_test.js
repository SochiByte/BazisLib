/*
============================================================

SochiCabinetMaker

Probe:
    0006_require_module_test.js

Purpose:
    Проверка загрузки собственного модуля

============================================================
*/


try
{
    var testModule =
        require(
            "C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\test_module.js"
        );


    console.log("MODULE LOAD SUCCESS");

    console.log("Name: " + testModule.name);

    console.log("Version: " + testModule.version);
}
catch(e)
{
    console.log("MODULE LOAD ERROR");

    console.log(e.toString());
}