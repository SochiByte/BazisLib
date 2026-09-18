# SochiCabinetMaker

Document:
0007_Dispatch_Descriptor_Research.md

Version:
1.0

Status:
Active

Author:
SochiCabinetMaker Project

Last Update:
2026-07-28

---

# Исследование Dispatch Method Descriptors

БАЗИС-Мебельщик 2026 Online

---

# Цель исследования

Исследовать внутреннюю структуру COM wrapper:

```
Dispatch
```

и определить:

* структуру `Dispatch`;
* структуру `Dispatch.__methods`;
* состав доступных COM-методов;
* структуру method descriptor;
* значения `DISPID`;
* значения `invkind`;
* значения `flags`;
* количество аргументов `argcnt`;
* наличие стандартных COM-интерфейсных методов;
* различия между несколькими COM-объектами.

---

# Источник результата

Probe:

```
DISPATCH DESCRIPTOR PROBE
```

Время выполнения:

```
2026-07-27T15:52:59.311Z
```

---

# 1. Общая структура Dispatch

Для всех исследованных COM-объектов получен:

```
typeof: function

constructor: Dispatch
```

Количество собственных свойств:

```
5
```

Собственные свойства:

```text id="2v5m8p"
__vars
__methods
__type
__value
__id
```

---

# 2. Dispatch.__methods

Для всех исследованных объектов:

```
typeof: object

constructor: Object
```

`__methods` содержит набор доступных методов и
свойств COM-объекта.

Каждый обнаруженный метод представлен отдельным
descriptor.

---

# 3. Структура Method Descriptor

Для каждого исследованного descriptor обнаружены
одинаковые собственные свойства:

```text id="q8c4nw"
name
dispid
invkind
flags
argcnt
```

---

# 4. Значение descriptor.name

Поле:

```
name
```

содержит имя COM-метода.

Примеры:

```
BuildPath
CreateTextFile
FolderExists
Run
Exec
open
send
loadXML
save
```

---

# 5. Значение descriptor.dispid

Поле:

```
dispid
```

содержит числовой идентификатор COM-члена.

В ходе исследования получены различные значения
DISPID, включая:

```
1
2
5
30
63
64
1000
1006
1101
3012
3013
10017
1610743810
1610743811
1610809345
```

---

# 6. Значение descriptor.invkind

В исследованном наборе обнаружены значения:

```
1
4
```

Большинство проверенных методов имеют:

```
invkind: 1
```

Исключение в текущем наборе:

```
WScript.Shell.CurrentDirectory
```

для которого:

```
invkind: 4
```

---

# 7. Значение descriptor.flags

Для всех исследованных descriptors:

```
flags: 0
```

Это относится только к полученному набору
исследованных методов.

---

# 8. Значение descriptor.argcnt

Поле:

```
argcnt
```

содержит количество аргументов, связанное
с descriptor.

Обнаруженные значения:

```
1
2
3
4
5
```

---

# 9. Scripting.FileSystemObject

Объект:

```
Scripting.FileSystemObject
```

Runtime:

```
typeof: function
```

Wrapper:

```
Dispatch
```

Количество элементов в `__methods`:

```
34
```

---

## Список __methods

```text id="e6xq2z"
QueryInterface
AddRef
Release
GetTypeInfoCount
GetTypeInfo
GetIDsOfNames
Invoke
Drives
BuildPath
GetDriveName
GetParentFolderName
GetFileName
GetBaseName
GetExtensionName
GetAbsolutePathName
GetTempName
DriveExists
FileExists
FolderExists
GetDrive
GetFile
GetFolder
GetSpecialFolder
DeleteFile
DeleteFolder
MoveFile
MoveFolder
CopyFile
CopyFolder
CreateFolder
CreateTextFile
OpenTextFile
GetStandardStream
GetFileVersion
```

---

## Проверенные descriptors

### BuildPath

```text id="1op3w7"
name:    BuildPath
dispid:  10000
invkind: 1
flags:   0
argcnt:  2
```

### CreateTextFile

```text id="q1r8k4"
name:    CreateTextFile
dispid:  1101
invkind: 1
flags:   0
argcnt:  3
```

### FolderExists

```text id="m5x9c2"
name:    FolderExists
dispid:  10017
invkind: 1
flags:   0
argcnt:  1
```

---

# 10. WScript.Shell

Объект:

```
WScript.Shell
```

Runtime:

```
typeof: function
```

Wrapper:

```
Dispatch
```

Количество элементов в `__methods`:

```
21
```

---

## Список __methods

```text id="h4w7n1"
QueryInterface
AddRef
Release
GetTypeInfoCount
GetTypeInfo
GetIDsOfNames
Invoke
SpecialFolders
Environment
Run
Popup
CreateShortcut
ExpandEnvironmentStrings
RegRead
RegWrite
RegDelete
LogEvent
AppActivate
SendKeys
Exec
CurrentDirectory
```

