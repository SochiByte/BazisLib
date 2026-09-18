# Bazis 2026 Online — результаты исследования API и Script Runtime

**Проект:** Bazis2026Online
**Программа:** Базис-Мебельщик 2026 Online
**Платформа:** Windows
**Дата фиксации:** 27 июля 2026 г.
**Статус:** исследование продолжается

---

## 1. Цель исследования

Цель проекта — определить реальные возможности программного управления Базис-Мебельщик 2026 Online:

1. исследовать встроенный JavaScript runtime;
2. определить доступные глобальные объекты и классы;
3. определить реальные методы и свойства объектов;
4. исследовать механизм обращения JavaScript к нативным объектам;
5. определить существование внешних API и COM-механизмов;
6. исследовать `ScriptEditor.dll` и нативную реализацию вызовов;
7. получить достоверную основу для последующей автоматизации построения мебели.

Главное правило исследования:

> Метод или свойство считается найденным только после подтверждения его существования и поведения в Базис 2026 Online.

Наличие одноимённого метода в документации, старой версии Базис или стороннем примере само по себе не считается подтверждением.

---

# 2. Версия Базис

Исследование относится исключительно к:

**Базис-Мебельщик 2026 Online**

Результаты, полученные ранее для Базис 2022 или других версий, нельзя автоматически переносить в текущую документацию.

---

# 3. JavaScript runtime

В ходе исследования установлено, что Базис 2026 использует JavaScript runtime на базе:

**Node.js 22.14.0**

Это следует рассматривать отдельно от ранее полученных результатов для старого runtime:

```text
Node.js 8.11.3
V8 6.2.414.54
```

Старый runtime не относится к текущему исследованию Базис 2026 и не должен использоваться как источник API Базис 2026.

---

# 4. Обнаруженные основные объекты

В runtime были обнаружены или исследовались следующие объекты/классы:

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

Также в исследовании встречались нативные типы:

```text
TFurnPanel
TFurnAsm
TFastener
TExtrusionBody
TObject3D
T3DObjectList
```

Наличие имени объекта или класса ещё не означает, что все его методы доступны из JavaScript.

---

# 5. Model

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

## 5.1 Model.Objects

`Model.Objects` действительно существует.

Полученный runtime-тип:

```text
typeof: object
```

При исследовании были обнаружены свойства:

```text
Count
Length
Current
Item
```

Причём runtime сообщил их как:

```text
Count  : string
Length : string
Current: string
Item   : string
```

Попытки использовать стандартные методы перечисления дали ошибки:

```text
MoveNext      -> Invalid class typecast
Reset         -> Invalid class typecast
GetEnumerator -> Invalid class typecast
Enumerate     -> Invalid class typecast
forEach       -> Invalid class typecast
```

### Вывод

`Model.Objects` нельзя считать обычной JavaScript-коллекцией.

Нельзя предполагать, что она поддерживает стандартный JS API:

```javascript
forEach(...)
for...of
GetEnumerator()
MoveNext()
```

Поддержка этих операций должна быть подтверждена отдельно.

---

# 6. Model.GetObjectsList()

Исследование показало, что вызов:

```javascript
Model.GetObjectsList()
```

может быть выполнен, однако результат оказался:

```text
LIST IS NULL
```

Следовательно, сам факт наличия метода не означает получение готового списка объектов.

Требуется дальнейшее исследование условий, при которых `GetObjectsList()` возвращает действительный объект.

---

# 7. Model.Children()

При исследовании:

```javascript
Model.Children()
```

результат был:

```text
typeof: undefined
```

Это означает, что нельзя считать `Children()` доступным методом JavaScript API только на основании предполагаемой структуры объекта.

---

# 8. Model.Enumerate() / Model.GetEnumerator()

Исследовались:

```javascript
Model.Enumerate()
Model.GetEnumerator()
```

Полученные результаты не подтвердили наличие рабочего JS-интерфейса перечисления.

В отдельных probe-скриптах результат был:

```text
undefined
```

или вызов приводил к:

```text
Invalid class typecast
```

### Текущий статус

Рабочий способ перечисления объектов модели через эти методы **не установлен**.

---

# 9. TObject3D и T3DObjectList

В ходе исследования были подтверждены нативные типы, связанные с 3D-объектами:

