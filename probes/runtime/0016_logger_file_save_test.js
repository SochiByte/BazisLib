/*
============================================================

SochiCabinetMaker

Probe:

    0016_logger_file_save_test.js


Purpose:

    Проверка сохранения SCMLogger в файл


============================================================
*/


try
{

    var Logger =
        require(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\scripts\\lib\\scm_logger.js"
        );


    console.log("LOGGER FILE SAVE START");


    var log =
        new Logger(
            "FILE_SAVE_TEST"
        );


    log.write("First saved line");

    log.write("Second saved line");


    var filename =
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\logger_test.txt";


    log.save(filename);


    console.log("FILE SAVE SUCCESS");


    console.log(filename);


}
catch(e)
{

    console.log("FILE SAVE ERROR");

    console.log(e.toString());

}