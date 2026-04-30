# ImageFocus

[![Mozilla Add-ons](https://img.shields.io/badge/Firefox-Add--on-FF7139?logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/de/firefox/addon/imagefocus/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.6-brightgreen)](https://github.com/rezzi/imagefocus/releases)

I was tired of having to right-click on an image and select “Open image in new tab” every time I wanted to take a closer look at it. So I sat down and developed this little extension.

Double-click any image on any webpage → clean dark overlay. Scroll to zoom, drag to pan, ESC to close. That's it.

---

## Features

- Double-click an image to isolate it in a fullscreen lightbox
- Alt+Click works on linked or nested images (where double-click can't reach)
- Zoom anchors to your cursor position, up to 10×
- Click and drag to pan when zoomed in
- Scale the isolated image to full window size or enter the native browser fullscreen (or both!) via two buttons
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
| ESC or double-click | Close |

---

## Known issues

Some sites (t-online.de for example) wrap images in complex grid layouts where clicks don't land on the `<img>` element directly. Small thumbnails in those layouts may not respond to Alt+Click. Haven't found a clean fix for that yet.

---

## Changelog

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

MIT © [Rezzi](https://github.com/Reaaaaa)

---

---

# ImageFocus

Ich war es leid, jedes Mal Rechtsklick → „Bild in neuem Tab öffnen" machen zu müssen wenn ich ein Bild genauer anschauen wollte. Also hab ich mich mal hingesetzt und heraus kam diese kleine Erweiterung.

Doppelklick auf ein beliebiges Bild → sauberes dunkles Overlay. Scrollen zum Zoomen, Ziehen zum Verschieben, ESC zum Schließen.

---

## Features

- Doppelklick auf ein Bild öffnet es in einem Vollbild-Overlay
- Alt+Klick funktioniert auch bei verlinkten oder verschachtelten Bildern
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
| ESC oder Doppelklick | Schließen |

---

## Bekannte Einschränkungen

Manche Seiten (z.B. t-online.de) nutzen so verschachtelte Grid-Layouts dass Klicks das `<img>`-Element gar nicht direkt erreichen. Kleine Vorschaubilder in solchen Layouts reagieren manchmal nicht auf Alt+Klick. Habe dafür noch keine saubere Lösung gefunden.

---

## Lizenz

MIT © [Rezzi](https://github.com/Reaaaaa)
