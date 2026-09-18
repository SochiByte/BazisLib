# SochiCabinetMaker

Document:
0001_Bazis_Research_Map.md

Version:
2.0

Status:
Active

Author:
SochiCabinetMaker Project

Last Update:
2026-07-28

---

# Цель исследования

Получить полную карту всех способов автоматизации
БАЗИС-Мебельщик 2026 Online.

Исследование должно определить:

* какие официальные API доступны;
* какие JavaScript API реально работают;
* какие внутренние объекты доступны из runtime;
* какие native-механизмы используются;
* какие COM/OLE механизмы доступны;
* существует ли внешний API;
* существует ли возможность управления Базисом
  из внешнего процесса;
* какие дополнительные способы автоматизации
  могут быть обнаружены при reverse engineering.

Конечный результат:

документированная карта всех подтверждённых,
документированных и предполагаемых механизмов
автоматизации Базис 2026.

---

# Статусы

Используются три статуса:

[VERIFIED]
Подтверждено экспериментом или reverse engineering.

[DOCUMENTED]
Указано в документации, но ещё не подтверждено
экспериментально.

[HYPOTHESIS]
Предположение, требующее проверки.

---

# Карта исследования

## 1. Среда выполнения (Runtime)

[VERIFIED]

Исследуется JavaScript runtime Базис 2026.

Зафиксирована версия:

```
Node.js 22.14.0
```

Отдельно:

Результаты, полученные ранее для Node.js 8.11.3,
не относятся к текущему runtime Базис 2026.

Статус:

[VERIFIED] Runtime исследуется.

---

## 2. JavaScript Runtime

[VERIFIED]

Исследуется встроенный JavaScript runtime.

Установлено наличие объектной модели Базис.

Исследовались:

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

Дополнительно исследуются native-типы:

```
TFurnPanel
TFurnAsm
TFastener
TExtrusionBody
TObject3D
T3DObjectList
```

Статус:

[VERIFIED] Runtime доступен для исследования.

---

## 3. Документированный API

[DOCUMENTED]

В документации обнаружены модули и функции.

### materialData

```
SetupActiveMaterial
SetupActiveButtMaterial
ChooseActiveFurnMaterial
```

### geometry3d

```
VectorMake
VectorAdd
VectorSub
VectorMul
VectorsAreColinear
```

### objectData

```
GetObjectUserProperties
GetAdditionalMaterials
```

### modelIOOperations

```
SaveModelToFile
LoadModelFromFile
```

Примечание:

LoadModelFromFile загружает новую модель,
при этом текущая модель уничтожается.

### currentFileData

```
model
article
filename
```

### arrangePositions

```
NewArranger
```

Статус:

[DOCUMENTED] API обнаружен в документации.

[ ] Требуется систематическая runtime-проверка
всех документированных функций.

---

## 4. Недокументированные возможности

[ACTIVE]

Исследуются:

* реальные runtime-типы;
* скрытые свойства;
* методы объектов;
* native wrappers;
* внутренние descriptors;
* механизмы вызова методов;
* недокументированные коллекции;
* native API.

Особое внимание:

```
Model
Model.Objects
T3DObjectList
Dispatch
```

Статус:

[ACTIVE]

---

## 5. Внутренние объекты

[ACTIVE]

Основные объекты исследования:

```
Model
Application
Editor
Document
Selection
Object
TObject3D
T3DObjectList
```

### Model.Objects

[VERIFIED]

Объект существует.

Runtime:

```
typeof: object
```

Обнаруженные свойства:

```
Count
Length
Current
Item
```

Попытки использовать стандартные операции
перечисления дали:

```
MoveNext      -> Invalid class typecast
Reset         -> Invalid class typecast
GetEnumerator -> Invalid class typecast
Enumerate     -> Invalid class typecast
forEach       -> Invalid class typecast
```

Вывод:

Model.Objects нельзя считать обычной
JavaScript-коллекцией без дополнительного
исследования.

### Model.GetObjectsList()

[VERIFIED]

Метод был вызван.

В исследованном состоянии:

```
LIST IS NULL
```

Причина пока не установлена.

### Model.Children()

[VERIFIED]

В исследованном случае результат:

```
typeof: undefined
```

Рабочее использование пока не подтверждено.

### T3DObjectList

[VERIFIED]

Тип обнаружен.

У типа обнаружен метод:

```
forEach
```

T3DObjectList является перспективным объектом
для дальнейшего исследования перечисления
3D-объектов.

Статус:

[ACTIVE]

---

## 6. Форматы файлов

[ ]

Исследование ещё не завершено.

Направления:

* файлы моделей;
* библиотеки;
* экспорт;
* импорт;
* внутренние форматы;
* связи файлов с API.

---

## 7. Работа с библиотеками

[ ]

Исследование ещё не завершено.

Необходимо определить:

* API работы с библиотеками;
* загрузку библиотечных элементов;
* создание объектов из библиотек;
* получение параметров библиотечных объектов;
* программное управление библиотеками.

---

## 8. COM/OLE Automation

[VERIFIED]

В runtime обнаружен механизм:

```
NewCOMObject()
```

Исследовались:

```
Scripting.FileSystemObject
WScript.Shell
Shell.Application
MSXML2.XMLHTTP
MSXML2.DOMDocument.6.0
```

COM-объекты представлены runtime-обёрткой:

```
Dispatch
```

Обнаружены внутренние поля:

```
__vars
__methods
__type
__value
__id
```

В:

```
Dispatch.__methods
```

