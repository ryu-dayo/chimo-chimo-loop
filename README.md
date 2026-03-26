# chimo-chimo-loop

[![License](https://img.shields.io/github/license/ryu-dayo/chimo-chimo-loop?style=flat-square)](LICENSE)
[![GreasyFork Installs](https://img.shields.io/greasyfork/dt/556184?label=Installs&style=flat-square)](https://greasyfork.org/zh-CN/scripts/556184-chimo-chimo-loop)
[![GitHub stars](https://img.shields.io/github/stars/ryu-dayo/chimo-chimo-loop?style=flat-square)](https://github.com/ryu-dayo/chimo-chimo-loop/stargazers)

A lightweight userscript that adds a surgical-grade floating control bar with PiP, A-B Loop, Speed control, and Media Statistics to HTML5 videos.

> Primarily tested on **Safari for macOS**.
> Also compatible with Chromium browsers (e.g., Edge), though functionality and visual performance may vary on some sites.

## Features

- 🌠 **Picture-in-Picture**: One-click toggle for floating video mode.
- 🔁 **Advanced Loop**: Supports both Full Loop and A-B Repeat.
- ⚡️ **Speed Control**: Quickly adjust playback speed.
- 📸 **Lossless Screenshot**: One-click to capture 1:1 PNG frames without UI overlay.
- 📊 **Media Stats**: Real-time FPS, resolution, and color space tracking.
- 👻 **Auto-hide**: Fades out after 3 seconds of inactivity.

## User Guide

| Icon | Action | Description |
| :---: | :--- | :--- |
| 🔳 | **PiP** | Toggle Picture-in-Picture mode. |
| 🔁 | **Loop / Set A** | Enable Full Loop and **automatically set Point A** at the current time. |
| 🅱️ | **Set Point B** | (Appears after looping) Click to lock the **A-B range** and start looping. |
| 📸 | **Screenshot** | Save the current frame as a high-quality PNG. |
| ⏩ | **More / Speed** | Expand the menu for playback speed and media statistics. |

> **💡 Tip:** Use **A-B Loop** with **0.5x Speed** to master difficult guitar solos or dance moves easily.

## Compatibility

- **Universal Support**: Works on most pages that use standard HTML5 `<video>` elements.
- **Feature Priority**: If the website already provides equivalent native functionality, it is recommended to use the site's built-in controls for the best experience.
- **Behavioral Notes**: Some platforms use custom playback logic, which may occasionally cause the script's state to differ from the actual site behavior.

## Installation

**[🚀 Install via GreasyFork](https://greasyfork.org/zh-CN/scripts/556184-chimo-chimo-loop)**

---

> *"See you in the next loop."*