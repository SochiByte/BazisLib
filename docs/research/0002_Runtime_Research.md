# SochiCabinetMaker

Document:
0002_Runtime_Research.md

Version:
2.0

Status:
Active

Author:
SochiCabinetMaker Project

Last Update:
2026-07-28

---

# Название исследования

Исследование Runtime
БАЗИС-Мебельщик 2026 Online

---

# Цель исследования

Определить:

* среду выполнения встроенных скриптов;
* JavaScript engine и его версию;
* доступные глобальные объекты;
* внутренние объекты Базис;
* native-типы, доступные через Runtime;
* системные возможности Runtime;
* механизм взаимодействия JavaScript с native-кодом;
* механизм взаимодействия с COM Automation;
* ограничения Runtime;
* возможные точки внешней автоматизации.

---

# Объект исследования

Среда выполнения встроенных скриптов
БАЗИС-Мебельщик 2026 Online.

---

# 1. Runtime Engine

## 1.1 JavaScript Runtime

[VERIFIED]

В ходе исследования установлено использование JavaScript Runtime на базе:

```
Node.js 22.14.0
```

Это относится к текущему исследованию БАЗИС-Мебельщик 2026 Online.

---

## 1.2 Старые результаты Runtime

В предыдущих исследованиях встречался:

```
Node.js 8.11.3
V8 6.2.414.54
```

Эти данные относятся к старому окружению и НЕ должны использоваться
как характеристика Runtime БАЗИС-Мебельщик 2026.

Статус:

```
ARCHIVED / NOT APPLICABLE TO CURRENT RUNTIME
```

---

# 2. Global Objects

В Runtime были обнаружены или исследовались следующие объекты:

```
Action
Model
Application
Editor
Document
Panel
Contour
Object
Selection
Undo
File
System
Script
Bazis
Kernel
```

Статус наличия конкретного объекта должен рассматриваться
отдельно от статуса его методов и свойств.

Наличие объекта НЕ означает автоматически наличие
полного рабочего API этого объекта.

---

# 3. Model

## 3.1 Наличие Model

[VERIFIED]

Объект:

```
Model
```

доступен в Runtime.

`Model` является одним из основных объектов текущего
исследования объектной модели Базис.

---

# 4. Model.Objects

## 4.1 Наличие

[VERIFIED]

Объект:

```
Model.Objects
```

существует.

Runtime сообщил:

```
typeof: object
```

---

## 4.2 Обнаруженные свойства

При исследовании `Model.Objects` были обнаружены:

```
Count
Length
Current
Item
```

В исследованном Runtime они определялись как:

```
Count  : string
Length : string
Current: string
Item   : string
```

---

## 4.3 Попытки перечисления

Проверялись следующие методы:

```
MoveNext
Reset
GetEnumerator
Enumerate
forEach
```

Результат:

```
MoveNext      -> Invalid class typecast
Reset         -> Invalid class typecast
GetEnumerator -> Invalid class typecast
Enumerate     -> Invalid class typecast
forEach       -> Invalid class typecast
```

---

## 4.4 Вывод

[VERIFIED]

`Model.Objects` нельзя считать обычной JavaScript-коллекцией
с подтверждённой поддержкой стандартного JavaScript API
перечисления.

Необходимо дополнительно установить:

* реальный native-тип;
* механизм доступа к элементам;
* предназначение `Current`;
* предназначение `Item`;
* корректный способ получения элементов;
* причину `Invalid class typecast`.

---

# 5. Model.GetObjectsList()

## 5.1 Результат

[VERIFIED]

Проверялся вызов:

```
Model.GetObjectsList()
```

В исследованном состоянии был получен результат:

```
LIST IS NULL
```

---

## 5.2 Текущий вывод

Факт вызова метода зафиксирован.

Рабочий способ получения списка объектов через
`Model.GetObjectsList()` пока не установлен.

Необходимо проверить:

* состояние модели;
* наличие объектов;
* тип возвращаемого значения;
* условия, при которых список создаётся;
* native-реализацию метода.

---

