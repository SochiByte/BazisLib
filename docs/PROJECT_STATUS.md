# Bazis2026Online — Project Status

**Проект:** Bazis2026Online
**Программа:** Базис-Мебельщик 2026 Online
**Платформа:** Windows
**Дата последнего обновления:** 2026-07-28
**Статус:** ACTIVE RESEARCH

---

## 1. Цель проекта

Исследование возможностей программного управления Базис-Мебельщик 2026 Online.

Основные направления:

* исследование встроенного JavaScript runtime;
* исследование JavaScript API Базис;
* исследование объектной модели;
* исследование native API;
* исследование COM Automation;
* reverse engineering `ScriptEditor.dll`;
* поиск внешних способов управления Базисом;
* последующая разработка средств автоматизации проектирования мебели.

---

## 2. Принцип исследования

Все результаты разделяются на три категории.

### VERIFIED

Факт непосредственно подтверждён экспериментом в Базис 2026 Online или анализом бинарного кода.

### DOCUMENTED

Факт указан в документации Базис, но ещё не подтверждён экспериментом.

### HYPOTHESIS

Предположение, требующее дополнительной проверки.

Категории не смешиваются.

---

## 3. Основные направления исследования

1. JavaScript runtime
2. Объектная модель Базис
3. `Model` и коллекции объектов
4. `TObject3D` / `T3DObjectList`
5. COM Automation
6. `Dispatch`
7. `DISPID` и method descriptors
8. `ScriptEditor.dll`
9. Native API
10. Внешние API

---

## 4. Текущие результаты

### JavaScript runtime

Зафиксировано использование JavaScript runtime на базе:

```text
Node.js 22.14.0
```

Старые результаты, относящиеся к Node.js 8.11.3, не относятся к текущему исследованию Базис 2026 и не должны использоваться как источник API Базис 2026.

---

### Объектная модель

В runtime обнаружены или исследовались:

```text
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

---

### Native types

В ходе исследования встречались:

```text
TFurnPanel
TFurnAsm
TFastener
TExtrusionBody
TObject3D
T3DObjectList
```

---

### Model

Объект `Model` существует в runtime.

Исследовались:

```text
Model.Objects
Model.Selections
Model.Children()
Model.GetObjectsList()
Model.Enumerate()
Model.GetEnumerator()
```

---

### Model.Objects

`Model.Objects` существует и имеет:

```text
typeof: object
```

При исследовании обнаружены:

```text
Count
Length
Current
Item
```

Попытки использовать стандартные операции перечисления приводили к ошибкам:

```text
MoveNext      → Invalid class typecast
Reset         → Invalid class typecast
GetEnumerator → Invalid class typecast
Enumerate     → Invalid class typecast
forEach       → Invalid class typecast
```

Следовательно, `Model.Objects` нельзя считать обычной JavaScript-коллекцией.

---

### Model.GetObjectsList()

Вызов:

```text
Model.GetObjectsList()
```

был выполнен, но в исследованном состоянии результат оказался:

```text
LIST IS NULL
```

Рабочий способ получения списка объектов через этот метод пока не установлен.

---

### Model.Children()

В исследованном случае:

```text
Model.Children()
```

вернул:

```text
typeof: undefined
```

Рабочее использование метода пока не подтверждено.

---

### TObject3D / T3DObjectList

В runtime были подтверждены нативные типы:

```text
TObject3D
T3DObjectList
```

У `T3DObjectList` был обнаружен метод:

```text
forEach
```

Это делает `T3DObjectList` одним из перспективных объектов для дальнейшего исследования перечисления 3D-объектов.

---

## 5. COM Automation

В runtime обнаружен механизм:

```text
NewCOMObject()
```

Исследовались следующие COM Automation объекты:

```text
Scripting.FileSystemObject
WScript.Shell
Shell.Application
MSXML2.XMLHTTP
MSXML2.DOMDocument.6.0
```

---

## 6. Dispatch

Полученные COM-объекты представлены внутри runtime специальной обёрткой:

```text
Dispatch
```

При исследовании были обнаружены внутренние поля:

```text
__vars
__methods
__type
__value
__id
```

Внутри:

```text
Dispatch.__methods
```

обнаружены descriptors методов.

Зафиксированы поля descriptor:

```text
name
dispid
invkind
flags
argcnt
```

---

## 7. DISPID

В ходе исследования были получены реальные значения `DISPID` для COM-методов.

Зафиксированы:

```text
Scripting.FileSystemObject.BuildPath → 10000
WScript.Shell.Run                    → 1000
MSXML2.XMLHTTP.open                  → 1
```

Это подтверждает наличие в runtime механизма работы с COM Automation через идентификаторы методов.

---

## 8. Предварительная модель Dispatch

На текущем этапе установлена следующая рабочая модель:

```text
JavaScript
    ↓
Dispatch
    ↓
method descriptor
    ↓
DISPID
    ↓
native invocation
    ↓
COM object
```

Полная реализация этой цепочки пока не установлена.

---

## 9. ScriptEditor.dll

Файл:

```text
ScriptEditor.dll
```

исследуется с помощью:

```text
Ghidra 12.1.2_PUBLIC_20260605
```

Рабочий проект Ghidra:

```text
C:\Users\SochiByte\Documents\Bazis\Bazis2026Online
```

Основные цели:

* найти реализацию `Dispatch`;
* найти обработку `__methods`;
* найти механизм обработки `DISPID`;
* найти native invocation;
* установить связь с `IDispatch::Invoke`;
* определить возможные native API;
* установить возможные способы обращения к API Базис напрямую.

---

## 10. Ключевая исследовательская цепочка

Основная цепочка, которую необходимо подтвердить на уровне native-кода:

```text
JavaScript
    ↓
Dispatch wrapper
    ↓
method descriptor
    ↓
DISPID
    ↓
Invoke / native invocation
    ↓
COM или Bazis native API
```

---

## 11. Нерешённые вопросы

На текущем этапе остаются открытыми:

* полный список native API Базис 2026;
* полный список методов `Model`;
* полный список свойств `Model`;
* рабочий способ перечисления `Model.Objects`;
* причина `Invalid class typecast`;
* способ получения рабочего `T3DObjectList`;
* полная структура `Dispatch`;
* точная реализация вызова метода `Dispatch`;
* точная связь `Dispatch` с `IDispatch::Invoke`;
* возможность прямого вызова native API Базис;
* наличие дополнительных внешних API;
* возможность управления Базисом из внешнего процесса.

---

## 12. Следующий этап

Продолжить reverse engineering:

```text
ScriptEditor.dll
        ↓
Dispatch
        ↓
method descriptor
        ↓
DISPID
        ↓
Invoke
        ↓
native implementation
```

Все новые результаты сначала проверяются, затем получают статус:

```text
VERIFIED
DOCUMENTED
HYPOTHESIS
```

и только после этого заносятся в соответствующий документ исследования.

---

## 13. Структура документации

Основная документация проекта:

```text
docs\
```

Исследовательская документация:

```text
docs\research\
```

Исходные probe-скрипты:

```text
probes\
```

Результаты выполнения probe-скриптов:

```text
output\
```

---

## 14. Статус проекта

```text
ACTIVE RESEARCH
```

Исследование продолжается.

Новые подтверждённые результаты не должны стирать или заменять ранее установленную историю исследования. Они добавляются как новые факты с указанием источника, probe-скрипта или результата reverse engineering.
