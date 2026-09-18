/*
============================================================

SochiCabinetMaker

Probe:
    0003_file_write_discovery_probe.js

Purpose:
    Поиск способов записи файлов в Runtime БАЗИС 2026 Online

============================================================
*/


function log(text)
{
    console.log(text);
}


log("FILE WRITE DISCOVERY START");


log("typeof require = " + typeof require);
log("typeof process = " + typeof process);
log("typeof fs = " + typeof fs);
log("typeof File = " + typeof File);
log("typeof System = " + typeof System);
log("typeof ActiveXObject = " + typeof ActiveXObject);


log("FILE WRITE DISCOVERY END");