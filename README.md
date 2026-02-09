# chimo-chimo-loop

A lightweight userscript that adds a floating control bar with Picture-in-Picture (PiP), Loop, and Speed controls to HTML5 videos.

> Primarily tested on **Safari for macOS**.
> Also compatible with Chromium browsers (e.g., Edge), though functionality and visual performance may vary on some sites.

## Features

- 🌠 **Picture-in-Picture**: One-click toggle for floating video mode.
- 🔁 **Advanced Loop**: Supports both Full Loop and A-B Repeat.
- ⚡️ **Speed Control**: Quickly adjust playback speed.
- 🧊 **Minimalist UI**: Automatically injected overlay at the top-left corner.
- 👻 **Auto-hide**: Fades out after 3 seconds of inactivity.

## User Guide

| Icon | Action | Description |
| :---: | :--- | :--- |
| 🔳 | **PiP** | Toggle Picture-in-Picture mode. |
| 🔁 | **Loop / Set A** | Enable Full Loop and **automatically set Point A** at the current time. |
| 🅱️ | **Set Point B** | (Appears after looping) Click to lock the **A-B range** and start looping. |
| ❎ | **Exit Loop** | Clear A/B range and disable loop mode. |
| ⏩ | **More / Speed** | Expand the menu for playback speed and media statistics. |

> **💡 Tip:** To set up an A-B loop, simply click the "Loop" button once to mark the start point, then wait for the video to reach your desired end point and click the "🅱️" icon.

## Compatibility

- **Universal Support**: Works on most pages that use standard HTML5 `<video>` elements.
- **Feature Priority**: If the website already provides equivalent native functionality, it is recommended to use the site's built-in controls for the best experience.
- **Behavioral Notes**: Some platforms use custom playback logic, which may occasionally cause the script's state to differ from the actual site behavior.

## Installation

Install from [GreasyFork](https://greasyfork.org/zh-CN/scripts/556184-chimo-chimo-loop)

---

> *"See you in the next loop."*