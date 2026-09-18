/*
============================================================

SochiCabinetMaker

Probe:

    0014_logger_class_test.js


Purpose:

    Проверка класса SCMLogger

============================================================
*/


try
{

    var Logger =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\scm_logger.js"
        );


    console.log("LOGGER CLASS LOAD SUCCESS");


    var log =
        new Logger(
            "TEST_LOG"
        );


    log.write("Line 1");

    log.write("Line 2");


    console.log(
        "Logger name: " + log.name
    );


    console.log(
        "Lines count: " + log.getCount()
    );


}
catch(e)
{

    console.log("LOGGER TEST ERROR");

    console.log(e.toString());

}