/*
============================================================

SochiCabinetMaker

Probe:
    0005_directory_create_test.js

Purpose:
    Проверка создания каталогов через Runtime

============================================================
*/


var fs = require("fs");


var path =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\test_directory";


try
{
    fs.mkdirSync(path);

    console.log("DIRECTORY CREATE SUCCESS");
}
catch(e)
{
    console.log("DIRECTORY CREATE ERROR");
    console.log(e.toString());
}