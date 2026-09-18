var out = "";

function log(s){
    out += s + "\n";
}


try {

    var item = Model.Objects.Objects[0];

    log("=== OBJECT[0] PROBE ===");

    log("type: " + typeof item);

    try {
        log("constructor: " + item.constructor);
    }
    catch(e){
        log("constructor ERROR: " + e);
    }


    try {
        log("ClassName: " + item.ClassName);
    }
    catch(e){
        log("ClassName ERROR: " + e);
    }


    try {
        log("ID: " + item.ID);
    }
    catch(e){
        log("ID ERROR: " + e);
    }


    try {
        log("Name: " + item.Name);
    }
    catch(e){
        log("Name ERROR: " + e);
    }


}
catch(e){
    log("GLOBAL ERROR: " + e);
}


try {

    var f = new File(
"C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\t3dobjectlist_object0_probe.txt"
    );

    f.Write(out);
    f.Close();

}
catch(e){
    alert(out);
}