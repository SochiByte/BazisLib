var out = "";

function log(s) {
    out += s + "\n";
}

log("=== T3DObjectList ACCESS PROBE ===");

try {

    log("typeof Model: " + typeof Model);

    if (typeof Model !== "undefined") {

        log("Model typeof: " + typeof Model);

        try {
            log("Model.Objects typeof: " + typeof Model.Objects);
        }
        catch(e) {
            log("Model.Objects ERROR: " + e);
        }


        try {
            var list = Model.Objects;

            log("list assigned");

            try {
                log("list.Count = " + list.Count);
            }
            catch(e) {
                log("Count ERROR: " + e);
            }


            try {
                log("typeof list.Objects = " + typeof list.Objects);
            }
            catch(e) {
                log("list.Objects ERROR: " + e);
            }


            try {
                log("typeof list.Objects[0] = " + typeof list.Objects[0]);
            }
            catch(e) {
                log("Objects[0] ERROR: " + e);
            }


            try {
                var obj = list.Objects[0];

                if (obj) {
                    log("Object 0 exists");

                    try {
                        log("Object 0 typeof: " + typeof obj);
                    }
                    catch(e) {}

                }
                else {
                    log("Object 0 = NULL");
                }

            }
            catch(e) {
                log("Object read ERROR: " + e);
            }

        }
        catch(e) {
            log("LIST ERROR: " + e);
        }
    }

}
catch(e) {
    log("GLOBAL ERROR: " + e);
}


try {

    var f = new File(
        "C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output\\t3dobjectlist_access_probe.txt",
        "w"
    );

    f.Write(out);
    f.Close();

}
catch(e) {

}