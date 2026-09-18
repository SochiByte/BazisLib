/*
============================================================

SochiCabinetMaker

Probe:

    0013_date_test.js


Purpose:

    Проверка объекта Date в Runtime БАЗИС 2026 Online

============================================================
*/


try
{

    var now = new Date();


    console.log("DATE TEST SUCCESS");


    console.log(
        now.toString()
    );


    console.log(
        now.getFullYear()
    );


}
catch(e)
{

    console.log("DATE TEST ERROR");

    console.log(e.toString());

}