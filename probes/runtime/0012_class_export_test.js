/*
============================================================

SochiCabinetMaker

Probe:

    0012_class_export_test.js


Purpose:

    Проверка экспорта и создания объектов

============================================================
*/


try
{

    var Loader =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\scm_loader.js"
        );


    var TestClass =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\test_class.js"
        );


    console.log("CLASS LOAD SUCCESS");


    var object =
        new TestClass(
            "SCM Object"
        );


    console.log(
        object.getName()
    );


}
catch(e)
{

    console.log("CLASS TEST ERROR");

    console.log(e.toString());

}