```text
TObject3D
T3DObjectList
```

Особенно важен `T3DObjectList`.

В его runtime-описании был обнаружен:

```text
forEach
```

Это отличается от ситуации с `Model.Objects`, где попытка использовать `forEach` приводила к:

```text
Invalid class typecast
```

### Вывод

Нельзя переносить поведение одной коллекции на другую.

`T3DObjectList` является одним из наиболее перспективных объектов для дальнейшего исследования механизма перечисления 3D-объектов.

---

# 10. Документированные модули JavaScript API

В документации Базис были обнаружены следующие модули и функции.

## materialData

```text
SetupActiveMaterial
SetupActiveButtMaterial
ChooseActiveFurnMaterial
```

## geometry3d

```text
VectorMake
VectorAdd
VectorSub
VectorMul
VectorsAreColinear
```

## objectData

```text
GetObjectUserProperties
GetAdditionalMaterials
```

## modelIOOperations

```text
SaveModelToFile
LoadModelFromFile
```

Важное ограничение:

```text
LoadModelFromFile
```

загружает новую модель и уничтожает текущую модель.

## currentFileData

Доступны данные:

```text
model
article
filename
```

## arrangePositions

Модуль содержит механизм:

```text
NewArranger
```

и связанные с ним операции автоматического размещения.

---

# 11. COM Bridge

В ходе исследования был обнаружен механизм создания COM-объектов через:

```javascript
NewCOMObject()
```

Это является важным установленным результатом.

Были успешно исследованы следующие COM-классы:

```text
Scripting.FileSystemObject
WScript.Shell
Shell.Application
MSXML2.XMLHTTP
MSXML2.DOMDocument.6.0
```

Таким образом, runtime Базис 2026 способен взаимодействовать с Windows COM Automation.

---

# 12. Внутреннее представление COM-объектов

Полученные через `NewCOMObject()` объекты представлены внутри runtime специальным объектом:

```text
Dispatch
```

При исследовании объекта были обнаружены внутренние поля:

```text
__vars
__methods
__type
__value
__id
```

Зафиксированная структура:

```text
typeof: function
constructor: Dispatch
ownPropsCount: 5

ownProps:
    __vars
    __methods
    __type
    __value
    __id
```

Это особенно важно для дальнейшего reverse engineering.

---

# 13. Dispatch descriptor

Исследование `__methods` показало, что runtime хранит информацию о COM-методах не просто как обычные JS-функции.

Для методов обнаруживаются descriptor-данные.

В частности:

```text
name
dispid
invkind
flags
argcnt
```

Таким образом, runtime имеет собственный слой описания COM Automation:

```text
JavaScript
    ↓
Dispatch
    ↓
method descriptor
    ↓
DISPID / INVOKEKIND / flags / argcnt
    ↓
COM IDispatch::Invoke
    ↓
Windows COM object
```

Это пока является моделью работы, которую необходимо окончательно подтвердить исследованием `ScriptEditor.dll`, но наличие descriptor-данных уже установлено.

---

# 14. Подтверждённые DISPID

Во время probe были получены следующие значения:

| COM-объект / метод                     |  DISPID |
| -------------------------------------- | ------: |
| `Scripting.FileSystemObject.BuildPath` | `10000` |
| `WScript.Shell.Run`                    |  `1000` |
| `MSXML2.XMLHTTP.open`                  |     `1` |

Эти значения являются важным подтверждением того, что runtime действительно работает с COM Automation через стандартную модель `IDispatch`.

---

# 15. Значение обнаруженного Dispatch

На текущем этапе `Dispatch` является одним из наиболее важных объектов исследования.

Обнаруженная структура:

```text
Dispatch
├── __vars
├── __methods
├── __type
├── __value
└── __id
```

`__methods` содержит описания доступных COM-методов.

Descriptor метода содержит как минимум:

```text
name
dispid
invkind
flags
argcnt
```

Это позволяет предположить наличие универсального механизма:

```text
JS method call
      ↓
Dispatch wrapper
      ↓
method descriptor
      ↓
DISPID
      ↓
native invocation
      ↓
IDispatch::Invoke
```

Для окончательного подтверждения необходимо исследовать реализацию `Invoke` в `ScriptEditor.dll`.

---

# 16. ScriptEditor.dll

Файл:

