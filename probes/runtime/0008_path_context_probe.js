/*
============================================================

SochiCabinetMaker

Probe:
    0008_path_context_probe.js

Purpose:
    Исследование текущего контекста Runtime

============================================================
*/


console.log("PATH CONTEXT START");


console.log("__filename:");
console.log(typeof __filename);


console.log("__dirname:");
console.log(typeof __dirname);


console.log("process.cwd:");
console.log(process.cwd());


console.log("PATH CONTEXT END");