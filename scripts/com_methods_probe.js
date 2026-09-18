(function () {
  'use strict';

  var OUT_DIR = 'C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output';
  var OUT_FILE = OUT_DIR + '\\com_methods_probe.txt';

  function ensureDir(dirPath) {
    var fs = require('fs');
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  }

  function writeText(filePath, text) {
    require('fs').writeFileSync(filePath, text, 'utf8');
  }

  function safe(v) {
    try {
      if (v === undefined) return 'undefined';
      if (v === null) return 'null';
      if (typeof v === 'string') return v;
      if (typeof v === 'number' || typeof v === 'boolean') return String(v);
      if (typeof v === 'function') return '[Function ' + (v.name || 'anonymous') + ']';
      if (typeof v === 'object') return Object.prototype.toString.call(v);
      return String(v);
    } catch (e) {
      return '[unprintable: ' + e.message + ']';
    }
  }

  function ownNames(obj) {
    try { return Object.getOwnPropertyNames(obj); } catch (e) { return []; }
  }

  function inspectDispatch(name, obj) {
    var lines = [];
    lines.push('[' + name + ']');
    lines.push('typeof: ' + typeof obj);
    lines.push('value: ' + safe(obj));

    var props = ['__vars', '__methods', '__type', '__value', '__id'];
    for (var i = 0; i < props.length; i++) {
      var p = props[i];
      try {
        lines.push(p + ': ' + safe(obj[p]));
      } catch (e1) {
        lines.push(p + ': ERROR ' + e1.message);
      }
    }

    try {
      lines.push('ownProps: ' + ownNames(obj).join(', '));
    } catch (e2) {
      lines.push('ownProps: ERROR ' + e2.message);
    }

    try {
      lines.push('inner __value ownProps: ' + ownNames(obj.__value).join(', '));
    } catch (e3) {
      lines.push('inner __value ownProps: ERROR ' + e3.message);
    }

    lines.push('');
    return lines.join('\n');
  }

  function tryCall(obj, methodName, args) {
    try {
      if (typeof obj[methodName] !== 'function') return methodName + ': NOT A FUNCTION';
      var result = obj[methodName].apply(obj, args || []);
      return methodName + ': OK -> ' + safe(result);
    } catch (e) {
      return methodName + ': ERROR -> ' + e.message;
    }
  }

  function tryCreate(progId) {
    try {
      return { ok: true, value: NewCOMObject(progId) };
    } catch (e) {
      return { ok: false, error: e.message, value: null };
    }
  }

  var report = [];
  report.push('COM METHODS PROBE');
  report.push('time: ' + new Date().toISOString());
  report.push('cwd: ' + (process.cwd ? process.cwd() : 'n/a'));
  report.push('');

  var fsoTest = tryCreate('Scripting.FileSystemObject');
  var shellTest = tryCreate('WScript.Shell');
  var appTest = tryCreate('Shell.Application');
  var httpTest = tryCreate('MSXML2.XMLHTTP');
  var domTest = tryCreate('MSXML2.DOMDocument.6.0');
  var streamTest = tryCreate('ADODB.Stream');
  var wbemTest = tryCreate('WbemScripting.SWbemLocator');

  var items = [
    ['Scripting.FileSystemObject', fsoTest],
    ['WScript.Shell', shellTest],
    ['Shell.Application', appTest],
    ['MSXML2.XMLHTTP', httpTest],
    ['MSXML2.DOMDocument.6.0', domTest],
    ['ADODB.Stream', streamTest],
    ['WbemScripting.SWbemLocator', wbemTest]
  ];

  for (var i = 0; i < items.length; i++) {
    var name = items[i][0];
    var r = items[i][1];
    if (!r.ok) {
      report.push('[' + name + '] ERROR: ' + r.error);
      report.push('');
      continue;
    }

    var obj = r.value;
    report.push(inspectDispatch(name, obj));

    if (name === 'Scripting.FileSystemObject') {
      report.push(tryCall(obj, 'GetAbsolutePathName', ['.']));
      report.push(tryCall(obj, 'BuildPath', [OUT_DIR, 'probe.tmp']));
      report.push(tryCall(obj, 'FolderExists', [OUT_DIR]));
      report.push(tryCall(obj, 'CreateTextFile', [OUT_DIR + '\\probe_tmp.txt', true, true]));
    }

    if (name === 'WScript.Shell') {
      report.push(tryCall(obj, 'ExpandEnvironmentStrings', ['%TEMP%']));
      report.push(tryCall(obj, 'SpecialFolders', ['Desktop']));
      report.push(tryCall(obj, 'Run', ['cmd /c echo bazis_probe', 0, true]));
    }

    if (name === 'Shell.Application') {
      report.push(tryCall(obj, 'NameSpace', [OUT_DIR]));
      report.push(tryCall(obj, 'BrowseForFolder', [0, 'Select folder', 0, 0]));
      report.push(tryCall(obj, 'ShellExecute', ['notepad.exe', '', '', 'open', 0]));
    }

    if (name === 'MSXML2.XMLHTTP') {
      report.push(tryCall(obj, 'open', ['GET', 'https://example.com', false]));
      report.push(tryCall(obj, 'setRequestHeader', ['X-Test', '1']));
      report.push(tryCall(obj, 'send', []));
    }

    if (name === 'MSXML2.DOMDocument.6.0') {
      report.push(tryCall(obj, 'loadXML', ['<root><a>1</a></root>']));
      report.push(tryCall(obj, 'selectSingleNode', ['/root/a']));
      report.push(tryCall(obj, 'createElement', ['x']));
    }

    if (name === 'ADODB.Stream') {
      report.push(tryCall(obj, 'Open', []));
      report.push(tryCall(obj, 'Type', []));
      report.push(tryCall(obj, 'WriteText', ['bazis']));
      report.push(tryCall(obj, 'SaveToFile', [OUT_DIR + '\\stream_test.txt', 2]));
      report.push(tryCall(obj, 'Close', []));
    }

    if (name === 'WbemScripting.SWbemLocator') {
      report.push(tryCall(obj, 'ConnectServer', ['.']));
    }

    report.push('');
  }

  report.push('UI CHECKS');
  try {
    report.push('UI.dialogs ownProps: ' + ownNames(UI.dialogs).join(', '));
    report.push('UI.components ownProps: ' + ownNames(UI.components).join(', '));
    report.push('UI.constants ownProps: ' + ownNames(UI.constants).join(', '));
  } catch (e4) {
    report.push('UI ERROR: ' + e4.message);
  }

  ensureDir(OUT_DIR);
  writeText(OUT_FILE, report.join('\n'));

  if (typeof console !== 'undefined' && console.log) {
    console.log('Saved to ' + OUT_FILE);
  }
})();