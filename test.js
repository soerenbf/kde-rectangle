'use strict';

var fs = require('fs');
var vm = require('vm');
var assert = require('assert');
var shortcuts = {};
var win = {
    resizeable: true,
    frameGeometry: {x: 0, y: 0, width: 1000, height: 1000},
    setMaximize: function () {},
};
var context = {
    KWin: {MaximizeArea: 0},
    workspace: {
        activeWindow: win,
        clientArea: function () {
            return {x: 0, y: 20, width: 1200, height: 800};
        },
    },
    registerShortcut: function (name, description, key, callback) {
        shortcuts[key] = callback;
    },
};

vm.runInNewContext(fs.readFileSync('contents/code/main.js', 'utf8'), context);

shortcuts['Meta+Left']();
assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 600);
assert(win.frameGeometry.y === 20 && win.frameGeometry.height === 800);
shortcuts['Meta+Right']();
assert(win.frameGeometry.x === 600 && win.frameGeometry.width === 600);
shortcuts['Meta+Left']();
assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 600);
shortcuts['Meta+Left']();
assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 800);
shortcuts['Meta+Left']();
assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 400);
shortcuts['Meta+Right']();
assert(win.frameGeometry.x === 600 && win.frameGeometry.width === 600);
shortcuts['Meta+Down']();
assert(win.frameGeometry.x === 300 && win.frameGeometry.width === 600);
shortcuts['Meta+Down']();
assert(win.frameGeometry.x === 200 && win.frameGeometry.width === 800);
shortcuts['Meta+Down']();
assert(win.frameGeometry.x === 400 && win.frameGeometry.width === 400);
console.log('ok');
