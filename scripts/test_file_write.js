var text = "TEST BAZIS 2026 FILE WRITE\n";

try {

    var path =
    "C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\test_write.txt";

    var f = new File(path, "w");

    text += "File object created\n";

    f.Write(text);

    text += "Write OK\n";

    f.Close();

}
catch(e) {

    text += "ERROR: " + e + "\n";
}


try {

    var path2 =
    "C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\test_write_log.txt";

    var f2 = new File(path2, "w");

    f2.Write(text);

    f2.Close();

}
catch(e) {

}