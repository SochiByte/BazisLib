/*
============================================================

SochiCabinetMaker

Probe:
    0004_file_write_test.js

Purpose:
    Проверка записи файла через fs

============================================================
*/


var fs = require("fs");


var filename =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\runtime_write_test.txt";


var text =
"SochiCabinetMaker file write test";


fs.writeFileSync(filename, text);


console.log("FILE WRITE SUCCESS");