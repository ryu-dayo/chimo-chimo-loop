// ==UserScript==
// @name         chimo-chimo-loop
// @name:zh-CN   chimo-chimo-loop
// @namespace    https://github.com/ryu-dayo/chimo-chimo-loop
// @version      1.3.0
// @description  Adds PiP, loop, and speed controls to HTML5 videos.
// @description:zh-CN  为 HTML5 视频播放器添加画中画（PiP）、循环播放和倍速控制按钮。
// @author       ryu-dayo
// @match        https://www.douyin.com/*
// @match        https://www.instagram.com/*
// @match        https://www.threads.com/*
// @match        https://www.xiaohongshu.com/*
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    const ICONS = {
        enterPip: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 82"><path d="M12.5 63.3h55.7q12.6 0 12.5-12.3V12.3Q80.7 0 68.2 0H12.5Q0 0 0 12.3V51q0 12.3 12.5 12.3M7 50.6v-38Q7.1 7 12.5 7h55.6q5.4.1 5.5 5.6v38q-.1 5.6-5.5 5.6H12.5q-5.4 0-5.5-5.6"/><path d="M31 16.8c-.2-1.2-1.8-2.6-3.4-1L23.4 20l-5.8-6c-1-1-2.8-1-3.8 0s-1 2.7 0 3.8l5.9 5.8-4.1 4.2c-1.7 1.6-.3 3.2 1 3.4l14 2.1q1 .1 2-.6.6-.8.5-1.8zm19.5 64.8h37.2q12.4 0 12.4-12.2V44.8q0-12.3-12.4-12.3H50.5Q38 32.5 38 44.8v24.6q0 12.3 12.5 12.2"/></svg>`,
        exitPip: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 82"><path d="M12.5 63.3h55.7q12.6 0 12.5-12.3V12.3Q80.7 0 68.2 0H12.5Q0 0 0 12.3V51q0 12.3 12.5 12.3M7 50.6v-38Q7.1 7 12.5 7h55.6q5.4.1 5.5 5.6v38q-.1 5.6-5.5 5.6H12.5q-5.4 0-5.5-5.6"/><path d="M15.1 29.9c.2 1.2 1.8 2.6 3.4 1l4.2-4.1 5.9 5.8c1 1 2.7 1 3.7 0s1-2.7 0-3.7l-5.8-6 4-4.1c1.7-1.6.3-3.2-1-3.4l-14-2q-1.2-.3-1.9.5t-.6 1.9zm35.4 51.7h37.2q12.4 0 12.4-12.2V44.8q0-12.3-12.4-12.3H50.5Q38 32.5 38 44.8v24.6q0 12.3 12.5 12.2"/></svg>`,
        enableLoop: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 70"><path  d="M34.9 66.6V41.9q0-2.6-2.8-2.6-1.1 0-2.1.8L15.4 52.4c-1.2 1-1.3 2.6 0 3.8L30 68.5q1 .7 2.1.7 2.7 0 2.8-2.6m45.3-33.5c-2 0-3.5 1.5-3.5 3.6v3.7c0 6.2-4.6 10.5-11.2 10.5H29.2c-2 0-3.6 1.6-3.6 3.5 0 2 1.6 3.6 3.6 3.6h35.6c11.6 0 19-6.7 19-17v-4.3c0-2-1.5-3.6-3.6-3.6M49 2.6v24.7q0 2.6 2.7 2.6 1.1 0 2.1-.7l14.6-12.3c1.3-1 1.4-2.7 0-3.8L53.8.8q-1-.8-2.1-.8Q49 .1 49 2.6M3.6 36.2c2 0 3.6-1.6 3.6-3.6v-3.7c0-6.3 4.5-10.5 11-10.5h36.4a3.5 3.5 0 0 0 0-7.1H19c-11.6 0-19 6.6-19 17v4.3c0 2 1.6 3.6 3.6 3.6"/></svg>`,
        disableLoop: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107 83"><path d="M3.6 49c2 0 3.6-1.5 3.6-3.5v-3.8c0-6.2 4.5-10.5 11-10.5h21c2 0 3.6-1.6 3.6-3.5 0-2-1.6-3.5-3.6-3.5H19c-11.6 0-19 6.6-19 17v4.3c0 2 1.6 3.6 3.6 3.6m30-33.5v24.7q0 2.6 2.7 2.6 1.1 0 2-.8L53 29.8c1.2-1 1.3-2.7 0-3.8L38.4 13.7q-1-.8-2.1-.8-2.7.1-2.8 2.6M80.1 46c-2 0-3.5 1.6-3.5 3.7v3.7c0 6.2-4.6 10.5-11.2 10.5H29.2c-2 0-3.6 1.6-3.6 3.5 0 2 1.6 3.5 3.6 3.5h35.6c11.6 0 19-6.6 19-17v-4.2c0-2-1.5-3.7-3.6-3.7M35 79.5V54.8q0-2.6-2.8-2.6-1.1 0-2.1.8L15.4 65.3c-1.2 1-1.3 2.6 0 3.7L30 81.3q1 .8 2.1.8 2.7 0 2.8-2.6"/><path d="M80.7 0c14 0 25.5 11.4 25.5 25.4a25.7 25.7 0 0 1-25.5 25.4 25.4 25.4 0 0 1 0-50.8m0 5.7C70 5.7 61 14.6 61 25.4S70 45 80.7 45a20 20 0 0 0 19.7-19.7c0-10.8-8.8-19.7-19.7-19.7"/><path d="M75.5 34.5c-1 1.1-2.7.9-3.7-.2-1-1-1.2-2.6-.2-3.7l5.4-5.4-4.9-5c-1-1-1-2.5 0-3.5s2.6-1 3.5 0l5 5 5.4-5.4c1.1-1.1 2.7-1 3.7.1 1 1 1.3 2.6.1 3.7l-5.3 5.4 4.9 5c1 1 1 2.6 0 3.5-1 1-2.6 1-3.6 0l-5-4.9z"/></svg>`,
        more: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 69"><path d="M38.2 68.2q1.8 0 2.9-1.3l30.1-30q1.3-1.2 1.3-2.8a4 4 0 0 0-1.3-2.9l-30.1-30A4 4 0 0 0 38.2 0a4 4 0 0 0-4 4q0 1.7 1.2 3l29.5 29.3v-4.5L35.4 61.2q-1.1 1.2-1.2 3a4 4 0 0 0 4 4"/><path d="M4 68.2q1.8 0 2.9-1.3L37 37q1.1-1.2 1.2-2.8a4 4 0 0 0-1.2-2.9L6.9 1.2A4 4 0 0 0 4 0a4 4 0 0 0-4 4q0 1.7 1.2 3l29.5 29.3v-4.5L1.2 61.2Q0 62.4 0 64.2a4 4 0 0 0 4 4"/></svg>`,
        setPointB: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M12.5 71.2h46.2Q71 71.2 71 58.9V12.3Q71.2 0 58.7 0H12.5Q0 0 0 12.3v46.6q0 12.3 12.5 12.3m0-7q-5.4 0-5.5-5.7V12.6q.1-5.5 5.5-5.5h46q5.5 0 5.6 5.5v46Q64 64 58.6 64z"/><path d="M26.7 52.7h11c8.1 0 13.4-4 13.4-10 0-4.6-3.2-7.9-8.4-8.5v-.3c4-1 6.3-3.9 6.3-7.7 0-5.3-4.3-8.7-11-8.7H26.6q-3.9 0-4 4v27.3q.1 3.7 4 3.9m2.8-20.5v-9.6h7c3.6 0 5.9 1.8 5.9 4.7q0 5-7.9 5zm0 15.5V36.9H37q7 .1 7.2 5.5.1 5.4-9 5.3z"/></svg>`,
        screenshot: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 74"><path d="M80.2 30a4.9 4.9 0 0 1 0-9.7 4.9 4.9 0 0 1 0 9.8M12.5 73.8h70q12.4 0 12.4-12.3v-40Q95 9.3 82.5 9.3H71.7c-3 0-4-.7-5.6-2.5l-3-3.4c-1.9-2-4-3.3-8-3.3H39.8c-4 0-6.1 1.3-8 3.3l-3 3.4c-1.6 1.8-2.6 2.5-5.5 2.5H12.5Q0 9.2 0 21.5v40q0 12.2 12.5 12.2m35-11.7a20.7 20.7 0 0 1-20.8-20.8 20.7 20.7 0 1 1 41.5 0C68.2 52.8 59 62 47.5 62m0-6.6a14.2 14.2 0 1 0-14.3-14.2c0 8 6.4 14.2 14.3 14.2"/></svg>`
    };

    const LOCALE = {
        'en': {
            playbackSpeed: 'Playback Speed',
            speedUnit: '×',
            statsLabel: 'Show Media Statistics',
            sourceType: 'Source',
            viewport: 'Viewport',
            frameInfo: 'Frames',
            resolution: 'Resolution',
            codecInfo: 'Codecs',
            colorProfile: 'Color',
            screenshotError: 'Screenshot failed due to CORS restrictions.',
            file: 'File',
            mediaSource: 'Media Source',

        },
        'zh-CN': {
            playbackSpeed: '播放速度',
            speedUnit: '倍',
            statsLabel: '显示媒体统计数据',
            sourceType: '来源',
            viewport: '视口',
            frameInfo: '帧',
            resolution: '分辨率',
            codecInfo: '编解码器',
            colorProfile: '色彩',
            screenshotError: '由于跨域限制 (CORS)，截图失败。',
            file: '文件',
            mediaSource: '媒体源',
        },
    };

    const t = (k) => (LOCALE[navigator.language] || LOCALE[navigator.language.split('-')[0]] || LOCALE.en)[k] || k;

    const STYLE = `
        .ccl-controls-container, .ccl-controls-container * {
            font-size: 12px;
            line-height: 16px;
            font-family: sans-serif;
            font-weight: bold;
            color: white;
        }
            
        .ccl-controls-container {
            position: fixed;
            z-index: 999;
            pointer-events: none;
            will-change: top, left, width, height;
        }

        .ccl-controls {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 16px;
            padding: 6px;
            pointer-events: none;
        }
        .ccl-controls.hidden { display: none; }

        .ccl-bar {
            display: inline-flex;
            height: 31px;
            flex-shrink: 0;
            border-radius: 24px;
            background-color: rgba(0, 0, 0, 0.55);
            -webkit-backdrop-filter: saturate(180%) blur(17.5px);
            backdrop-filter: saturate(180%) blur(17.5px);
            pointer-events: auto;
        }

        .ccl-control-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            padding: 0;
            cursor: pointer;
            background: transparent !important;
        }
        .ccl-control-btn:active { transform: scale(0.89); }

        .ccl-icon {
            width: 16px;
            height: 12px;
            background-color: white;
            mix-blend-mode: plus-lighter;
            -webkit-mask: var(--icon) no-repeat center / contain;
            mask: var(--icon) no-repeat center / contain;
            transition: transform 150ms;
            pointer-events: none;
        }

        .ccl-icon-pip { --icon: url('${ICONS.enterPip}'); }
        .ccl-icon-pip[data-active="true"] { --icon: url('${ICONS.exitPip}'); }
        .ccl-icon-loop { --icon: url('${ICONS.enableLoop}'); }
        .ccl-icon-loop[data-active="true"] { --icon: url('${ICONS.disableLoop}'); }
        .ccl-icon-more { --icon: url('${ICONS.more}'); }
        .ccl-icon-ab { --icon: url('${ICONS.setPointB}'); }
        .ccl-icon-screenshot { --icon: url('${ICONS.screenshot}'); }

        .ccl-btn-container {
            display: flex;
            gap: 16px;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
        }

        .ccl-menu {
            position: relative;
            display: none;
            border-radius: 8px;
            cursor: default;
            pointer-events: auto;
            white-space: nowrap;
        }

        .ccl-menu.visible { display: flex; }
        .ccl-menu.visible::before {
            content: '';
            position: fixed;
            inset: 0;
            background: transparent;
            pointer-events: auto;
        }

        .ccl-menu-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            -webkit-backdrop-filter:saturate(180%) blur(17.5px);
            backdrop-filter: saturate(180%) blur(17.5px);
            border-radius: 8px;
        }

        .ccl-menu-container {
            position: relative;
            padding: 4px 8px;
        }

        .ccl-menu-head {
            color: rgba(255, 255, 255, 0.2);
            padding: 4px 8px;
            pointer-events: none;
            white-space: nowrap;
        }

        .ccl-menu-hr {
            border: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.2); 
            margin: 4px 8px;
            background: transparent;
        }

        .ccl-menu-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s;
            pointer-events: auto;
            white-space: nowrap;
        }
        .ccl-menu-item:hover { background: rgba(255, 255, 255, 0.2) !important; }

        .ccl-menu-item::before {
            content: '✔';
            visibility: hidden;
            color: white;
            font-weight: bold;
        }
        .ccl-menu-item.active::before { visibility: visible; }

        .ccl-menu-item-stats { justify-content: center; }
        .ccl-menu-item-stats::before { display: none; }
        .ccl-menu-item-stats.active { justify-content: flex-start; }

        .ccl-menu-item-stats.active::before {
            display: block;
            visibility: visible;
        }

        .ccl-stats-container {
            position: absolute;
            width: 100%; height: 100%;
            top: 0;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            display: none;
        }

        .ccl-stats-container.visible { display: flex; }

        .ccl-stats-container > table {
            padding: 4px;
            background-color: rgba(64, 64, 64, 0.6);
            border-radius: 6px;
            -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
        }

        .ccl-stats-container th {
            padding-inline-end: 6px;
            text-align: end;
        }
    `;

    const el = (tag, className, text = '', click = null) => {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text) e.textContent = text;
        if (click) {
            e.addEventListener('click', (ev) => {
                ev.stopPropagation();
                click(ev);
            });
        }
        return e;
    }

    class BaseControl {
        constructor(iconClass, onClick) {
            this.video = null;
            this.el = el('button', 'ccl-control-btn', '', (e) => onClick(e));
            this.icon = el('picture', `ccl-icon ${iconClass}`);
            this.el.appendChild(this.icon);
        }

        setVideo(v) { this.video = v; this.update(); }
        update() { }
    }

    class PipControl extends BaseControl {
        constructor() {
            super('ccl-icon-pip', () => {
                if (typeof this.video.webkitSetPresentationMode === 'function') {
                    const mode = this.video.webkitPresentationMode;
                    this.video.webkitSetPresentationMode(mode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
                } else {
                    if (document.pictureInPictureElement === this.video) document.exitPictureInPicture();
                    else this.video.requestPictureInPicture();
                }
            });
        }

        setVideo(v) {
            this.video = v;

            if (!this.isPipSupport(v)) this.el.style.display = 'none';
            else { this.el.style.display = 'flex'; this.update(); }
        }

        isPipSupport(video) {
            const isStandard = document.pictureInPictureEnabled && !video.disablePictureInPicture;
            const isSafari = typeof video.webkitSetPresentationMode === 'function';
            return isStandard || isSafari;
        }

        update() {
            const active = document.pictureInPictureElement === this.video || this.video.webkitPresentationMode === 'picture-in-picture';
            this.icon.dataset.active = active;
        }
    }

    class LoopControl extends BaseControl {
        constructor(onLoopToggle) {
            super('ccl-icon-loop', () => {
                this.video.loop = !this.video.loop;
                this.update();
                this.onLoopToggle(this.video.loop, this.video);
            });
            this.observer = null;
            this.onLoopToggle = onLoopToggle;
        }

        setVideo(v) {
            super.setVideo(v);

            if (this.observer) this.observer.disconnect();
            this.observer = new MutationObserver(() => {
                this.update()
                this.onLoopToggle(this.video.loop, this.video);
            });
            this.observer.observe(v, { attributes: true, attributeFilter: ['loop'] });
        }

        update() { this.icon.dataset.active = this.video.loop; }
    }

    class ABControl extends BaseControl {
        constructor() {
            super('ccl-icon-ab', () => this.handleClick());
            this.el.style.display = 'none';

            this.startTime = null;
            this.endTime = null;

            this.loopHandlerBound = this.loopHandler.bind(this);
        }

        setVideo(v) {
            this.reset();
            super.setVideo(v);
        }

        setDirectA(time) {
            this.startTime = time;
            this.show();
        }

        handleClick() {
            if (!this.video) return;
            const now = this.video.currentTime;

            if (this.startTime) {
                if (now <= this.startTime) {
                    alert('Please select a future time to start the loop.');
                    return;
                }

                this.endTime = now;
                this.hide();

                this.video.addEventListener('timeupdate', this.loopHandlerBound);
                this.video.currentTime = this.startTime;
                this.video.play();
            }
        }

        loopHandler() {
            if (this.endTime && this.video.currentTime >= this.endTime) {
                this.video.currentTime = this.startTime;
            }
        }

        reset() {
            if (this.video) this.video.removeEventListener('timeupdate', this.loopHandlerBound);
            this.startTime = null;
            this.endTime = null;
            this.hide();
        }

        show() { this.el.style.display = 'flex'; }
        hide() { this.el.style.display = 'none'; }
    }

    class ScreenshotControl extends BaseControl {
        constructor() {
            super('ccl-icon-screenshot', () => this.handleScreenshot());
        }

        handleScreenshot() {
            if (!this.video) return;

            try {
                // Create a canvas with the original video resolution
                const canvas = document.createElement('canvas');
                canvas.width = this.video.videoWidth;
                canvas.height = this.video.videoHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);

                // Export to PNG format (lossless highest quality)
                const dataUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataUrl;

                // Generate file name
                const now = new Date();
                const yyyy = now.getFullYear();
                const MM = String(now.getMonth() + 1).padStart(2, '0');
                const dd = String(now.getDate()).padStart(2, '0');
                const hh = String(now.getHours()).padStart(2, '0');
                const mm = String(now.getMinutes()).padStart(2, '0');
                const ss = String(now.getSeconds()).padStart(2, '0');

                const timestamp = `${yyyy}${MM}${dd}_${hh}${mm}${ss}`;

                a.download = `chimo-chimo-loop_${timestamp}.png`;
                a.click();

            } catch (err) {
                // Fails if the video source is cross-origin without proper CORS headers
                console.error('[chimo-chimo-loop] Screenshot failed:', err);
                alert(t('screenshotError'));
            }
        }
    }

    class MoreControl extends BaseControl {
        constructor(onToggle) {
            super('ccl-icon-more', () => onToggle());
        }
    }

    class ControlsBar {
        constructor(onMenuToggle) {
            this.pipControl = new PipControl();
            this.loopControl = new LoopControl((isLooping, video) => {
                if (isLooping && video) this.abControl.setDirectA(video.currentTime);
                else this.abControl.reset();
            });
            this.abControl = new ABControl();
            this.screenshotControl = new ScreenshotControl();
            this.moreControl = new MoreControl(() => onMenuToggle());

            this.controls = [this.pipControl, this.loopControl, this.abControl, this.screenshotControl, this.moreControl];

            const container = el('div', 'ccl-btn-container')
            this.controls.forEach(c => container.appendChild(c.el));

            this.el = el('div', 'ccl-bar');
            this.el.appendChild(container);
        }

        setVideo(video) { this.controls.forEach(c => c.setVideo(video)); }
    }

    class MediaControls {
        constructor(onStatsToggle, onStatsVisible) {
            this.el = el('div', 'ccl-controls');
            this.controlsBar = new ControlsBar(() => this.menu.toggle());
            this.menu = new Menu(onStatsToggle, onStatsVisible);

            this.components = [this.controlsBar, this.menu];
            this.components.forEach(c => this.el.appendChild(c.el));
        }

        show() { this.el.classList.remove('hidden'); };
        hide() { this.el.classList.add('hidden'); };
        setVideo(video) { this.components.forEach(c => c.setVideo(video)); }
    }

    class Menu {
        constructor(onToggleStats, checkStatsState) {
            this.video = null;
            this.checkStatsState = checkStatsState;

            this.el = el('div', 'ccl-menu');
            this.container = el('div', 'ccl-menu-container');
            this.el.append(el('div', 'ccl-menu-bg'), this.container);

            this.container.appendChild(el('div', 'ccl-menu-head', t('playbackSpeed')));

            [0.5, 1, 1.25, 1.5, 2].forEach(r => {
                const item = el('div', 'ccl-menu-item', `${r} ${t('speedUnit')}`, () => {
                    if (this.video) this.video.playbackRate = r;
                    this.hide();
                });
                item.dataset.rate = r;
                this.container.appendChild(item);
            })

            this.container.appendChild(el('hr', 'ccl-menu-hr'));

            this.statsItem = el('div', 'ccl-menu-item ccl-menu-item-stats', t('statsLabel'), () => {
                onToggleStats();
                this.hide();
            })
            this.container.appendChild(this.statsItem);

            this.el.addEventListener('click', () => { if (this.visible) this.hide(); });
        }

        update() {
            if (!this.video) return;
            Array.from(this.container.children).forEach(item => {
                if (item.dataset.rate) {
                    const rate = parseFloat(item.dataset.rate);
                    item.classList.toggle('active', Math.abs(this.video.playbackRate - rate) < 0.01);
                }
            });

            if (this.checkStatsState) this.statsItem.classList.toggle('active', this.checkStatsState());
        }

        get visible() { return this.el.classList.contains('visible'); }
        show() { this.el.classList.add('visible'); this.update(); }
        hide() { this.el.classList.remove('visible'); }
        toggle() { this.visible ? this.hide() : this.show(); }
        setVideo(v) { this.video = v; this.hide(); }
    }

    class StatsContainer {
        constructor() {
            this.video = null;
            this.el = el('div', 'ccl-stats-container');
            this.table = el('table');
            this.el.appendChild(this.table);

            this.isTracking = false;
            this.updateInterval = null;
            this.lastTime = 0;

            this.currentFps = '0.0';
            this.cachedColorSpace = null;

            this.cells = {};
            this.initTableDOM();
        }

        getSourceType() {
            if (!this.video) return 'Unknown';

            const src = this.video.currentSrc || this.video.src || '';

            if (src.startsWith('blob:')) return t('mediaSource');
            if (src.toLowerCase().includes('m3u8')) return 'HLS';
            if (src.startsWith('http') || src.startsWith('/') || src.startsWith('data:')) return t('file');
            return 'Unknown';
        };

        getColorSpace() {
            if (this.cachedColorSpace) return this.cachedColorSpace;

            try {
                if (typeof VideoFrame === 'undefined') return 'Unsupported';
                const frame = new VideoFrame(this.video);
                const cs = frame.colorSpace;
                frame.close();

                if (cs) {
                    const primaries = cs.primaries || 'unknown';
                    const transfer = cs.transfer || 'unknown';
                    const matrix = cs.matrix || 'unknown';
                    this.cachedColorSpace = `${primaries} / ${transfer} / ${matrix}`;
                    return this.cachedColorSpace;
                }
            } catch (e) {
                return 'Unsupported';
            }
            return 'Unknown';
        }

        initTableDOM() {
            const addRow = (key, label) => {
                const r = el('tr');
                r.appendChild(el('th', '', label));
                const td = el('td', '', '');
                r.appendChild(td);
                this.table.appendChild(r);
                this.cells[key] = td;
            };

            addRow('source', t('sourceType'));
            addRow('viewport', t('viewport'));
            addRow('frameInfo', t('frameInfo'));
            addRow('resolution', t('resolution'));
            addRow('color', t('colorProfile'));
        }

        updateStaticUI() {
            if (!this.video) return;
            this.cells.source.textContent = this.getSourceType();
            this.cells.color.textContent = this.getColorSpace();
        }

        updateDynamicUI() {
            if (!this.video) return;
            this.cells.viewport.textContent = `${this.video.clientWidth}×${this.video.clientHeight} (${window.devicePixelRatio}x)`;
            this.cells.frameInfo.textContent = this.currentFps;
            this.cells.resolution.textContent = `${this.video.videoWidth}×${this.video.videoHeight}`;
        }

        startTracking() {
            this.stopTracking();
            if (!this.video) return;

            this.isTracking = true;
            let frameCount = 0;

            if ('requestVideoFrameCallback' in this.video) {
                const loop = () => {
                    if (!this.isTracking) return;
                    frameCount++;
                    this.video.requestVideoFrameCallback(loop);
                };
                this.video.requestVideoFrameCallback(loop);
            }

            this.lastTime = performance.now();
            this.updateInterval = setInterval(() => {
                const now = performance.now();
                const deltaMs = now - this.lastTime;

                if (deltaMs > 0) this.currentFps = (frameCount / (deltaMs / 1000)).toFixed(1);

                frameCount = 0;
                this.lastTime = now;

                this.updateDynamicUI();
            }, 500);
        }

        stopTracking() {
            this.isTracking = false;
            if (this.updateInterval) {
                clearInterval(this.updateInterval);
                this.updateInterval = null;
            }
        }

        show() {
            this.el.classList.add('visible');
            this.updateStaticUI();
            this.updateDynamicUI();
            this.startTracking();
        }

        hide() {
            this.el.classList.remove('visible');
            this.stopTracking();
        }

        toggle() { this.el.classList.contains('visible') ? this.hide() : this.show(); }
        get visible() { return this.el.classList.contains('visible'); }

        setVideo(v) {
            this.video = v;
            this.cachedColorSpace = null;
            this.currentFps = '0.0';
            this.hide();
        }
    }

    class UIManager {
        constructor() {
            const style = document.createElement('style');
            style.textContent = STYLE;
            document.head.appendChild(style);

            this.stats = new StatsContainer();
            this.mediaControls = new MediaControls(() => this.stats.toggle(), () => this.stats.visible);

            this.video = null;
            this.components = [this.mediaControls, this.stats];

            this.container = el('div', 'ccl-controls-container');
            this.components.forEach(c => this.container.appendChild(c.el));
            document.body.appendChild(this.container);
        }

        attach(video) {
            this.video = video;
            this.components.forEach(c => c.setVideo(video));
        }

        detach() {
            this.video = null;
            this.components.forEach(c => c.hide());
        }

        reposition(rect) {
            if (!rect) return;
            this.container.style.top = rect.top + 'px';
            this.container.style.left = rect.left + 'px';
            this.container.style.width = rect.width + 'px';
            this.container.style.height = rect.height + 'px';
        }

        show() { this.mediaControls.show(); }
        hide() { this.mediaControls.hide(); }
    }

    class App {
        constructor() {
            this.ui = new UIManager();
            this.activeVideo = null;
            this.videoRect = null;

            this.isPaused = false

            this.hideTimeout = null;
            this.isThrottled = false;
            this.pollingId = null;
            this.layoutObserver = null;

            this.setupEvents();
            this.scan();
        }

        setupEvents() {
            const onPlay = (e) => {
                if (e.target instanceof HTMLVideoElement) this.activate(e.target);
                this.isPaused = false;
                this.showAndTimer();
            };

            const onPause = () => {
                this.isPaused = true;
                this.showPersistent();
            };

            document.addEventListener('play', onPlay, true);
            document.addEventListener('pause', onPause, true);

            document.addEventListener('scroll', () => this.updateRectAndPosition(), { passive: true });
            window.addEventListener('resize', () => this.updateRectAndPosition(), { passive: true });

            document.addEventListener('enterpictureinpicture', () => this.ui.controlsBar.pipControl.update(), true);
            document.addEventListener('leavepictureinpicture', () => this.ui.controlsBar.pipControl.update(), true);
            document.addEventListener('webkitpresentationmodechanged', () => this.ui.controlsBar.pipControl.update(), true);

            window.addEventListener('pointermove', (e) => this.handleGlobalPointer(e), { passive: true });
        }

        showPersistent() {
            this.clearHideTimer();
            this.ui.show();
        }

        updateRectAndPosition() {
            if (!this.activeVideo) return;

            if (!this.activeVideo.isConnected) {
                this.detach();
                return;
            }

            this.videoRect = this.activeVideo.getBoundingClientRect();
            this.ui.reposition(this.videoRect);
        }

        activate(video) {
            if (!this.shouldSwitchVideo(video)) return;
            this.activeVideo = video;
            this.ui.attach(video);

            this.startPolling(500);

            this.observerCleanup();
            this.observeVideoLayout(video);
        }

        detach() {
            this.ui.detach();
            this.activeVideo = null;
            this.observerCleanup();
        }

        shouldSwitchVideo(newVideo) {
            const oldVideo = this.activeVideo;
            if (!oldVideo) return true;
            if (oldVideo === newVideo) return false;
            if (!oldVideo.isConnected) return true;

            const o = this.videoRect;
            const n = newVideo.getBoundingClientRect();

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dNew = Math.hypot(n.left + n.width / 2 - cx, n.top + n.height / 2 - cy);
            const dOld = Math.hypot(o.left + o.width / 2 - cx, o.top + o.height / 2 - cy);
            if (dNew < dOld) return true;

            if (!oldVideo.paused) {
                if (o.width * o.height > n.width * n.height) return false;
            }
            return true;
        }

        observeVideoLayout(video) {
            this.layoutObserver = new ResizeObserver(() => {
                if (!video.isConnected || video.style.display === 'none') {
                    this.ui.hide();
                    return;
                }

                if (this.activeVideo === video) {
                    this.updateRectAndPosition();
                }
            })
            this.layoutObserver.observe(video);
        }

        observerCleanup() {
            if (this.layoutObserver) {
                this.layoutObserver.disconnect();
                this.layoutObserver = null;
            }
        }

        scan() {
            const v = document.querySelector('video');
            if (v) this.activate(v);
        }

        handleGlobalPointer(e) {
            if (this.isThrottled) return;
            this.isThrottled = true;
            setTimeout(() => { this.isThrottled = false; }, 200);

            if (this.activeVideo && !this.activeVideo.isConnected) {
                this.detach();
                return;
            }
            if (!this.activeVideo || !this.videoRect || this.isPaused) return;

            const menu = this.ui.container.querySelector('.ccl-menu');
            if (menu.classList.contains('visible')) return;

            const rect = this.videoRect;
            const isOverVideo = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );
            const isOverControls = this.ui.container.contains(e.target);
            if (isOverVideo || isOverControls) {
                this.showAndTimer();
            } else {
                this.ui.hide();
            }
        }

        showAndTimer(timeout = 3000) {
            this.clearHideTimer();
            this.ui.show();

            this.hideTimeout = setTimeout(() => {
                const menu = this.ui.container.querySelector('.ccl-menu');
                if (menu.classList.contains('visible')) return;
                this.ui.hide();
            }, timeout);
        }

        clearHideTimer() {
            if (!this.hideTimeout) return;
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        startPolling(duration) {
            this.stopPolling();
            const startTime = performance.now();

            const poll = (now) => {
                this.updateRectAndPosition();
                if (now - startTime < duration) {
                    this.pollingId = requestAnimationFrame(poll);
                }
            };
            this.pollingId = requestAnimationFrame(poll);
        }

        stopPolling() {
            if (!this.pollingId) return;
            cancelAnimationFrame(this.pollingId);
            this.pollingId = null;
        }
    }

    new App();
})();