---

## Проверенные descriptors

### CurrentDirectory

```text id="f2k6p9"
name:    CurrentDirectory
dispid:  3013
invkind: 4
flags:   0
argcnt:  1
```

### ExpandEnvironmentStrings

```text id="v8s3m5"
name:    ExpandEnvironmentStrings
dispid:  1006
invkind: 1
flags:   0
argcnt:  1
```

### Exec

```text id="d7q2x4"
name:    Exec
dispid:  3012
invkind: 1
flags:   0
argcnt:  1
```

### Run

```text id="r9m4k8"
name:    Run
dispid:  1000
invkind: 1
flags:   0
argcnt:  3
```

---

# 11. Shell.Application

Объект:

```
Shell.Application
```

Runtime:

```
typeof: function
```

Wrapper:

```
Dispatch
```

Количество элементов в `__methods`:

```
46
```

---

## Проверенные descriptors

### ShellExecute

```text id="w3c7n2"
name:    ShellExecute
dispid:  1610809345
invkind: 1
flags:   0
argcnt:  5
```

### NameSpace

```text id="k6p1v9"
name:    NameSpace
dispid:  1610743810
invkind: 1
flags:   0
argcnt:  1
```

### BrowseForFolder

```text id="t4m8q3"
name:    BrowseForFolder
dispid:  1610743811
invkind: 1
flags:   0
argcnt:  4
```

---

# 12. MSXML2.XMLHTTP

Объект:

```
MSXML2.XMLHTTP
```

Runtime:

```
typeof: function
```

Wrapper:

```
Dispatch
```

Количество элементов в `__methods`:

```
27
```

---

## Список __methods

```text id="z5r2k7"
QueryInterface
AddRef
Release
GetTypeInfoCount
GetTypeInfo
GetIDsOfNames
Invoke
open
setRequestHeader
getResponseHeader
getAllResponseHeaders
send
abort
status
statusText
responseXML
responseText
responseBody
responseStream
readyState
onreadystatechange
setTimeouts
waitForResponse
getOption
setOption
setProxy
setProxyCredentials
```

---

## Проверенные descriptors

### open

```text id="b7n4x1"
name:    open
dispid:  1
invkind: 1
flags:   0
argcnt:  5
```

### send

```text id="p3k8v6"
name:    send
dispid:  5
invkind: 1
flags:   0
argcnt:  1
```

### setRequestHeader

```text id="c9m2w5"
name:    setRequestHeader
dispid:  2
invkind: 1
flags:   0
argcnt:  2
```

---

# 13. MSXML2.DOMDocument.6.0

Объект:

```
MSXML2.DOMDocument.6.0
```

Runtime:

```
typeof: function
```

Wrapper:

```
Dispatch
```

Количество элементов в `__methods`:

```
74
```

---

## Список __methods

```text id="n8q4y2"
QueryInterface
AddRef
Release
GetTypeInfoCount
GetTypeInfo
GetIDsOfNames
Invoke
nodeName
nodeValue
nodeType
parentNode
childNodes
firstChild
lastChild
previousSibling
nextSibling
attributes
insertBefore
replaceChild
removeChild
appendChild
hasChildNodes
ownerDocument
cloneNode
nodeTypeString
text
specified
definition
nodeTypedValue
dataType
xml
transformNode
selectNodes
selectSingleNode
parsed
namespaceURI
prefix
baseName
transformNodeToObject
doctype
implementation
documentElement
createElement
createDocumentFragment
createTextNode
createComment
createCDATASection
createProcessingInstruction
createAttribute
createEntityReference
getElementsByTagName
createNode
nodeFromID
load
readyState
parseError
url
async
abort
loadXML
save
validateOnParse
resolveExternals
preserveWhiteSpace
onreadystatechange
ondataavailable
ontransformnode
namespaces
schemas
validate
setProperty
getProperty
validateNode
importNode
```

---

## Проверенные descriptors

### loadXML

```text id="e2w7k5"
name:    loadXML
dispid:  63
invkind: 1
flags:   0
argcnt:  1
```

### save

```text id="r4n9p2"
name:    save
dispid:  64
invkind: 1
flags:   0
argcnt:  1
```

### selectSingleNode

```text id="m6q3x8"
name:    selectSingleNode
dispid:  30
invkind: 1
flags:   0
argcnt:  1
```

---

# 14. Сводная таблица проверенных descriptors

