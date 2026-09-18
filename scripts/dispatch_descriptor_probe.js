(function () {
  'use strict';

  var OUT_DIR = 'C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output';
  var OUT_FILE = OUT_DIR + '\\dispatch_descriptor_probe.txt';

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

  function dumpObj(label, obj) {
    var lines = [];
    lines.push('[' + label + ']');
    lines.push('typeof: ' + typeof obj);
    lines.push('value: ' + safe(obj));
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

  function dumpDescriptor(obj, methodName) {
    var lines = [];
    lines.push('--- ' + methodName + ' ---');
    try {
      var d = obj.__methods[methodName];
      lines.push('descriptor typeof: ' + typeof d);
      lines.push('descriptor value: ' + safe(d));
      lines.push('descriptor ownProps: ' + ownNames(d).join(', '));
      try { lines.push('descriptor.name: ' + safe(d.name)); } catch (e1) {}
      try { lines.push('descriptor.dispid: ' + safe(d.dispid)); } catch (e2) {}
      try { lines.push('descriptor.invkind: ' + safe(d.invkind)); } catch (e3) {}
      try { lines.push('descriptor.flags: ' + safe(d.flags)); } catch (e4) {}
      try { lines.push('descriptor.argcnt: ' + safe(d.argcnt)); } catch (e5) {}
    } catch (e) {
      lines.push('ERROR: ' + e.message);
    }
    lines.push('');
    return lines.join('\n');
  }

  function create(id) {
    try {
      return NewCOMObject(id);
    } catch (e) {
      return null;
    }
  }

  var report = [];
  report.push('DISPATCH DESCRIPTOR PROBE');
  report.push('time: ' + new Date().toISOString());
  report.push('');

  var targets = [
    ['FSO', 'Scripting.FileSystemObject', ['BuildPath', 'CreateTextFile', 'FolderExists']],
    ['SHELL', 'WScript.Shell', ['CurrentDirectory', 'ExpandEnvironmentStrings', 'Exec', 'Run']],
    ['APP', 'Shell.Application', ['ShellExecute', 'NameSpace', 'BrowseForFolder']],
    ['XMLHTTP', 'MSXML2.XMLHTTP', ['open', 'send', 'setRequestHeader']],
    ['DOM', 'MSXML2.DOMDocument.6.0', ['loadXML', 'save', 'selectSingleNode']]
  ];

  for (var i = 0; i < targets.length; i++) {
    var name = targets[i][0];
    var id = targets[i][1];
    var methods = targets[i][2];

    var obj = create(id);
    if (!obj) {
      report.push('[' + name + '] CREATE FAILED: ' + id);
      report.push('');
      continue;
    }

    report.push(dumpObj(name, obj));
    report.push(dumpObj(name + '.__methods', obj.__methods));

    for (var j = 0; j < methods.length; j++) {
      report.push(dumpDescriptor(obj, methods[j]));
    }
  }

  ensureDir(OUT_DIR);
  writeText(OUT_FILE, report.join('\n'));
  if (typeof console !== 'undefined' && console.log) {
    console.log('Saved to ' + OUT_FILE);
  }
})();