# 6. Model.Children()

Проверялся вызов:

```
Model.Children()
```

В исследованном случае результат:

```
typeof: undefined
```

---

## Вывод

[VERIFIED]

Рабочее использование `Model.Children()` в текущем
исследовании не подтверждено.

Наличие предполагаемого имени метода нельзя считать
доказательством существования рабочего JS API.

---

# 7. Model.Enumerate() / Model.GetEnumerator()

Проверялись:

```
Model.Enumerate()
Model.GetEnumerator()
```

В ходе экспериментов получались:

```
undefined
```

и/или ошибки:

```
Invalid class typecast
```

---

## Вывод

[VERIFIED]

Рабочий JavaScript-механизм перечисления объектов модели
через эти вызовы не установлен.

---

# 8. Native Types

В Runtime были обнаружены или исследовались следующие
native-типы:

```
TFurnPanel
TFurnAsm
TFastener
TExtrusionBody
TObject3D
T3DObjectList
```

---

# 9. TObject3D

[VERIFIED]

Тип:

```
TObject3D
```

подтверждён в исследовании Runtime.

`TObject3D` относится к объектам 3D-модели и является
одним из направлений дальнейшего исследования.

---

# 10. T3DObjectList

[VERIFIED]

Тип:

```
T3DObjectList
```

подтверждён в Runtime.

При исследовании был обнаружен метод:

```
forEach
```

---

## Вывод

`T3DObjectList` является перспективным объектом
для исследования рабочего механизма перечисления
3D-объектов.

Важно:

```
Model.Objects
T3DObjectList
```

не следует считать одинаковыми коллекциями.

Поведение одного объекта не переносится автоматически
на другой.

---

# 11. COM Automation

## 11.1 NewCOMObject()

[VERIFIED]

В Runtime обнаружен механизм:

```
NewCOMObject()
```

Он позволяет обращаться к Windows COM Automation.

---

## 11.2 Исследованные COM-объекты

В ходе экспериментов исследовались:

```
Scripting.FileSystemObject
WScript.Shell
Shell.Application
MSXML2.XMLHTTP
MSXML2.DOMDocument.6.0
```

---

# 12. Dispatch

## 12.1 Runtime Wrapper

[VERIFIED]

Полученные COM-объекты представлены внутри Runtime
специальной обёрткой:

```
Dispatch
```

---

## 12.2 Внутренние свойства Dispatch

При исследовании обнаружены:

```
__vars
__methods
__type
__value
__id
```

---

# 13. Dispatch.__methods

[VERIFIED]

В:

```
Dispatch.__methods
```

обнаружены descriptors методов.

Зафиксированные поля:

```
name
dispid
invkind
flags
argcnt
```

---

# 14. DISPID

[VERIFIED]

В ходе исследования получены реальные значения DISPID
для отдельных COM-методов:

```
Scripting.FileSystemObject.BuildPath -> 10000

WScript.Shell.Run                    -> 1000

MSXML2.XMLHTTP.open                  -> 1
```

---

# 15. Предварительная модель COM-взаимодействия

На основании Runtime-исследования зафиксирована
следующая рабочая модель:

```
JavaScript
    |
    v
Dispatch
    |
    v
method descriptor
    |
    v
DISPID
    |
    v
native invocation
    |
    v
COM object
```

---

## Важное ограничение

Наличие:

```
Dispatch
__methods
DISPID
```

подтверждено.

Однако конкретная native-реализация вызова пока
не установлена.

В частности, пока нельзя утверждать как VERIFIED,
что цепочка обязательно проходит непосредственно
через:

```
IDispatch::Invoke
```

---

# 16. System Access

## 16.1 Файловая система

[VERIFIED]

Через COM Automation исследован:

```
Scripting.FileSystemObject
```

Это подтверждает возможность использования
Windows COM для работы с файловой системой.

Не следует автоматически считать это специальным
внутренним файловым API Базис.

---

## 16.2 Процессы

[VERIFIED]

Через COM Automation исследован:

```
WScript.Shell
```

В частности, исследовался метод:

