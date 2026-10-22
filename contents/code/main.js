'use strict';

const FRACTIONS = [1 / 2, 2 / 3, 1 / 3];
const GAP = 0; // 10 to match the bottom = 20
const BOTTOM_GAP = 0; // 20 for bottom bar to stay floating

/** Return next width fraction, using current geometry as cycle state. */
function nextFraction(windowWidth, areaWidth) {
    let current = windowWidth / areaWidth;
    for (let i = 0; i < FRACTIONS.length; i++) {
        if (Math.abs(current - FRACTIONS[i]) < 0.02) {
            return FRACTIONS[(i + 1) % FRACTIONS.length];
        }
    }
    return FRACTIONS[0];
}

/** Resize active window to next fraction and anchor it to given side. */
function cycle(side) {
    let win = workspace.activeWindow;
    if (!win || !win.resizeable) {
        return;
    }

    let area = workspace.clientArea(KWin.MaximizeArea, win);
    let geometry = win.frameGeometry;
    let usableWidth = area.width - GAP * 3;
    let anchored = side === 'left'
        ? Math.abs(geometry.x - area.x - GAP) < 2
        : side === 'right'
            ? Math.abs(geometry.x + geometry.width - area.x - area.width + GAP) < 2
            : Math.abs(geometry.x + geometry.width / 2 - area.x - area.width / 2) < 2;
    let fraction = anchored ? nextFraction(geometry.width, usableWidth) : FRACTIONS[0];
    let width = Math.round(usableWidth * fraction);
    let x = side === 'left'
        ? area.x + GAP
        : side === 'right'
            ? area.x + area.width - GAP - width
            : area.x + Math.round((area.width - width) / 2);

    win.setMaximize(false, false);
    win.frameGeometry = {x: x, y: area.y + GAP, width: width, height: area.height - GAP - BOTTOM_GAP};
}

registerShortcut('KdeRectangleLeft', 'KDE Rectangle: Cycle left', 'Meta+Left', function () {
    cycle('left');
});
registerShortcut('KdeRectangleRight', 'KDE Rectangle: Cycle right', 'Meta+Right', function () {
    cycle('right');
});
registerShortcut('KdeRectangleCenter', 'KDE Rectangle: Cycle center', 'Meta+Down', function () {
    cycle('center');
});
