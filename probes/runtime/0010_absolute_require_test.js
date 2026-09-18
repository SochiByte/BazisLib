/*
============================================================

SochiCabinetMaker

Probe:
    0010_absolute_require_test.js

Purpose:
    Проверка абсолютного require()

============================================================
*/


try
{
    var testModule =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\test_module.js"
        );


    console.log("ABSOLUTE REQUIRE SUCCESS");

    console.log(testModule.name);

}
catch(e)
{
    console.log("ABSOLUTE REQUIRE ERROR");

    console.log(e.toString());
}