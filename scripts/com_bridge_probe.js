(function () {
  'use strict';

  var OUT_DIR = 'C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output';
  var OUT_FILE = OUT_DIR + '\\com_bridge_probe.txt';

  function now() {
    try { return new Date().toISOString(); } catch (e) { return String(new Date()); }
  }

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

  function inspectObject(name, obj) {
    var lines = [];
    lines.push('[' + name + ']');
    lines.push('typeof: ' + typeof obj);
    lines.push('value: ' + safe(obj));

    if (obj && (typeof obj === 'object' || typeof obj === 'function')) {
      var ctor = '';
      try { ctor = obj.constructor && obj.constructor.name ? obj.constructor.name : ''; } catch (e1) {}
      if (ctor) lines.push('constructor: ' + ctor);

      var own = ownNames(obj);
      lines.push('ownPropsCount: ' + own.length);
      if (own.length) lines.push('ownProps: ' + own.join(', '));

      var funcs = [];
      for (var i = 0; i < own.length; i++) {
        try {
          if (typeof obj[own[i]] === 'function') funcs.push(own[i]);
        } catch (e2) {}
      }
      lines.push('ownMethodsCount: ' + funcs.length);
      if (funcs.length) lines.push('ownMethods: ' + funcs.join(', '));
    }

    lines.push('');
    return lines.join('\n');
  }

  function tryNewCOM(progId) {
    var result = { progId: progId, ok: false, value: null, error: '' };
    try {
      result.value = NewCOMObject(progId);
      result.ok = true;
    } catch (e) {
      result.error = e.message;
    }
    return result;
  }

  var report = [];
  report.push('COM BRIDGE PROBE');
  report.push('time: ' + now());
  report.push('cwd: ' + (process.cwd ? process.cwd() : 'n/a'));
  report.push('typeof NewCOMObject: ' + typeof NewCOMObject);
  report.push('');

  var progIds = [
    'Scripting.FileSystemObject',
    'WScript.Shell',
    'Shell.Application',
    'ADODB.Stream',
    'MSXML2.XMLHTTP',
    'MSXML2.DOMDocument.6.0',
    'WbemScripting.SWbemLocator',
    'Excel.Application',
    'Word.Application'
  ];

  report.push('NEWCOMOBJECT TESTS');
  for (var i = 0; i < progIds.length; i++) {
    var r = tryNewCOM(progIds[i]);
    if (r.ok) {
      report.push('[' + r.progId + '] OK');
      report.push(inspectObject(r.progId, r.value));
    } else {
      report.push('[' + r.progId + '] ERROR: ' + r.error);
      report.push('');
    }
  }

  report.push('UI NESTED PROBES');
  try {
    report.push(inspectObject('UI.dialogs', UI.dialogs));
  } catch (e1) {
    report.push('[UI.dialogs] ERROR: ' + e1.message);
    report.push('');
  }

  try {
    report.push(inspectObject('UI.components', UI.components));
  } catch (e2) {
    report.push('[UI.components] ERROR: ' + e2.message);
    report.push('');
  }

  try {
    report.push(inspectObject('UI.constants', UI.constants));
  } catch (e3) {
    report.push('[UI.constants] ERROR: ' + e3.message);
    report.push('');
  }

  report.push('MODEL/FILE DATA');
  try { report.push(inspectObject('currentFileData', currentFileData)); } catch (e4) { report.push('[currentFileData] ERROR: ' + e4.message + '\n'); }
  try { report.push(inspectObject('apiVersion', apiVersion)); } catch (e5) { report.push('[apiVersion] ERROR: ' + e5.message + '\n'); }
  try { report.push(inspectObject('modelIOOperations', modelIOOperations)); } catch (e6) { report.push('[modelIOOperations] ERROR: ' + e6.message + '\n'); }

  ensureDir(OUT_DIR);
  writeText(OUT_FILE, report.join('\n'));
  if (typeof console !== 'undefined' && console.log) {
    console.log('Saved to ' + OUT_FILE);
  }
})();