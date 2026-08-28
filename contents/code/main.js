'use strict';

var FRACTIONS = [1 / 2, 2 / 3, 1 / 3];

/** Return next width fraction, using current geometry as cycle state. */
function nextFraction(windowWidth, areaWidth) {
    var current = windowWidth / areaWidth;
    for (var i = 0; i < FRACTIONS.length; i++) {
        if (Math.abs(current - FRACTIONS[i]) < 0.02) {
            return FRACTIONS[(i + 1) % FRACTIONS.length];
        }
    }
    return FRACTIONS[0];
}

/** Resize active window to next fraction and anchor it to given side. */
function cycle(side) {
    var win = workspace.activeWindow;
    if (!win || !win.resizeable) {
        return;
    }

    var area = workspace.clientArea(KWin.MaximizeArea, win);
    var geometry = win.frameGeometry;
    var anchored = side === 'left'
        ? Math.abs(geometry.x - area.x) < 2
        : Math.abs(geometry.x + geometry.width - area.x - area.width) < 2;
    var fraction = anchored ? nextFraction(geometry.width, area.width) : FRACTIONS[0];
    var width = Math.round(area.width * fraction);
    var x = side === 'left' ? area.x : area.x + area.width - width;

    win.setMaximize(false, false);
    win.frameGeometry = {x: x, y: area.y, width: width, height: area.height};
    win.setMaximize(true, false);
}

registerShortcut('KdeRectangleLeft', 'KDE Rectangle: Cycle left', 'Meta+Left', function () {
    cycle('left');
});
registerShortcut('KdeRectangleRight', 'KDE Rectangle: Cycle right', 'Meta+Right', function () {
    cycle('right');
});
