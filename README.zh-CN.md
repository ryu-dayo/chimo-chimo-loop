# chimo-chimo-loop

一款轻量级的用户脚本，为 HTML5 视频新增悬浮控制条，提供画中画（PiP）与循环播放（Loop）快捷切换功能。

> 主要在 **macOS 的 Safari** 上测试  
> 也可在 Chromium 系浏览器（如 Edge）正常运行，但部分网站行为可能存在差异。

## 功能特点

- 🌠 一键启动画中画（Picture-in-Picture）
- 🔁 一键切换循环播放
- 🧊 自动注入、干净简洁的悬浮控制 UI
- 👻 无操作 3 秒后自动隐藏
- ⚡️ 轻巧、快速、零依赖

## 浏览器支持

已测试：

- 🧭 **Safari**（macOS）
- ⭕️ **Microsoft Edge**（macOS / Windows）

## 适配与测试网站

支持大多数使用原生 HTML5 `<video>` 元素的视频网站。

特别测试：

- [抖音](https://www.douyin.com/)
- [Instagram](https://www.instagram.com)
- [小红书](https://www.xiaohongshu.com)

> 部分网站使用自定义播放器或其自身循环/重播逻辑，  
> 这可能导致脚本的 Loop 状态与网站实际行为并不完全一致。

## 安装方法

1. 安装用户脚本管理器（比如 [Tampermonkey](https://www.tampermonkey.net/)）
2. 安装脚本 → [`chimo-chimo-loop.user.js`](https://raw.githubusercontent.com/ryu-dayo/chimo-chimo-loop/main/chimo-chimo-loop.user.js)

## 许可协议

MIT License © ryu-dayo
