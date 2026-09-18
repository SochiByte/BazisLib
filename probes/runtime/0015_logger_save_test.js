/*
============================================================

SochiCabinetMaker

Probe:

    0015_logger_save_test.js


Purpose:

    Подготовка теста сохранения SCMLogger


============================================================
*/


try
{

    var Logger =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\scm_logger.js"
        );


    console.log("LOGGER SAVE TEST START");


    var log =
        new Logger(
            "SAVE_TEST"
        );


    log.write("First test line");

    log.write("Second test line");


    console.log(
        "Logger name: " + log.name
    );


    console.log(
        "Lines count: " + log.getCount()
    );


    console.log(
        "Line 1: " + log.lines[0]
    );


    console.log(
        "Line 2: " + log.lines[1]
    );


    console.log("LOGGER SAVE TEST END");


}
catch(e)
{

    console.log("LOGGER SAVE TEST ERROR");

    console.log(e.toString());

}