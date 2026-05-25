# chimo-chimo-loop

[![License](https://img.shields.io/github/license/ryu-dayo/chimo-chimo-loop?label=License&style=flat)](LICENSE)
[![GreasyFork Installs](https://img.shields.io/greasyfork/dt/556184?label=Installs&style=flat)](https://greasyfork.org/scripts/556184)
[![GitHub stars](https://img.shields.io/github/stars/ryu-dayo/chimo-chimo-loop?label=Stars&style=flat)](https://github.com/ryu-dayo/chimo-chimo-loop/stargazers)

*Read this in other languages: [日本語](README.ja.md), [简体中文](README.zh-CN.md)*

![chimo-chimo-loop showcase](./assets/hero.jpg)

A lightweight userscript that adds a surgical-grade floating control bar with PiP, A-B Loop, Speed control, and Media Statistics to HTML5 videos.

> Primarily tested on **Safari for macOS**. Also compatible with Chromium browsers (e.g., Edge).

## Features & Shortcuts

> 💡 **Modifier Key:** Use `Alt` on Windows and `Option (⌥)` on macOS.
> *Note: Shortcuts are intelligently disabled while typing in input fields or textareas.*

| Feature | Description | Shortcut |
| :--- | :--- | :--- |
| 🔳 **Picture-in-Picture** | Toggle floating video mode. | `⌥` + `P` |
| 🔁 **A-B Loop** | `L` to enable Full Loop (auto-sets Point A). <br>`B` to lock Point B and start A-B looping. | `⌥` + `L` / `B` |
| 📸 **Lossless Screenshot**| Capture a 1:1 original resolution PNG frame without UI overlay. | `⌥` + `S` |
| 🪞 **Spatial Control** | `M` to Mirror horizontally. <br>`R` to Rotate in 90° increments (with adaptive scaling). | `⌥` + `M` / `R` |
| ⏩ **Playback Speed** | `-` to decrease, `=` to increase speed (0.5x ~ 2.0x). <br>`0` to instantly reset to 1.0x. | `⌥` + `-` / `=` / `0` |
| ⏪ **Seek & Playback** | `Space` to Play/Pause video. <br>`←` / `→` to seek backward/forward by 5 seconds. | `⌥` + `Space` / `←` / `→` |
| 🔊 **Audio Control** | `↑` / `↓` to adjust volume by ±10%. <br>`U` to toggle Mute. | `⌥` + `↑` / `↓` / `U` |
| 📊 **Media Stats** | Toggle real-time FPS, resolution, and color space tracking. | `⌥` + `I` |
| 👻 **Auto-hide** | The UI elegantly fades out after 3 seconds of inactivity. | - |

> **💡 Pro Tip:** Combine **A-B Loop** with **0.5x Speed** to easily breakdown and master complex guitar fingerstyle mechanics (requiring both hands) or detailed dance choreography.

## Compatibility

- **Universal Support**: Works on most pages utilizing standard HTML5 `<video>` elements.
- **Feature Priority**: If a website already provides equivalent native functionality, using their built-in controls is recommended for the best experience.
- **Behavioral Notes**: Some platforms use custom playback logic, which may occasionally cause the script's visual state to differ slightly from actual site behavior.

## Installation

**[🚀 Install via GreasyFork](https://greasyfork.org/scripts/556184)**

---

> *"See you in the next loop."*