# ScriptEditor.dll — project notes

## Identification
- File: `ScriptEditor.dll`
- Type: PE32+ DLL, x86-64
- Subsystem: Windows GUI
- Timestamp: 2026-07-10 05:42:50
- Sections: 10
- Image base: `0x400000`
- Export table present with 24 named exports

## Key evidence
This DLL is not just a helper library. It exposes a public export surface that can be called from outside the process.

## Exported functions
Main externally useful exports:
- `BringToFrontAndShow`
- `ClearLog`
- `CloseAfterBazis`
- `CloseEditor`
- `DLLFinalize`
- `DLLInitialize`
- `InsertText`
- `InstanceExists`
- `PrepareSE`
- `ReleaseEditor`
- `RunSE`
- `SEOpenFile`
- `SetBazisWorkFolder`
- `SetOnGetPMData`
- `SetOnPMEditorResults`
- `SetOnRunDebugScriptCallback`
- `SetOnRunScriptCallback`
- `SetOnScriptIsClosingCallback`
- `SetPMData`
- `UpdateLog`
- `dxFinalizeScriptEditor`
- `dxInitializeScriptEditor`

Special/internal exports also present:
- `__dbk_fcall_wrapper`
- `dbkFCallWrapperAddr`

Notes:
- The export surface is small and focused on editor lifecycle, script launching, file opening, log updates, and callback registration.
- The presence of `RunSE` and `SEOpenFile` is the strongest sign that external callers can drive at least part of the ScriptEditor workflow.

## Functional meaning
The export names strongly suggest that `ScriptEditor.dll` is a bridge layer for:
- starting and stopping ScriptEditor
- opening files in the editor
- running scripts
- updating logs
- inserting text into the editor
- reacting to script lifecycle events through callbacks
- setting Bazis working folder

## Imports
Important imported subsystems:
- `kernel32.dll`
- `user32.dll`
- `gdi32.dll`
- `comctl32.dll`
- `comdlg32.dll`
- `shell32.dll`
- `ole32.dll`
- `oleaut32.dll`
- `oledlg.dll`
- `advapi32.dll`
- `wininet.dll`
- `winspool.drv`
- `winmm.dll`
- `version.dll`
- `shlwapi.dll`
- `WTSAPI32.DLL`
- `SHFolder.dll`
- `api-ms-win-crt-string-l1-1-0.dll`

Interesting imported APIs:
- OLE/COM-related: `CoCreateInstance`, `CoInitialize`, `CoInitializeEx`, `CoUninitialize`, `CLSIDFromString`, `ProgIDFromCLSID`, `GetActiveObject`, `OleInitialize`, `OleUninitialize`, `OleSetMenuDescriptor`
- Registry/security: `RegCreateKeyExW`, `RegOpenKeyExW`, `RegSetValueExW`, `RegQueryValueExW`, `RegEnumKeyExW`, `RegEnumValueW`, `RegDeleteValueW`, `RegDeleteKeyW`, `Crypt*` functions
- Network: `InternetOpenW`, `InternetOpenUrlW`, `InternetReadFile`, `InternetCloseHandle`, `InternetSetOptionW`

Interpretation:
- GUI/editor functionality is expected.
- OLE/COM support exists at the import level, but no COM class registration has been confirmed yet.
- `wininet.dll` suggests network capability or dependencies, but not necessarily an exposed network API.

## Strings worth preserving
- `ScriptEditorConnection`
- `dxInitializeScriptEditor`
- `dxFinalizeScriptEditor`
- `SetOnRunScriptCallback`
- `SetOnRunDebugScriptCallback`
- `SetOnScriptIsClosingCallback`
- `SetOnGetPMData`
- `SetOnPMEditorResults`
- `SetBazisWorkFolder`
- `SEOpenFile`
- `RunSE`
- `PrepareSE`
- `InstanceExists`
- `CloseEditor`
- `CloseAfterBazis`
- `BringToFrontAndShow`
- `UpdateLog`
- `ClearLog`
- `InsertText`

## Current conclusion
`ScriptEditor.dll` is a real external control surface for the ScriptEditor subsystem. It looks like a DLL bridge with public exports and callback hooks, not a classical COM automation server.

The strongest practical next step is to resolve call order and signatures for the public exports, starting with `DLLInitialize`/`dxInitializeScriptEditor`, then `PrepareSE`, `SEOpenFile`, `RunSE`, `SetBazisWorkFolder`, and finally `CloseEditor`/`ReleaseEditor`.

## Next steps
1. Inspect the exported functions in a debugger or by controlled caller code.
2. Test which functions require initialization order.
3. Determine argument types for `RunSE`, `SEOpenFile`, `SetBazisWorkFolder`, and the callback setters.
4. Map whether this DLL controls only the editor or also the main Bazis application.

