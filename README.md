<div align="center">

<img src="icons/icon96.png" alt="ImageFocus Logo" width="96">

# ImageFocus

[![Mozilla Add-ons](https://img.shields.io/badge/Firefox-Add--on-FF7139?logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/de/firefox/addon/imagefocus/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.7-brightgreen)](https://github.com/rezzi/imagefocus/releases)

</div>

I got tired of right-clicking → "open image in new tab" every time I wanted to get a closer look at something. So I built this.

Double-click any image on any webpage → clean dark overlay. Scroll to zoom, drag to pan, ESC to close. That's it.

---

## Features

- Double-click an image to isolate it in a fullscreen lightbox
- Alt+Click works on linked or nested images (where double-click can't reach)
- Floating toolbar: fit image to window, quick download, and fullscreen toggle
- Zoom anchors to your cursor position, up to 10×
- Click and drag to pan when zoomed in
- Tooltip language follows your browser — German or English, everything else defaults to English
- No permissions for browsing data, no network requests, no tracking

---

## Shortcuts

| Action | Effect |
|---|---|
| Double-click image | Open overlay |
| Alt+Click image | Open overlay (linked/nested images) |
| Scroll | Zoom in/out |
| Click + drag | Pan |
| F | Toggle fullscreen |
| ESC | Exit fullscreen / Close overlay |
| Double-click | Close overlay |

---

## Installation

Grab it from [Firefox Add-ons](https://addons.mozilla.org/de/firefox/addon/imagefocus/) — or download the `.xpi` from [Releases](https://github.com/rezzi/imagefocus/releases) and install it manually via `about:addons` → gear icon → Install Add-on From File.

---

## Known issues

Some sites (t-online.de for example) wrap images in complex grid layouts where clicks don't land on the `<img>` element directly. Small thumbnails in those layouts may not respond to Alt+Click. Haven't found a clean fix for that yet.

---

## Changelog

**v1.0.7**
- Added quick download button to toolbar to easily save the inspected image.

**v1.0.6**
- Added floating control bar with "Fill window" and "Fullscreen" toggle buttons.
- Added keyboard shortcut `F` to toggle fullscreen mode.
- Improved ESC key behavior (exits fullscreen first if active).
- Redesigned hints and tooltips with a modern blurred pill aesthetic.
- Bumped minimum Firefox version to 142.0.

**v1.0.5**
- Tooltip now shows in German or English depending on browser language. Fallback to englisch for any other set browser language.

**v1.0.4**
- Changed hotkey from Ctrl to Alt+Click for linked/nested images to prevent the browser from openeing a new tab (Ctrl + click).
- Tooltip fully in English

**v1.0.3**
- Added Ctrl+Click for linked images (replaced by Alt+Click in v1.0.5)
- Updated icon and author name

**v1.0.2**
- Fixed: images inside links now open in overlay instead of following the link

**v1.0.1**
- Bumped minimum Firefox version to 140.0 to fix AMO manifest warnings

**v1.0.0**
- Initial release

---

## License

MIT © [Rezzi](https://github.com/rezzi)

---

---

<div align="center">

# ImageFocus

</div>

Ich war es leid, jedes Mal Rechtsklick → „Bild in neuem Tab öffnen" zu machen wenn ich ein Bild genauer anschauen wollte. Also hab ich das hier gebaut.

Doppelklick auf ein beliebiges Bild → sauberes dunkles Overlay. Scrollen zum Zoomen, Ziehen zum Verschieben, ESC zum Schließen.

---

## Features

- Doppelklick auf ein Bild öffnet es in einem Vollbild-Overlay
- Alt+Klick funktioniert auch bei verlinkten oder verschachtelten Bildern
- Schwebende Toolbar: Fenster ausfüllen, Bild direkt herunterladen und Vollbild-Modus
- Zoom zentriert auf die Mausposition, bis zu 10×
- Klicken und Ziehen zum Verschieben im gezoomten Zustand
- Tooltip-Sprache folgt dem Browser — Deutsch oder Englisch, alles andere fällt auf Englisch zurück
- Keine Berechtigungen für Browserdaten, keine Netzwerkanfragen, kein Tracking

---

## Tastenkürzel

| Aktion | Effekt |
|---|---|
| Doppelklick auf Bild | Overlay öffnen |
| Alt+Klick auf Bild | Overlay öffnen (verlinkte/verschachtelte Bilder) |
| Mausrad | Zoomen |
| Klicken + Ziehen | Verschieben |
| F | Vollbild umschalten |
| ESC | Vollbild beenden / Overlay schließen |
| Doppelklick | Overlay schließen |

---

## Installation

Direkt über [Firefox Add-ons](https://addons.mozilla.org/de/firefox/addon/imagefocus/) installieren — oder die `.xpi` aus den [Releases](https://github.com/rezzi/imagefocus/releases) herunterladen und manuell via `about:addons` → ⚙️ → Add-on aus Datei installieren.

---

## Bekannte Einschränkungen

Manche Seiten (z.B. t-online.de) nutzen so verschachtelte Grid-Layouts dass Klicks das `<img>`-Element gar nicht direkt erreichen. Kleine Vorschaubilder in solchen Layouts reagieren manchmal nicht auf Alt+Klick. Hab da noch keine saubere Lösung gefunden.

---

## Changelog

**v1.0.7**
- Schneller Download-Button in der Toolbar zum direkten Speichern des angezeigten Bildes hinzugefügt.

**v1.0.6**
- Schwebende Toolbar mit Buttons für „Fenster ausfüllen“ und „Vollbild“ hinzugefügt.
- Tastenkürzel `F` für Vollbildmodus hinzugefügt.
- ESC-Verhalten verbessert (beendet zuerst den Vollbildmodus, falls aktiv).
- Modernes Pill-Design mit Hintergrundunschärfe für Hinweise und Tooltips.
- Minimale Firefox-Version auf 142.0 angehoben.

**v1.0.5**
- Tooltip folgt nun der Browsersprache (Deutsch/Englisch mit englischem Fallback).

**v1.0.4**
- Tastenkürzel von Strg auf Alt+Klick für verlinkte/verschachtelte Bilder geändert, um das Öffnen von neuen Browser-Tabs zu verhindern.
- Tooltips vollständig auf Englisch standardisiert.

**v1.0.3**
- Strg+Klick für verlinkte Bilder hinzugefügt (später durch Alt+Klick ersetzt).
- Icon und Autorenname aktualisiert.

**v1.0.2**
- Fehler behoben: Bilder in Hyperlinks öffnen sich im Overlay statt dem Link zu folgen.

**v1.0.1**
- Minimale Firefox-Version auf 140.0 gesetzt (Fix für AMO Manifest-Warnungen).

**v1.0.0**
- Initiales Release.

---

## Lizenz

MIT © [Rezzi](https://github.com/rezzi)
