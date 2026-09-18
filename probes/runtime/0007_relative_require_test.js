/*
============================================================

SochiCabinetMaker

Probe:
    0007_relative_require_test.js

Purpose:
    Проверка относительного require()

============================================================
*/


try
{
    var testModule =
        require("../../scripts/lib/test_module.js");


    console.log("RELATIVE REQUIRE SUCCESS");

    console.log(testModule.name);
    console.log(testModule.version);

}
catch(e)
{
    console.log("RELATIVE REQUIRE ERROR");

    console.log(e.toString());
}