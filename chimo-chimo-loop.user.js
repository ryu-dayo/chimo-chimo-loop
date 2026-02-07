// ==UserScript==
// @name         chimo-chimo-loop
// @name:zh-CN   chimo-chimo-loop
// @namespace    https://github.com/ryu-dayo/chimo-chimo-loop
// @version      1.1.0
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
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const ICONS = {
        enterPip: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 82"><path d="M12.5 63.3h55.7q12.6 0 12.5-12.3V12.3Q80.7 0 68.2 0H12.5Q0 0 0 12.3V51q0 12.3 12.5 12.3M7 50.6v-38Q7.1 7 12.5 7h55.6q5.4.1 5.5 5.6v38q-.1 5.6-5.5 5.6H12.5q-5.4 0-5.5-5.6"/><path d="M31 16.8c-.2-1.2-1.8-2.6-3.4-1L23.4 20l-5.8-6c-1-1-2.8-1-3.8 0s-1 2.7 0 3.8l5.9 5.8-4.1 4.2c-1.7 1.6-.3 3.2 1 3.4l14 2.1q1 .1 2-.6.6-.8.5-1.8zm19.5 64.8h37.2q12.4 0 12.4-12.2V44.8q0-12.3-12.4-12.3H50.5Q38 32.5 38 44.8v24.6q0 12.3 12.5 12.2"/></svg>`,
        exitPip: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 82"><path d="M12.5 63.3h55.7q12.6 0 12.5-12.3V12.3Q80.7 0 68.2 0H12.5Q0 0 0 12.3V51q0 12.3 12.5 12.3M7 50.6v-38Q7.1 7 12.5 7h55.6q5.4.1 5.5 5.6v38q-.1 5.6-5.5 5.6H12.5q-5.4 0-5.5-5.6"/><path d="M15.1 29.9c.2 1.2 1.8 2.6 3.4 1l4.2-4.1 5.9 5.8c1 1 2.7 1 3.7 0s1-2.7 0-3.7l-5.8-6 4-4.1c1.7-1.6.3-3.2-1-3.4l-14-2q-1.2-.3-1.9.5t-.6 1.9zm35.4 51.7h37.2q12.4 0 12.4-12.2V44.8q0-12.3-12.4-12.3H50.5Q38 32.5 38 44.8v24.6q0 12.3 12.5 12.2"/></svg>`,
        enableLoop: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 66"><path d="M28.2 65.9h42.5c17 0 28.1-11 28.1-28.2 0-17-11.1-28.2-28.1-28.2h-8.4a3.5 3.5 0 0 0 0 7h8.4c12.6 0 21.1 8.6 21.1 21.2s-8.5 21.1-21.1 21.1H28.2C15.5 58.8 7 50.3 7 37.8 7 25 15.5 16.5 28.2 16.5h5.1a19 19 0 0 1 0-7l-5.1-.1C11 9.3 0 20.7 0 37.7 0 54.8 11 66 28.2 66"/><path d="M51.4 25.4a12.7 12.7 0 1 0 0-25.4 12.7 12.7 0 0 0 0 25.4m0-6.8a6 6 0 0 1-5.9-5.9c0-3.3 2.6-5.9 5.9-5.9s5.9 2.6 5.9 5.9-2.6 5.9-6 5.9"/></svg>`,
        disableLoop: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 66"><path d="M28.2 65.9h42.5c17 0 28.1-11 28.1-28.2 0-17-11.1-28.2-28.1-28.2h-8.4a3.5 3.5 0 0 0 0 7h8.4c12.6 0 21.1 8.6 21.1 21.2s-8.5 21.1-21.1 21.1H28.2C15.5 58.8 7 50.3 7 37.8 7 25 15.5 16.5 28.2 16.5h5.1a19 19 0 0 1 0-7l-5.1-.1C11 9.3 0 20.7 0 37.7 0 54.8 11 66 28.2 66"/><path d="M51.4 25.4a12.7 12.7 0 1 0 0-25.4 12.7 12.7 0 0 0 0 25.4"/></svg>`,
        more: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 69"><path d="M38.2 68.2q1.8 0 2.9-1.3l30.1-30q1.3-1.2 1.3-2.8a4 4 0 0 0-1.3-2.9l-30.1-30A4 4 0 0 0 38.2 0a4 4 0 0 0-4 4q0 1.7 1.2 3l29.5 29.3v-4.5L35.4 61.2q-1.1 1.2-1.2 3a4 4 0 0 0 4 4"/><path d="M4 68.2q1.8 0 2.9-1.3L37 37q1.1-1.2 1.2-2.8a4 4 0 0 0-1.2-2.9L6.9 1.2A4 4 0 0 0 4 0a4 4 0 0 0-4 4q0 1.7 1.2 3l29.5 29.3v-4.5L1.2 61.2Q0 62.4 0 64.2a4 4 0 0 0 4 4"/></svg>`,
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
            colorProfile: 'Color'
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
            colorProfile: '色彩'
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
            gap: 6px;
            padding: 6px;
            pointer-events: auto;
            transition: opacity 0.1s linear;
        }

        .ccl-controls.hidden { opacity: 0; }

        .ccl-bar {
            display: inline-flex;
            height: 31px;
            flex-shrink: 0;
            border-radius: 24px;
            background-color: rgba(0, 0, 0, 0.55);
            -webkit-backdrop-filter: saturate(180%) blur(17.5px);
            backdrop-filter: saturate(180%) blur(17.5px);
        }

        .ccl-control-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            padding: 0;
            cursor: pointer;
            background: transparent !important;
            transition: opacity 0.1s linear;
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

        .ccl-btn-container {
            display: flex;
            gap: 16px;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
        }

        .ccl-menu {
            top: 6px; left: 160px;
            position: absolute;
            display: none;
            transition: opacity 0.2s ease;
            border-radius: 8px;
            cursor: default;
            pointer-events: auto;
            white-space: nowrap;
        }

        .ccl-menu.visible { display: flex; }
        .ccl-menu.visible::before {
            content: '';
            position: fixed;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
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
        if (click) e.addEventListener('click', (ev) => {
            ev.stopPropagation();
            click(ev);
        });
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
        constructor() {
            super('ccl-icon-loop', () => { this.video.loop = !this.video.loop; this.update(); });
            this.observer = null;
        }

        setVideo(v) {
            super.setVideo(v);

            if (this.observer) this.observer.disconnect();
            this.observer = new MutationObserver(() => this.update());
            this.observer.observe(v, { attributes: true, attributeFilter: ['loop'] });
        }

        update() { this.icon.dataset.active = this.video.loop; }
    }

    class MoreControl extends BaseControl {
        constructor(onToggle) {
            super('ccl-icon-more', () => onToggle());
        }
    }

    class ControlsBar {
        constructor(onMenuToggle) {
            this.pipControl = new PipControl();
            this.loopControl = new LoopControl();
            this.moreControl = new MoreControl(() => onMenuToggle());

            this.controls = [this.pipControl, this.loopControl, this.moreControl];
            
            const container = el('div', 'ccl-btn-container')
            this.controls.forEach(c => container.appendChild(c.el));

            this.el = el('div', 'ccl-bar hidden');
            this.el.appendChild(container);
        }

        setVideo(video) { this.controls.forEach(c => c.setVideo(video)); }
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
        setVideo(v) { this.video = v; }
    }

    class StatsContainer {
        constructor() {
            this.video = null;
            this.el = el('div', 'ccl-stats-container');
            this.table = el('table');
            this.el.appendChild(this.table);
        }

        update() {
            const getSourceType = () => {
                const src = this.video.src;
                if (src.startsWith('blob:')) return 'Media Source';
                if (src.includes('m3u8')) return 'HLS';
                return 'File';
            };

            const data = {
                [t('sourceType')]: getSourceType(),
                [t('viewport')]: `${this.video.clientWidth}×${this.video.clientHeight} (${window.devicePixelRatio}x)`,
                [t('resolution')]: `${this.video.videoWidth}×${this.video.videoHeight}`
            };

            this.table.textContent = '';
            const addRow = (k, v) => {
                const r = el('tr');
                r.appendChild(el('th', '', k));
                r.appendChild(el('td', '', v));
                this.table.appendChild(r);
            };

            for (const [key, val] of Object.entries(data)) { addRow(key, val); }
        }

        show() { this.el.classList.add('visible'); this.update(); }
        hide() { this.el.classList.remove('visible'); }
        toggle() { this.el.classList.contains('visible') ? this.hide() : this.show(); }
        get visible() { return this.el.classList.contains('visible'); }

        setVideo(v) { this.video = v; }
    }

    class UIManager {
        constructor() {
            const style = document.createElement('style');
            style.textContent = STYLE;
            document.head.appendChild(style);

            this.controlsBar = new ControlsBar(() => {
                this.updateMenuPosition();
                this.menu.toggle();
            });
            this.menu = new Menu(() => this.stats.toggle(), () => this.stats.visible);
            this.stats = new StatsContainer();

            this.video = null;
            this.components = [this.controlsBar, this.menu, this.stats];

            const mediaControls = el('div', 'ccl-controls');
            mediaControls.append(this.controlsBar.el);

            this.container = el('div', 'ccl-controls-container');
            this.container.append(mediaControls, this.menu.el, this.stats.el);
            document.body.appendChild(this.container);
        }

        updateMenuPosition() {
            const barWidth = this.controlsBar.el.offsetWidth;
            const leftPos = 6 + barWidth + 16;
            this.menu.el.style.left = `${leftPos}px`;
        }

        attach(video) {
            this.video = video;
            this.components.forEach(c => c.setVideo(video));

            this.stats.hide();
            this.menu.hide();

        }

        detach() {
            this.video = null;
            this.hide();
            
            this.stats.hide();
            this.menu.hide();
        }

        reposition(rect) {
            if (!rect) return;
            this.container.style.top = rect.top + 'px';
            this.container.style.left = rect.left + 'px';
            this.container.style.width = rect.width + 'px';
            this.container.style.height = rect.height + 'px';
        }

        show() { this.container.querySelector('.ccl-controls').classList.remove('hidden'); }
        hide() { this.container.querySelector('.ccl-controls').classList.add('hidden'); }
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
