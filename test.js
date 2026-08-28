'use strict';

var fs = require('fs');
var vm = require('vm');
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
console.assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 600);
shortcuts['Meta+Right']();
console.assert(win.frameGeometry.x === 600 && win.frameGeometry.width === 600);
shortcuts['Meta+Left']();
console.assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 600);
shortcuts['Meta+Left']();
console.assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 800);
shortcuts['Meta+Left']();
console.assert(win.frameGeometry.x === 0 && win.frameGeometry.width === 400);
shortcuts['Meta+Right']();
console.assert(win.frameGeometry.x === 600 && win.frameGeometry.width === 600);
console.log('ok');
