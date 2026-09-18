(function () {
  'use strict';

  var OUT_DIR = 'C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output';
  var OUT_FILE = OUT_DIR + '\\com_wrapper_readonly_probe.txt';

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

  function keys(obj) {
    try { return Object.keys(obj); } catch (e) { return []; }
  }

  function dump(label, value) {
    var lines = [];
    lines.push('[' + label + ']');
    lines.push('typeof: ' + typeof value);
    lines.push('value: ' + safe(value));

    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var ctor = '';
      try { ctor = value.constructor && value.constructor.name ? value.constructor.name : ''; } catch (e1) {}
      if (ctor) lines.push('constructor: ' + ctor);

      var own = ownNames(value);
      lines.push('ownPropsCount: ' + own.length);
      if (own.length) lines.push('ownProps: ' + own.join(', '));

      var en = keys(value);
      lines.push('enumKeysCount: ' + en.length);
      if (en.length) lines.push('enumKeys: ' + en.join(', '));
    }

    lines.push('');
    return lines.join('\n');
  }

  function create(progId) {
    try {
      return { ok: true, value: NewCOMObject(progId) };
    } catch (e) {
      return { ok: false, error: e.message, value: null };
    }
  }

  var ids = [
    'Scripting.FileSystemObject',
    'WScript.Shell',
    'Shell.Application',
    'MSXML2.XMLHTTP',
    'MSXML2.DOMDocument.6.0',
    'ADODB.Stream',
    'WbemScripting.SWbemLocator'
  ];

  var report = [];
  report.push('COM WRAPPER READONLY PROBE');
  report.push('time: ' + new Date().toISOString());
  report.push('cwd: ' + (process.cwd ? process.cwd() : 'n/a'));
  report.push('');

  for (var i = 0; i < ids.length; i++) {
    var pid = ids[i];
    var r = create(pid);
    if (!r.ok) {
      report.push('[' + pid + '] ERROR: ' + r.error);
      report.push('');
      continue;
    }

    var obj = r.value;
    report.push(dump(pid, obj));
    report.push(dump(pid + '.__vars', obj.__vars));
    report.push(dump(pid + '.__methods', obj.__methods));
    report.push(dump(pid + '.__type', obj.__type));
    report.push(dump(pid + '.__id', obj.__id));
  }

  ensureDir(OUT_DIR);
  writeText(OUT_FILE, report.join('\n'));
  if (typeof console !== 'undefined' && console.log) {
    console.log('Saved to ' + OUT_FILE);
  }
})();