```
Run
```

---

## 16.3 Windows API

[HYPOTHESIS / ACTIVE]

Прямой доступ JavaScript Runtime к произвольному
Windows API пока не подтверждён.

Наличие COM Automation не означает автоматически
наличие прямого вызова WinAPI.

---

## 16.4 Внешние библиотеки

[ACTIVE]

Исследуется возможность обращения Runtime
к native DLL и другим внешним компонентам.

Это направление связано с reverse engineering:

```
ScriptEditor.dll
```

---

# 17. Ограничения Runtime

В ходе исследования зафиксированы следующие
характерные результаты:

```
undefined

NULL

LIST IS NULL

Invalid class typecast
```

---

## Значение ошибок

Эти результаты считаются частью исследования.

Они могут указывать на:

* native wrapper;
* несовместимость JavaScript-типа;
* специальный механизм коллекций;
* ограничения bridge;
* неправильный способ вызова;
* особую native-реализацию объекта.

---

# 18. JavaScript ↔ Native Bridge

[ACTIVE RESEARCH]

Одно из главных направлений текущего исследования:

```
JavaScript
    |
    v
Runtime wrapper
    |
    v
Native implementation
```

---

# 19. ScriptEditor.dll

Ключевой объект reverse engineering:

```
ScriptEditor.dll
```

Используемый инструмент:

```
Ghidra 12.1.2_PUBLIC_20260605
```

---

## Основные задачи

Необходимо установить:

* реализацию `Dispatch`;
* механизм создания descriptors;
* обработку `DISPID`;
* механизм native invocation;
* связь с `IDispatch::Invoke`;
* связь JavaScript Runtime с native-кодом;
* наличие дополнительных native API Базис.

---

# 20. Основные установленные факты

На текущем этапе подтверждены:

```
[VERIFIED] JavaScript Runtime присутствует.

[VERIFIED] Используется Node.js 22.14.0.

[VERIFIED] Model доступен.

[VERIFIED] Model.Objects доступен.

[VERIFIED] Model.Objects не показал
          стандартное JS-перечисление.

[VERIFIED] Model.GetObjectsList() исследован;
          в исследованном состоянии LIST IS NULL.

[VERIFIED] Model.Children() исследован;
          получен undefined.

[VERIFIED] TObject3D обнаружен.

[VERIFIED] T3DObjectList обнаружен.

[VERIFIED] T3DObjectList содержит forEach.

[VERIFIED] NewCOMObject() доступен.

[VERIFIED] COM Automation работает.

[VERIFIED] Dispatch wrapper обнаружен.

[VERIFIED] Dispatch.__methods обнаружен.

[VERIFIED] Method descriptors обнаружены.

[VERIFIED] DISPID обнаружен в descriptors.
```

---

# 21. Нерешённые вопросы

Необходимо установить:

* полный список глобальных объектов;
* полный список свойств и методов Model;
* полный native-тип Model.Objects;
* способ перечисления Model.Objects;
* назначение Current и Item;
* причину Invalid class typecast;
* способ получения рабочего T3DObjectList;
* полную структуру Dispatch;
* механизм native invocation;
* связь с IDispatch::Invoke;
* возможность доступа к native API Базис;
* возможность загрузки внешних DLL;
* возможность внешнего управления Базисом.

---

# 22. Следующие исследования

Приоритетный порядок:

```
1. ScriptEditor.dll
2. Dispatch
3. native invocation
4. JavaScript ↔ native bridge
5. Model native type
6. T3DObjectList
7. Model object enumeration
8. внешний API
```

---

# 23. Источники результатов

Результаты должны подтверждаться одним или несколькими
источниками:

```
Runtime Probe
Output file
Official documentation
Ghidra
Native code
Repeated experiment
```

---

# 24. Связанные документы

```
0001_Bazis_Research_Map.md

0003_API_Findings.md

0004_COM_Dispatch_Research.md

0005_ScriptEditor_DLL_Research.md
```

---

# Статус исследования

ACTIVE RESEARCH

---

Last Update:

2026-07-28
