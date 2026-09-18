# SochiCabinetMaker

Document:
0005_COM_Dispatch_Research.md

Version:
1.0

Status:
Active

Author:
SochiCabinetMaker Project

Last Update:
2026-07-28

---

# Исследование COM / Dispatch

БАЗИС-Мебельщик 2026 Online

---

# Цель исследования

Определить:

* существует ли COM Automation в JavaScript Runtime;
* каким объектом представлены COM-объекты;
* как Runtime описывает COM-методы;
* как хранятся DISPID;
* как происходит вызов COM-методов;
* существует ли связь между Dispatch и native-кодом;
* можно ли использовать обнаруженный механизм
  для внешней автоматизации БАЗИС.

---

# 1. Создание COM-объектов

Статус:

```
VERIFIED
```

В JavaScript Runtime обнаружен механизм:

```
NewCOMObject()
```

Он позволяет создавать/получать COM-объекты
из встроенного JavaScript Runtime.

---

# 2. Исследованные COM-объекты

В ходе исследования проверялись:

```text
Scripting.FileSystemObject

WScript.Shell

Shell.Application

MSXML2.XMLHTTP

MSXML2.DOMDocument.6.0
```

---

# 3. Dispatch

Статус:

```
VERIFIED
```

Полученные COM-объекты представлены в Runtime
специальной обёрткой:

```
Dispatch
```

Таким образом, Runtime не предоставляет COM-объект
как обычный JavaScript object.

Между JavaScript-кодом и COM-объектом присутствует
специальный Runtime wrapper.

---

# 4. Внутренняя структура Dispatch

При исследовании объекта `Dispatch` обнаружены
следующие собственные свойства:

```text
__vars
__methods
__type
__value
__id
```

---

# 5. Назначение обнаруженных полей

На текущем этапе зафиксировано только наличие полей.

```text
__vars
__methods
__type
__value
__id
```

Точное внутреннее назначение каждого поля,
за исключением исследованного `__methods`,
требует дальнейшей проверки.

Не следует присваивать полям окончательное
назначение только по имени.

---

# 6. Dispatch.__methods

Статус:

```
VERIFIED
```

В:

```
Dispatch.__methods
```

обнаружены descriptors методов COM-объекта.

---

# 7. Method Descriptor

У descriptor метода обнаружены поля:

```text
name
dispid
invkind
flags
argcnt
```

---

# 8. Значение полей descriptor

На текущем этапе установлено:

```text
name
```

Имя COM-метода.

```text
dispid
```

Идентификатор метода COM.

```text
invkind
```

Информация о типе операции вызова.

```text
flags
```

Флаги descriptor.

```text
argcnt
```

Количество аргументов, связанное с методом.

---

# 9. Реальные DISPID

В ходе исследования были получены реальные значения
DISPID для методов COM.

---

## Scripting.FileSystemObject

Метод:

```
BuildPath
```

DISPID:

```
10000
```

---

## WScript.Shell

Метод:

```
Run
```

DISPID:

```
1000
```

---

## MSXML2.XMLHTTP

Метод:

```
open
```

DISPID:

```
1
```

---

# 10. Подтверждённая таблица DISPID

| COM Object                   | Method      |  DISPID |
| ---------------------------- | ----------- | ------: |
| `Scripting.FileSystemObject` | `BuildPath` | `10000` |
| `WScript.Shell`              | `Run`       |  `1000` |
| `MSXML2.XMLHTTP`             | `open`      |     `1` |

---

# 11. Что подтверждено

На текущем этапе подтверждены следующие факты:

```text
[VERIFIED]

NewCOMObject() доступен в Runtime.

[VERIFIED]

COM-объекты доступны из JavaScript Runtime.

[VERIFIED]

COM-объекты представлены wrapper-объектом Dispatch.

[VERIFIED]

Dispatch содержит __vars.

[VERIFIED]

Dispatch содержит __methods.

[VERIFIED]

Dispatch содержит __type.

[VERIFIED]

Dispatch содержит __value.

[VERIFIED]

Dispatch содержит __id.

[VERIFIED]

В Dispatch.__methods обнаружены method descriptors.

[VERIFIED]

Descriptor содержит name.

[VERIFIED]

Descriptor содержит dispid.

[VERIFIED]

Descriptor содержит invkind.

[VERIFIED]

Descriptor содержит flags.

[VERIFIED]

Descriptor содержит argcnt.

[VERIFIED]

Для исследованных COM-методов получены реальные DISPID.
```

---

# 12. Рабочая модель COM Bridge

На основании подтверждённых результатов
зафиксирована следующая рабочая модель:

```text
JavaScript Runtime
        |
        v
NewCOMObject()
        |
        v
COM Object
        |
        v
Dispatch Wrapper
        |
        +--> __vars
        |
        +--> __methods
        |       |
        |       +--> name
        |       +--> dispid
        |       +--> invkind
        |       +--> flags
        |       +--> argcnt
        |
        +--> __type
        +--> __value
        +--> __id
```

---

# 13. Что пока НЕ установлено

Не установлены:

* точная структура `Dispatch`;
* типы `__vars`, `__methods`, `__type`,
  `__value`, `__id`;
* точная структура method descriptor;
* механизм получения DISPID;
* native-функция, выполняющая вызов метода;
* точный механизм передачи аргументов;
* точный механизм передачи результата;
* обработка COM ошибок;
* механизм освобождения COM-объектов;
* связь Dispatch с `IDispatch::Invoke`;
* связь Dispatch с `ScriptEditor.dll`;
* возможность использовать этот bridge
  из внешнего процесса.

---

# 14. Важное ограничение

Наличие:

```
Dispatch

__methods

DISPID
```

подтверждает существование внутреннего COM bridge.

Однако эти результаты сами по себе НЕ доказывают,
что вызов метода непосредственно реализован через:

```
IDispatch::Invoke
```

Это необходимо установить reverse engineering
native-кода.

---

# 15. Связь с ScriptEditor.dll

Исследование COM bridge необходимо связать
с reverse engineering:

```
ScriptEditor.dll
```

Основная задача:

определить, где именно Runtime реализует переход:

```text
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
COM
```

---

# 16. Следующий этап исследования

Приоритет:

1. Найти реализацию `Dispatch`.

2. Найти создание `Dispatch`.

3. Найти обработку `__methods`.

4. Найти место использования `dispid`.

5. Найти функцию вызова COM-метода.

6. Определить передачу аргументов.

7. Определить получение результата.

8. Проверить наличие:

   ```
   IDispatch::Invoke
   ```

9. Найти связь COM bridge с `ScriptEditor.dll`.

10. Зафиксировать native call chain.

---

# 17. Связанные исследования

Основные связанные документы:

```text
0001_Bazis_Research_Map.md

0002_Runtime_Research.md

0003_External_Automation_Research.md

0004_ScriptEditor_DLL_Analysis.md

0006_Installation_Structure_Research.md
```

---

# Статус

ACTIVE RESEARCH

---

Last Update:

2026-07-28
