(function () {
  'use strict';

  var OUT_DIR = 'C:\\Users\\SochiByte\\Documents\\Bazis\\SochiCabinetMaker\\output';
  var OUT_FILE = OUT_DIR + '\\bazis_targeted_api_probe.txt';

  function now() {
    try { return new Date().toISOString(); } catch (e) { return String(new Date()); }
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

  function ensureDir(dirPath) {
    if (typeof require === 'function') {
      var fs = require('fs');
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      return;
    }
    throw new Error('No directory creator available');
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
    throw new Error('No file writer available');
  }

  function getRoot() {
    try { return Function('return this')(); } catch (e) {}
    try { return global; } catch (e2) {}
    return {};
  }

  function ownNames(obj) {
    try { return Object.getOwnPropertyNames(obj); } catch (e) { return []; }
  }

  function protoNames(obj, depth) {
    var out = [];
    var seen = {};
    var cur = obj;
    var d = 0;
    while (cur && d < depth) {
      var names = ownNames(cur);
      for (var i = 0; i < names.length; i++) {
        if (!seen[names[i]]) {
          seen[names[i]] = true;
          out.push(names[i]);
        }
      }
      try {
        cur = Object.getPrototypeOf(cur);
      } catch (e) {
        break;
      }
      d++;
    }
    return out;
  }

  function inspect(name, value) {
    var lines = [];
    lines.push('[' + name + ']');
    lines.push('typeof: ' + typeof value);
    lines.push('value: ' + safe(value));

    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var ctor = '';
      try { ctor = value.constructor && value.constructor.name ? value.constructor.name : ''; } catch (e1) {}
      if (ctor) lines.push('constructor: ' + ctor);

      var own = ownNames(value);
      lines.push('ownPropsCount: ' + own.length);
      if (own.length) lines.push('ownProps: ' + own.join(', '));

      var proto = protoNames(value, 4);
      lines.push('protoPropsCount: ' + proto.length);
      if (proto.length) lines.push('protoProps: ' + proto.join(', '));

      var methods = [];
      for (var i = 0; i < own.length; i++) {
        var k = own[i];
        try {
          if (typeof value[k] === 'function') methods.push(k);
        } catch (e2) {}
      }
      lines.push('ownMethodsCount: ' + methods.length);
      if (methods.length) lines.push('ownMethods: ' + methods.join(', '));
    }

    lines.push('');
    return lines.join('\n');
  }

  var root = getRoot();

  var targets = [
    'apiVersion',
    'scriptApiVersion',
    'NewCOMObject',
    'materialData',
    'modelIOOperations',
    'objectData',
    'execution',
    'UI',
    'objects3d',
    'panelOperations',
    'geometry3d',
    'geometry2d',
    'currentFileData',
    'arrangePositions',
    'batchProcessing',
    'historyOperations',
    'interaction',
    'fastenerOperations',
    'SaveFile',
    'SaveModel',
    'LoadModel',
    'NewModel',
    'OpenFurniture',
    'GetObject',
    'GetPanel',
    'Get3DObject',
    'AddPanel',
    'AddAssembly',
    'AddFastener',
    'DeleteObject',
    'StartEditing',
    'BeginBlock',
    'EndBlock'
  ];

  var report = [];
  report.push('BAZIS TARGETED API PROBE');
  report.push('time: ' + now());
  report.push('cwd: ' + (typeof process !== 'undefined' && process.cwd ? process.cwd() : 'n/a'));
  report.push('');

  report.push('ENV');
  report.push('typeof require: ' + typeof require);
  report.push('typeof process: ' + typeof process);
  report.push('typeof ActiveXObject: ' + typeof ActiveXObject);
  report.push('');

  report.push('TARGETS');
  for (var i = 0; i < targets.length; i++) {
    var name = targets[i];
    var exists = false;
    var val;
    try {
      val = root[name];
      exists = !(val === undefined || val === null);
    } catch (e) {
      report.push('[' + name + '] ERROR: ' + e.message);
      report.push('');
      continue;
    }

    if (exists) {
      report.push(inspect(name, val));
    } else {
      report.push('[' + name + '] not available');
      report.push('');
    }
  }

  report.push('ROOT KEY FILTER');
  var keys = ownNames(root);
  var filter = [];
  var words = ['api', 'helper', 'model', 'object', 'panel', 'geometry', 'material', 'file', 'save', 'load', 'new', 'add', 'delete', 'arrange', 'execution', 'interaction', 'fastener', 'ui', 'script'];
  for (var j = 0; j < keys.length; j++) {
    var low = String(keys[j]).toLowerCase();
    for (var w = 0; w < words.length; w++) {
      if (low.indexOf(words[w]) !== -1) {
        filter.push(keys[j]);
        break;
      }
    }
  }
  report.push('filteredCount: ' + filter.length);
  if (filter.length) report.push('filtered: ' + filter.join(', '));
  report.push('');

  ensureDir(OUT_DIR);
  var writer = writeText(OUT_FILE, report.join('\n'));
  if (typeof console !== 'undefined' && console.log) {
    console.log('Saved to ' + OUT_FILE + ' via ' + writer);
  }
})();