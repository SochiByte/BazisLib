/*
============================================================

SochiCabinetMaker

Probe:
    0001_runtime_environment_probe.js

Purpose:
    Исследование среды выполнения БАЗИС-Мебельщик 2026 Online

Description:
    Проверка доступных возможностей JavaScript Runtime.

============================================================
*/


var result = "";

function writeLine(text)
{
    result += text + "\n";
}


//------------------------------------------------------------
// Заголовок
//------------------------------------------------------------

writeLine("============================================================");
writeLine("SochiCabinetMaker Runtime Probe");
writeLine("0001_runtime_environment_probe");
writeLine("============================================================");


//------------------------------------------------------------
// Проверка process
//------------------------------------------------------------

writeLine("");
writeLine("[PROCESS]");


try
{
    writeLine("typeof process: " + typeof process);

    if (typeof process !== "undefined")
    {
        writeLine("Node version: " + process.version);

        if (process.versions)
        {
            writeLine("V8 version: " + process.versions.v8);
        }
    }
}
catch(e)
{
    writeLine("process error: " + e);
}


//------------------------------------------------------------
// Глобальные объекты
//------------------------------------------------------------

writeLine("");
writeLine("[GLOBAL OBJECTS]");


try
{
    var names = Object.getOwnPropertyNames(this);

    writeLine("Count: " + names.length);

    for(var i = 0; i < names.length; i++)
    {
        writeLine(names[i]);
    }

}
catch(e)
{
    writeLine("Global scan error: " + e);
}


//------------------------------------------------------------
// Стандартные объекты
//------------------------------------------------------------

writeLine("");
writeLine("[STANDARD OBJECTS]");


var objects =
[
    "Object",
    "Array",
    "String",
    "Number",
    "Boolean",
    "Date",
    "JSON",
    "Math",
    "RegExp",
    "Function"
];


for(var i = 0; i < objects.length; i++)
{
    var name = objects[i];

    try
    {
        writeLine(
            name +
            " : " +
            typeof this[name]
        );
    }
    catch(e)
    {
        writeLine(
            name +
            " : ERROR"
        );
    }
}


//------------------------------------------------------------
// Завершение
//------------------------------------------------------------

writeLine("");
writeLine("============================================================");
writeLine("END");
writeLine("============================================================");


// Вывод
result;