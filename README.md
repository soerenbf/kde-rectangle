# KDE Rectangle

KWin 6 script providing Rectangle-style width cycling:

- `Meta+Left`: left-aligned 1/2 → 2/3 → 1/3
- `Meta+Right`: right-aligned 1/2 → 2/3 → 1/3
- `Meta+Down`: centered 1/2 → 2/3 → 1/3

## Install

```sh
chmod +x install.sh
./install.sh
```

Installer enables script automatically. Log out and back in if KWin cannot reload it immediately. Disable KDE's existing `Meta+Left` and `Meta+Right` shortcuts if they conflict.

Inspired by [kde-float](https://github.com/bamdadfr/kde-float).

## Test

```sh
node test.js
```
