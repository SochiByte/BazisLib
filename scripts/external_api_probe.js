(function () {
  'use strict';

  var OUT_DIR = 'C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output';
  var OUT_FILE = OUT_DIR + '\\external_api_probe.txt';

  function now() {
    try { return new Date().toISOString(); } catch (e) { return String(new Date()); }
  }

  function safeStr(v) {
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

  function ensureDir(dirPath) {
    try {
      if (typeof require === 'function') {
        var fs = require('fs');
        var path = require('path');
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        return;
      }
    } catch (e1) {}

    try {
      if (typeof ActiveXObject !== 'undefined') {
        var fso = new ActiveXObject('Scripting.FileSystemObject');
        if (!fso.FolderExists(dirPath)) {
          fso.CreateFolder(dirPath);
        }
      }
    } catch (e2) {}
  }

  function writeText(filePath, text) {
    if (typeof require === 'function') {
      var fs = require('fs');
      fs.writeFileSync(filePath, text, 'utf8');
      return 'node-fs';
    }

    if (typeof ActiveXObject !== 'undefined') {
      var fso = new ActiveXObject('Scripting.FileSystemObject');
      var tf = fso.CreateTextFile(filePath, true, true);
      tf.Write(text);
      tf.Close();
      return 'activex-fso';
    }

    if (typeof WScript !== 'undefined' && WScript && WScript.CreateObject) {
      var fso2 = WScript.CreateObject('Scripting.FileSystemObject');
      var tf2 = fso2.CreateTextFile(filePath, true, true);
      tf2.Write(text);
      tf2.Close();
      return 'wscript-fso';
    }

    throw new Error('No file writer available');
  }

  function getGlobalRoot() {
    try { return Function('return this')(); } catch (e) {}
    try { return global; } catch (e2) {}
    return {};
  }

  function tryGet(obj, name) {
    try { return { ok: true, value: obj[name] }; }
    catch (e) { return { ok: false, error: e.message }; }
  }

  function ownNames(obj) {
    try { return Object.getOwnPropertyNames(obj); } catch (e) { return []; }
  }

  function summarize(name, obj) {
    var lines = [];
    lines.push('[' + name + ']');
    lines.push('typeof: ' + typeof obj);
    lines.push('value: ' + safeStr(obj));

    if (obj && (typeof obj === 'object' || typeof obj === 'function')) {
      var ctor = '';
      try { ctor = obj.constructor && obj.constructor.name ? obj.constructor.name : ''; } catch (e1) {}
      if (ctor) lines.push('constructor: ' + ctor);

      var props = ownNames(obj);
      lines.push('ownPropsCount: ' + props.length);
      if (props.length) lines.push('ownProps: ' + props.join(', '));
    }

    lines.push('');
    return lines.join('\n');
  }

  var root = getGlobalRoot();
  var report = [];
  report.push('EXTERNAL API PROBE');
  report.push('time: ' + now());
  report.push('');

  report.push('ENV');
  report.push('typeof require: ' + typeof require);
  report.push('typeof process: ' + typeof process);
  report.push('typeof ActiveXObject: ' + typeof ActiveXObject);
  report.push('typeof WScript: ' + typeof WScript);
  report.push('');

  var names = [
    'Application', 'Model', 'Editor', 'Document', 'Panel', 'Selection',
    'Script', 'Kernel', 'Bazis', 'System',
    'process', 'require', 'module', 'global', 'globalThis', 'window', 'self', 'external'
  ];

  report.push('GLOBAL OBJECTS');
  for (var i = 0; i < names.length; i++) {
    var n = names[i];
    var got = tryGet(root, n);
    if (got.ok && got.value !== undefined && got.value !== null) {
      report.push(summarize(n, got.value));
    } else {
      report.push('[' + n + '] not available');
      if (!got.ok) report.push('error: ' + got.error);
      report.push('');
    }
  }

  report.push('ROOT SUMMARY');
  report.push('global own props count: ' + ownNames(root).length);
  report.push('');

  ensureDir(OUT_DIR);
  var writer = writeText(OUT_FILE, report.join('\n'));
  if (typeof console !== 'undefined' && console.log) {
    console.log('Saved to ' + OUT_FILE + ' via ' + writer);
  }
})();