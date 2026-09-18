// T3DObjectList indexed access probe

var out = "";

function log(s) {
    out += s + "\n";
}

try {

    log("=== T3DObjectList INDEX PROBE ===");

    log("Model type: " + typeof Model);

    var list = Model.Objects;

    log("Model.Objects type: " + typeof list);

    if (list == null) {
        log("Model.Objects = NULL");
    }
    else {

        log("List received");

        try {
            log("Count: " + list.Count);
        }
        catch(e) {
            log("Count ERROR: " + e);
        }


        try {
            var objs = list.Objects;

            log("list.Objects type: " + typeof objs);

            if (objs != null) {

                log("IndexedProperty received");

                for (var i = 0; i < 5; i++) {

                    try {

                        var obj = objs[i];

                        if (obj == null) {
                            log("Objects[" + i + "] = NULL");
                        }
                        else {
                            log("Objects[" + i + "] type = " + typeof obj);
                        }

                    }
                    catch(e) {
                        log("Objects[" + i + "] ERROR: " + e);
                    }
                }
            }
        }
        catch(e) {
            log("Objects property ERROR: " + e);
        }
    }

}
catch(e) {
    log("GLOBAL ERROR: " + e);
}


// save result
try {

    var f = new File(
        "C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\t3dobjectlist_index_probe.txt"
    );

    f.Write(out);
    f.Close();

}
catch(e) {

    // fallback
    alert(out);
}