```text
ScriptEditor.dll
```

был помещён в проект Ghidra:

```text
C:\Users\SochiByte\Documents\Bazis\Bazis2026Online
```

Используется:

```text
Ghidra 12.1.2_PUBLIC_20260605
```

Цель анализа DLL:

1. найти реализацию `Dispatch`;
2. найти реализацию вызова методов;
3. найти обработку `DISPID`;
4. найти `IDispatch::Invoke` или собственный аналог;
5. установить механизм преобразования JS-вызова в native/COM вызов;
6. определить, какие дополнительные native API доступны runtime;
7. определить возможность обращения к API Базис за пределами документированного JS API.

---

# 17. Что уже установлено

На текущий момент достоверно установлены следующие факты:

```text
[OK] Базис 2026 Online содержит JavaScript runtime.

[OK] Runtime использует Node.js 22.14.0.

[OK] Существует объектная модель Базис, включающая Model,
     Application, Editor, Document и другие объекты.

[OK] Model существует в runtime.

[OK] Model.Objects существует, но не является обычной
     JS-коллекцией с подтверждённым стандартным перечислением.

[OK] Model.GetObjectsList() вызывается, но в исследованном
     состоянии вернул NULL.

[OK] TObject3D и T3DObjectList присутствуют среди нативных типов.

[OK] T3DObjectList содержит forEach.

[OK] В runtime существует NewCOMObject().

[OK] Через NewCOMObject() доступны Windows COM Automation объекты.

[OK] COM-объекты представлены runtime-обёрткой Dispatch.

[OK] Dispatch содержит __vars, __methods, __type, __value, __id.

[OK] __methods содержит descriptors методов.

[OK] Descriptor содержит name, dispid, invkind, flags, argcnt.

[OK] Получены реальные DISPID COM-методов.

[OK] ScriptEditor.dll является ключевым объектом дальнейшего
     reverse engineering.
```

---

# 18. Что пока НЕ установлено

Следующие вопросы остаются открытыми:

```text
[?] Полный список native API Базис 2026.

[?] Полный список методов Model.

[?] Рабочий способ перечисления Model.Objects.

[?] Причина Invalid class typecast при обращении
    к методам коллекций.

[?] Как именно T3DObjectList создаётся и получается
    из Model.

[?] Полная структура Dispatch.

[?] Точная реализация вызова Dispatch method.

[?] Точная связь Dispatch с IDispatch::Invoke.

[?] Возможность вызова native API Базис напрямую
    через найденный механизм.

[?] Возможность управления Базисом из внешнего процесса.

[?] Наличие других внешних API помимо JavaScript/COM.
```

---

# 19. Основное направление следующего этапа

Наиболее перспективное направление исследования:

```text
ScriptEditor.dll
        ↓
Dispatch
        ↓
__methods
        ↓
DISPID
        ↓
Invoke
        ↓
native call
```

Особый интерес представляет функция/метод, связанный с:

```text
Invoke
```

Задача следующего этапа — установить реальную цепочку исполнения:

```text
JavaScript-код
    ↓
Dispatch wrapper
    ↓
descriptor
    ↓
Invoke
    ↓
native implementation
    ↓
COM / Bazis API
```

Если эта цепочка будет подтверждена в Ghidra, можно будет перейти от исследования отдельных JS-объектов к систематическому поиску полного native API Базис 2026.

---

# 20. Правило статусов исследования

Для дальнейшей документации использовать три статуса:

### VERIFIED

Факт подтверждён непосредственно в Базис 2026 runtime или бинарном анализе.

### DOCUMENTED

Факт присутствует в документации Базис, но ещё не подтверждён runtime.

### HYPOTHESIS

Предположение, которое требует дополнительной проверки.

Не смешивать эти категории.

---

# 21. Текущее состояние проекта

Исследование перешло от простого поиска JavaScript API к анализу внутреннего механизма runtime.

Ключевой установленный факт текущего этапа:

> Базис 2026 имеет не только документированный JavaScript API, но и runtime-механизм `Dispatch` для взаимодействия с COM Automation. Внутри `Dispatch` присутствуют descriptors методов с `DISPID` и другими параметрами вызова.

Это делает `ScriptEditor.dll` центральным объектом дальнейшего исследования.

**Статус проекта: ACTIVE RESEARCH**