| COM Object                 | Method                   |     DISPID | invkind | flags | argcnt |
| -------------------------- | ------------------------ | ---------: | ------: | ----: | -----: |
| Scripting.FileSystemObject | BuildPath                |      10000 |       1 |     0 |      2 |
| Scripting.FileSystemObject | CreateTextFile           |       1101 |       1 |     0 |      3 |
| Scripting.FileSystemObject | FolderExists             |      10017 |       1 |     0 |      1 |
| WScript.Shell              | CurrentDirectory         |       3013 |       4 |     0 |      1 |
| WScript.Shell              | ExpandEnvironmentStrings |       1006 |       1 |     0 |      1 |
| WScript.Shell              | Exec                     |       3012 |       1 |     0 |      1 |
| WScript.Shell              | Run                      |       1000 |       1 |     0 |      3 |
| Shell.Application          | ShellExecute             | 1610809345 |       1 |     0 |      5 |
| Shell.Application          | NameSpace                | 1610743810 |       1 |     0 |      1 |
| Shell.Application          | BrowseForFolder          | 1610743811 |       1 |     0 |      4 |
| MSXML2.XMLHTTP             | open                     |          1 |       1 |     0 |      5 |
| MSXML2.XMLHTTP             | send                     |          5 |       1 |     0 |      1 |
| MSXML2.XMLHTTP             | setRequestHeader         |          2 |       1 |     0 |      2 |
| MSXML2.DOMDocument.6.0     | loadXML                  |         63 |       1 |     0 |      1 |
| MSXML2.DOMDocument.6.0     | save                     |         64 |       1 |     0 |      1 |
| MSXML2.DOMDocument.6.0     | selectSingleNode         |         30 |       1 |     0 |      1 |

---

# 15. COM Interface Methods

Во всех пяти исследованных объектах присутствуют
следующие имена:

```text id="y1v6k4"
QueryInterface
AddRef
Release
GetTypeInfoCount
GetTypeInfo
GetIDsOfNames
Invoke
```

Это является важным результатом исследования.

Наличие этих методов в `Dispatch.__methods` подтверждено
не для одного, а для нескольких различных COM-объектов.

---

# 16. Значение обнаруженного Invoke

В каждом исследованном объекте обнаружен метод:

```
Invoke
```

Одновременно в descriptor присутствует:

```
dispid
```

Однако на данном этапе это подтверждает только
наличие соответствующих COM-членов в представлении
`Dispatch`.

Пока НЕ установлено, что внутренний JavaScript bridge
непосредственно вызывает именно этот `Invoke`.

---

# 17. Подтверждённые факты

На основании `DISPATCH DESCRIPTOR PROBE` подтверждено:

```text id="s7q2m9"
[VERIFIED]

Все исследованные COM-объекты представлены
как Dispatch.

[VERIFIED]

Dispatch имеет пять собственных свойств.

[VERIFIED]

Dispatch.__methods является объектом.

[VERIFIED]

__methods содержит реальные COM-члены.

[VERIFIED]

Для исследованных COM-методов существует descriptor.

[VERIFIED]

Descriptor имеет одинаковую структуру:
name, dispid, invkind, flags, argcnt.

[VERIFIED]

Для исследованных методов получены реальные DISPID.

[VERIFIED]

В исследованном наборе обнаружены invkind 1 и 4.

[VERIFIED]

Для всех проверенных descriptors flags равен 0.

[VERIFIED]

В исследованном наборе argcnt принимает значения
от 1 до 5.

[VERIFIED]

Все пять исследованных COM-объектов содержат
QueryInterface, AddRef, Release, GetTypeInfoCount,
GetTypeInfo, GetIDsOfNames и Invoke.
```

---

# 18. Что пока НЕ установлено

Не установлены:

* назначение всех полей descriptor;
* точная семантика `invkind`;
* точная семантика `flags`;
* связь `argcnt` с реальным количеством передаваемых
  JavaScript аргументов;
* механизм создания descriptor;
* механизм получения DISPID;
* native-функция, использующая descriptor;
* native call chain от JavaScript до COM;
* реальный механизм вызова `Invoke`;
* обработка возвращаемых значений;
* обработка COM exceptions;
* механизм освобождения wrapper.

---

# 19. Следующий этап

Следующее исследование должно перейти от структуры
descriptor к механизму его использования.

Приоритет:

1. Найти native-код, работающий с:

   ```
   __methods
   ```

2. Найти обращения к:

   ```
   dispid
   ```

3. Найти код, обрабатывающий:

   ```
   invkind
   flags
   argcnt
   ```

4. Найти функцию, которая получает descriptor
   при вызове JavaScript-метода.

5. Определить native call chain.

6. Проверить, вызывается ли:

   ```
   IDispatch::Invoke
   ```

7. Сопоставить найденный native-код
   с `ScriptEditor.dll`.

---

# Статус исследования

ACTIVE RESEARCH

---

# Источник

Runtime Probe:

```
DISPATCH DESCRIPTOR PROBE
```

Дата результата:

```
2026-07-27
```

---

# Связанные документы

```text id="k3m7x1"
0001_Bazis_Research_Map.md
0002_Runtime_Research.md
0003_External_Automation_Research.md
0004_ScriptEditor_DLL_Analysis.md
0005_COM_Dispatch_Research.md
0006_Installation_Structure_Research.md
```