обнаружены descriptors методов.

Зафиксированные поля descriptor:

```
name
dispid
invkind
flags
argcnt
```

Получены реальные DISPID:

```
Scripting.FileSystemObject.BuildPath -> 10000
WScript.Shell.Run                    -> 1000
MSXML2.XMLHTTP.open                  -> 1
```

Статус:

[VERIFIED] COM Automation доступен.

[ACTIVE] Внутренний механизм Dispatch исследуется.

---

## 9. DLL и внешние библиотеки

[ACTIVE]

Ключевой объект reverse engineering:

```
ScriptEditor.dll
```

Инструмент:

```
Ghidra 12.1.2_PUBLIC_20260605
```

Основные задачи:

* найти реализацию Dispatch;
* найти обработку descriptors;
* исследовать DISPID;
* найти механизм native invocation;
* исследовать связь с IDispatch::Invoke;
* найти native API;
* определить возможные дополнительные точки
  взаимодействия с Базисом.

Статус:

[ACTIVE RESEARCH]

---

## 10. Параметры запуска

[ ]

Исследование ещё не завершено.

Необходимо определить:

* параметры командной строки;
* режимы запуска;
* специальные ключи;
* запуск с моделью;
* запуск с документом;
* автоматизацию при старте.

---

## 11. Конфигурационные файлы

[ ]

Исследование ещё не завершено.

Необходимо определить:

* расположение конфигурации;
* формат;
* параметры runtime;
* настройки API;
* настройки Script Editor;
* пользовательские и системные конфигурации.

---

## 12. Реестр Windows

[ ]

Исследование ещё не завершено.

Необходимо проверить:

* регистрацию COM;
* регистрацию DLL;
* ProgID;
* CLSID;
* настройки Базис;
* связи файлов;
* параметры установки.

---

## 13. Межпроцессное взаимодействие

[ ]

Исследование ещё не завершено.

Необходимо определить наличие:

* COM Automation;
* IPC;
* named pipes;
* sockets;
* shared memory;
* Windows messages;
* других механизмов IPC.

Особое направление:

определить, позволяет ли COM-механизм
управлять уже запущенным экземпляром Базис
из внешнего процесса.

---

## 14. Работа с сетью

[ ]

Исследование ещё не завершено.

Необходимо определить:

* сетевые API;
* HTTP;
* WebSocket;
* сетевые библиотеки;
* взаимодействие с Online-сервисами;
* внешнее управление через сеть.

Наличие:

```
MSXML2.XMLHTTP
```

подтверждено как доступный COM-механизм.

Это не означает автоматически наличие
официального сетевого API Базис.

---

## 15. Логирование

[VERIFIED / DEVELOPMENT RULE]

Probe-скрипты должны сохранять результаты
в отдельные файлы.

Script Editor Log используется для:

* запуска;
* короткой диагностики;
* подтверждения выполнения;
* кратких сообщений.

Основные результаты исследования должны
сохраняться в:

```
output\
```

Исходные probe-скрипты:

```
probes\
```

---

## 16. Производительность

[ ]

Исследование ещё не начато.

Будут исследоваться:

* скорость работы API;
* стоимость COM-вызовов;
* скорость перечисления объектов;
* массовое создание объектов;
* массовое изменение объектов;
* влияние количества объектов;
* влияние размера модели.

---

## 17. Ограничения среды

[ACTIVE]

Уже обнаружены ограничения:

```
Invalid class typecast
undefined
NULL / LIST IS NULL
```

Особое внимание уделяется различиям между:

* JavaScript object;
* native object;
* Dispatch wrapper;
* native collection;
* COM object.

Статус:

[ACTIVE]

---

## 18. Архитектура программы

[ACTIVE]

Текущее исследование направлено на установление
архитектуры взаимодействия:

```
JavaScript
    ↓
Runtime
    ↓
Dispatch / Native wrapper
    ↓
Native invocation
    ↓
COM / Bazis native API
    ↓
Базис
```

Эта схема является рабочей моделью исследования.

Полная архитектура пока НЕ считается подтверждённой.

Необходимо подтвердить её посредством:

* runtime probes;
* Ghidra;
* анализа call graph;
* анализа references;
* анализа native functions;
* повторяемых экспериментов.

---

# Текущие приоритеты

Приоритет 1:

```
ScriptEditor.dll
```

Приоритет 2:

```
Dispatch
```

Приоритет 3:

```
native invocation
```

Приоритет 4:

```
JavaScript ↔ native bridge
```

Приоритет 5:

```
Model / native collections
```

Приоритет 6:

```
T3DObjectList
```

Приоритет 7:

```
полный API Model
```

Приоритет 8:

```
внешнее управление Базисом
```

---

# Главная исследовательская цепочка

Требуется подтвердить:

```
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

На данный момент наличие Dispatch,
method descriptors и DISPID подтверждено.

Полная native-реализация цепочки ещё исследуется.

---

# Правило обновления карты

Карта не должна превращаться в список предположений.

Каждое направление обновляется только после получения
нового результата.

Для каждого результата указывается:

* статус;
* что именно установлено;
* источник;
* probe или native-функция;
* результат;
* следующий шаг.

Отрицательные результаты также сохраняются.

---

# Текущий статус проекта

Исследование активно.

Наиболее важное направление текущего этапа:

```
ScriptEditor.dll
    ↓
Dispatch
    ↓
native invocation
    ↓
возможный native API Базис
```

---

Последнее обновление:

2026-07-28
