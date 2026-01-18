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
        stats: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79 79"><path d="M39.4 78.8a39.4 39.4 0 1 0 0-78.8 39.4 39.4 0 0 0 0 78.8m0-7.4a32 32 0 1 1 0-63.9 32 32 0 0 1 0 63.9"/><path d="M32.8 61h15.5a3 3 0 0 0 3.2-3 3 3 0 0 0-3.2-3H44V36.6q0-3.8-3.3-4h-7.2a3 3 0 1 0 0 6.1h3.6V55h-4.3a3 3 0 0 0-3.2 3 3 3 0 0 0 3.2 3.1M39 26.8c3 0 5.5-2.5 5.5-5.6S42 15.8 39 15.8a5.5 5.5 0 1 0 0 11"/></svg>`,
        playbackRate: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79 79"><path d="M39.4 78.8a39.4 39.4 0 1 0 0-78.8 39.4 39.4 0 0 0 0 78.8m0-7.4a32 32 0 1 1 0-63.9 32 32 0 0 1 0 63.9"/><path d="M24.4 57.8c2 0 3.5-1.6 3.5-3.6s-1.6-3.5-3.5-3.5c-2 0-3.6 1.6-3.6 3.5 0 2 1.6 3.6 3.6 3.6M18.2 43c2 0 3.5-1.6 3.5-3.6a3.6 3.6 0 0 0-7.1 0c0 2 1.6 3.6 3.6 3.6m6.2-15c2 0 3.5-1.6 3.5-3.5 0-2-1.6-3.6-3.5-3.6a3.6 3.6 0 0 0 0 7.1m15-6.3c2 0 3.6-1.6 3.6-3.6s-1.7-3.6-3.6-3.6-3.6 1.7-3.6 3.6 1.6 3.6 3.6 3.6M60.5 43c2 0 3.6-1.6 3.6-3.6s-1.6-3.6-3.6-3.6-3.6 1.7-3.6 3.6 1.6 3.6 3.6 3.6m-6.2 14.8a3.6 3.6 0 0 0 0-7.1c-2 0-3.6 1.6-3.6 3.5 0 2 1.6 3.6 3.6 3.6m-21.4-12a6 6 0 0 0 9 0c.6-.5 1.4-1.7 1.9-2.3L56.3 25c.8-1 .5-2 0-2.6q-1-1-2.7-.1L35.2 34.8c-.7.5-1.9 1.3-2.3 1.8a6.2 6.2 0 0 0 0 9.2"/></svg>`,
    };

    const STYLE = `
        .ccl-controls-container {
            position: fixed;
            z-index: 999;
            display: block;
            pointer-events: none;
            will-change: top, left, width, height;
        }

        .ccl-bar {
            position: absolute;
            top: 6px;
            left: 6px;
            display: inline-flex;
            will-change: transform;
            height: 31px;
        }

        .ccl-bg, .ccl-bg > div {
            position: absolute;
            inset: 0;
            border-radius: 24px;
            pointer-events: none;
        }

        .ccl-bg > .blur {
            background-color: rgba(0, 0, 0, 0.55);
            backdrop-filter: saturate(180%) blur(17.5px);
            -webkit-backdrop-filter: saturate(180%) blur(17.5px);
        }

        .ccl-btn-container > button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-width: 0;
            padding: 0;
            cursor: pointer;
            background-color: transparent !important;
            transition: opacity 0.1s linear;
        }

        .ccl-icon-pip { --icon: url('${ICONS.enterPip}'); }
        .ccl-icon-pip[data-active="true"] { --icon: url('${ICONS.exitPip}'); }
        .ccl-icon-loop { --icon: url('${ICONS.enableLoop}'); }
        .ccl-icon-loop[data-active="true"] { --icon: url('${ICONS.disableLoop}'); }
        .ccl-icon-stats { --icon: url('${ICONS.stats}'); }
        .ccl-icon-rate { --icon: url('${ICONS.playbackRate}'); }

        .ccl-btn-container picture {
            width: 16px;
            height: 16px;
            background-color: white;
            mix-blend-mode: plus-lighter;
            mask-image: var(--icon);
            mask-size: 100% 100%;
            mask-repeat: no-repeat;
            transition: transform 150ms;
            pointer-events: none;
        }

        .ccl-btn-container > button:active:not(:has(.ccl-menu:active)) picture { transform: scale(0.89); }

        .ccl-btn-container {
            display: flex;
            gap: 16px;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
        }

        .ccl-bar.hidden {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .ccl-bar.visible {
            opacity: 1;
            pointer-events: auto;
            transition: opacity 0.3s ease;
        }

        .ccl-menu {
            position: absolute;
            top: 50%;
            left: 80%;
            display: none;
            flex-direction: column;
            gap: 2px;
            padding: 6px;
            background-color: hsla(0, 0%, 25%, 0.6);
            transition: opacity 0.2s ease;
            border-radius: 8px;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            cursor: default;
        }

        .ccl-menu.visible { display: flex; }

        .ccl-menu-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: white;
            font-size: 12px;
            font-family: sans-serif;
            padding: 4px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s;
            pointer-events: auto;
        }

        .ccl-menu-item:hover {
            background: rgba(255, 255, 255, 0.2) !important;
        }

        .ccl-menu-item:active {
            color: rgba(255, 255, 255, 0.5);
            font-weight: bold;
        }

        .ccl-menu-item::before {
            content: '✓';
            visibility: hidden;
            color: white;
            font-weight: bold;
            width: 12px;
        }

        .ccl-menu-item.active::before {
            visibility: visible;
        }

        .ccl-stats-container {
            width: 100%;
            height: 100%;
            position: absolute;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            display: none;
            z-index: 999;
        }

        .ccl-stats-container.visible { display: flex; }

        .ccl-stats-container > table {
            padding: 4px;
            background-color: hsla(0, 0%, 25%, 0.6);
            border-radius: 6px;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .ccl-stats-container th {
            padding-inline-end: 6px;
            text-align: end;
        }

        .ccl-stats-container th, .ccl-stats-container td {
            font-size: 12px;
            font-family: sans-serif;
            color: hsl(0, 0%, 95%);
        }
    `;

    class BaseControl {
        constructor(cls, onClick) {
            this.video = null;
            this.el = this.createButton(cls, onClick);
        }

        createButton(cls, onClick) {
            const btn = document.createElement('button');
            const picture = document.createElement('picture');
            picture.classList.add(cls);
            btn.appendChild(picture);
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            };
            return btn;
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
            this.el.querySelector('picture').setAttribute('data-active', document.pictureInPictureElement === this.video);
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

        update() {
            this.el.querySelector('picture').setAttribute('data-active', this.video.loop);
        }
    }

    class StatsControl extends BaseControl {
        constructor(onTogglePanel) {
            super('ccl-icon-stats', () => onTogglePanel());
        }
        update() { }
    }

    class RateControl extends BaseControl {
        constructor() {
            super('ccl-icon-rate', () => this.toggleMenu());
            this.menu = this.createMenu();
            this.el.appendChild(this.menu);
            this._handleDocumentClick = this.handleDocumentClick.bind(this);
        }

        createMenu() {
            const menu = document.createElement('div');
            menu.classList.add('ccl-menu');

            [0.5, 1, 1.25, 1.5, 2].forEach(r => {
                const item = document.createElement('div');
                item.classList.add('ccl-menu-item');
                item.textContent = r + '×';
                item.dataset.rate = r;
                item.onclick = (e) => {
                    e.stopPropagation();
                    if (this.video) this.video.playbackRate = r;
                    this.closeMenu();
                };
                menu.appendChild(item);
            })
            return menu;
        }

        toggleMenu() {
            const isVisible = this.menu.classList.contains('visible');
            isVisible ? this.closeMenu() : this.openMenu();
        }

        openMenu() {
            this.menu.classList.add('visible');
            this.update();
            document.addEventListener('click', this._handleDocumentClick, true);
        }

        closeMenu() {
            this.menu.classList.remove('visible');
            document.removeEventListener('click', this._handleDocumentClick, true);
        }

        handleDocumentClick(e) {
            if (this.el.contains(e.target)) return;
            this.closeMenu();
        }

        update() {
            if (!this.video) return;
            Array.from(this.menu.children).forEach(item => {
                const rate = parseFloat(item.textContent);
                item.classList.toggle('active', Math.abs(this.video.playbackRate - rate) < 0.01);
            });
        }
    }

    class UIManager {
        constructor() {
            this.target = null;
            this.container = this.createContainer();
            this.pipControl = new PipControl();
            this.loopControl = new LoopControl();
            this.statsCotrol = new StatsControl(() => this.updateStats());
            this.rateControl = new RateControl();
            this.controls = [this.pipControl, this.loopControl, this.statsCotrol, this.rateControl];
            this.init();
        }

        init() {
            const style = document.createElement('style');
            style.textContent = STYLE;
            document.head.appendChild(style);

            const bar = this.createControlsBar();
            const stats = this.createStatsContainer();
            this.container.append(bar, stats);

            document.body.appendChild(this.container);
        }

        createContainer() {
            const container = document.createElement('div');
            container.classList.add('ccl-controls-container');
            return container;
        }

        createControlsBar() {
            const bg = document.createElement('div');
            bg.classList.add('ccl-bg');

            const blur = document.createElement('div');
            blur.classList.add('blur');

            bg.appendChild(blur);

            const container = document.createElement('div');
            container.classList.add('ccl-btn-container');
            this.controls.forEach(c => container.appendChild(c.el));

            const bar = document.createElement('div');
            bar.classList.add('ccl-bar', 'hidden');
            bar.append(bg, container);

            return bar;
        }

        createStatsContainer() {
            const container = document.createElement('div');
            container.classList.add('ccl-stats-container');
            const table = document.createElement('table');
            container.append(table);
            return container;
        }

        updateStats() {
            const isVisible = this.container.querySelector('.ccl-stats-container').classList.toggle('visible');
            if (isVisible && this.target) {
                const getSourceType = () => {
                    const src = this.target.currentSrc;
                    if (src.startsWith('blob:')) return 'Media Source';
                    if (src.includes('m3u8')) return 'HLS';
                    return 'File';
                };

                const data = {
                    'Source': getSourceType(),
                    'Viewport': `${this.target.clientWidth}×${this.target.clientHeight} (${window.devicePixelRatio}x)`,
                    'Resolution': `${this.target.videoWidth}×${this.target.videoHeight}`
                };

                const table = this.container.querySelector('table');
                table.textContent = '';
                for (const [key, val] of Object.entries(data)) {
                    const row = document.createElement('tr');
                    const th = document.createElement('th');
                    th.textContent = key;
                    const td = document.createElement('td');
                    td.textContent = val;

                    row.append(th, td);
                    table.appendChild(row);
                }
            }
        }

        attach(video) {
            this.target = video;

            this.controls.forEach(c => c.setVideo(video));
            this.container.querySelector('.ccl-stats-container').classList.remove('visible');
        }

        detach() {
            this.target = null;
            this.hide();
            this.container.querySelector('.ccl-stats-container').classList.remove('visible');
        }

        reposition(rect) {
            if (!rect) return;
            Object.assign(this.container.style, {
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`
            });
        }

        show() { this.container.querySelector('.ccl-bar').classList.replace('hidden', 'visible'); }
        hide() { this.container.querySelector('.ccl-bar').classList.replace('visible', 'hidden'); }
    }

    class App {
        constructor() {
            this.ui = new UIManager();
            this.activeVideo = null;
            this.videoRect = null;

            this.isPlayEventTriggered = false;
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
                this.isPlayEventTriggered = true;
                this.isPaused = false;
                this.showAndTimer(0);
            };

            const onPause = () => {
                this.isPaused = true;
                this.showPersistent();
            };

            document.addEventListener('play', onPlay, true);
            document.addEventListener('pause', onPause, true);

            document.addEventListener('scroll', () => this.updateRectAndPosition(), { passive: true });
            window.addEventListener('resize', () => this.updateRectAndPosition(), { passive: true });

            document.addEventListener('enterpictureinpicture', () => this.ui.pipControl.update(), true);
            document.addEventListener('leavepictureinpicture', () => this.ui.pipControl.update(), true);
            document.addEventListener('webkitpresentationmodechanged', () => this.ui.pipControl.update(), true);

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

            const rect = this.videoRect;
            const isOverVideo = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );
            const isOverControls = this.ui.container.contains(e.target);
            if (isOverVideo || isOverControls) {
                this.isPlayEventTriggered = false;
                this.showAndTimer();
            } else {
                if (!this.isPlayEventTriggered) this.ui.hide();
            }
        }

        showAndTimer(timeout = 3000) {
            this.clearHideTimer();
            this.ui.show();

            this.hideTimeout = setTimeout(() => { this.ui.hide(); this.isPlayEventTriggered = false; }, timeout);
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
