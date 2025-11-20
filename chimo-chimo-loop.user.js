// ==UserScript==
// @name         chimo-chimo-loop
// @name:zh-CN   chimo-chimo-loop
// @namespace    https://github.com/ryu-dayo
// @version      0.2.1
// @description  Adds Picture-in-Picture (PiP) and loop controls to supported HTML5 video players.
// @description:zh-CN  为支持的网站的视频播放器添加画中画（PiP）和循环播放按钮。
// @author       ryu-dayo
// @match        https://www.douyin.com/*
// @match        https://www.instagram.com/*
// @match        https://www.xiaohongshu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // Inline base64-encoded SVG icons
    const icons = {
        enterPip: 'data:image/svg+xml,%3Csvg%20width%3D%22101%22%20height%3D%2282%22%20viewBox%3D%220%200%20101%2082%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.4512%2063.2813H68.2129C76.5625%2063.2813%2080.6641%2059.2285%2080.6641%2051.0254V12.2559C80.6641%204.0527%2076.5625%200%2068.2129%200H12.4512C4.10158%200%200%204.0527%200%2012.2559V51.0254C0%2059.2285%204.10158%2063.2813%2012.4512%2063.2813ZM7.03128%2050.6348V12.6465C7.03128%208.9356%209.03318%207.0313%2012.5489%207.0313H68.1153C71.6309%207.0313%2073.6328%208.9356%2073.6328%2012.6465V50.6348C73.6328%2054.3457%2071.6309%2056.25%2068.1153%2056.25H12.5489C9.03318%2056.25%207.03128%2054.3457%207.03128%2050.6348Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M30.957%2016.8457C30.8105%2015.625%2029.1991%2014.209%2027.6366%2015.8692L23.4374%2019.9707L17.5781%2014.1113C16.5527%2013.0371%2014.8437%2013.0371%2013.8183%2014.1113C12.7441%2015.1367%2012.7441%2016.8457%2013.8183%2017.8711L19.6777%2023.7305L15.5761%2027.9297C13.9159%2029.4922%2015.332%2031.1035%2016.5527%2031.25L30.664%2033.3984C31.3476%2033.4961%2032.0312%2033.252%2032.5195%2032.8125C32.9589%2032.3242%2033.2031%2031.6406%2033.1054%2030.957L30.957%2016.8457Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M50.4883%2081.6407H87.6953C95.9964%2081.6407%20100.146%2077.5879%20100.146%2069.3848V44.7754C100.146%2036.6211%2095.9964%2032.5195%2087.6953%2032.5195H50.4883C42.1875%2032.5195%2038.0371%2036.5723%2038.0371%2044.7754V69.3848C38.0371%2077.5879%2042.1875%2081.6407%2050.4883%2081.6407Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E',
        exitPip: 'data:image/svg+xml,%3Csvg%20width%3D%22101%22%20height%3D%2282%22%20viewBox%3D%220%200%20101%2082%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.4512%2063.2813H68.2129C76.5625%2063.2813%2080.6641%2059.2285%2080.6641%2051.0254V12.2559C80.6641%204.0527%2076.5625%200%2068.2129%200H12.4512C4.10158%200%200%204.0527%200%2012.2559V51.0254C0%2059.2285%204.10158%2063.2813%2012.4512%2063.2813ZM7.03128%2050.6348V12.6465C7.03128%208.9356%209.03318%207.0313%2012.5489%207.0313H68.1153C71.6309%207.0313%2073.6328%208.9356%2073.6328%2012.6465V50.6348C73.6328%2054.3457%2071.6309%2056.25%2068.1153%2056.25H12.5489C9.03318%2056.25%207.03128%2054.3457%207.03128%2050.6348Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M15.1366%2029.8827C15.2831%2031.1034%2016.9433%2032.4706%2018.5058%2030.8593L22.6562%2026.7577L28.5644%2032.6171C29.5898%2033.6425%2031.2988%2033.6425%2032.3241%2032.6171C33.3495%2031.5917%2033.3495%2029.8827%2032.3241%2028.8573L26.4648%2022.9491L30.5663%2018.7987C32.1777%2017.2362%2030.8105%2015.5761%2029.5409%2015.4296L15.4784%2013.33C14.746%2013.2323%2014.1113%2013.4765%2013.623%2013.9159C13.1835%2014.4042%2012.9394%2015.0878%2013.037%2015.7714L15.1366%2029.8827Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M50.4883%2081.6407H87.6953C95.9964%2081.6407%20100.146%2077.5879%20100.146%2069.3848V44.7754C100.146%2036.6211%2095.9964%2032.5195%2087.6953%2032.5195H50.4883C42.1875%2032.5195%2038.0371%2036.5723%2038.0371%2044.7754V69.3848C38.0371%2077.5879%2042.1875%2081.6407%2050.4883%2081.6407Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E',
        enableLoop: 'data:image/svg+xml,%3Csvg%20width%3D%2299%22%20height%3D%2266%22%20viewBox%3D%220%200%2099%2066%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M28.1739%2065.8691H70.6543C87.6953%2065.8691%2098.8284%2054.834%2098.8284%2037.7441C98.8284%2020.6543%2087.6953%209.47259%2070.6543%209.47259H62.2559C60.3028%209.47259%2058.7403%2011.084%2058.7403%2012.9883C58.7403%2014.9414%2060.3028%2016.5527%2062.2559%2016.5527H70.6543C83.252%2016.5527%2091.7964%2025.1465%2091.7964%2037.7441C91.7964%2050.3418%2083.252%2058.8379%2070.6543%2058.8379H28.1739C15.5274%2058.8379%207.03128%2050.3418%207.03128%2037.7441C7.03128%2025.1465%2015.5274%2016.5527%2028.1739%2016.5527H33.3496C33.1055%2015.332%2032.959%2014.0625%2032.959%2012.7441C32.959%2011.6699%2033.0567%2010.5957%2033.252%209.52149L28.1739%209.47259C11.0352%209.32619%200%2020.6543%200%2037.7441C0%2054.834%2011.0352%2065.8691%2028.1739%2065.8691Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M51.3672%2025.4394C58.4473%2025.4394%2064.1114%2019.7266%2064.1114%2012.6953C64.1114%205.6641%2058.4473%200%2051.3672%200C44.336%200%2038.6719%205.6641%2038.6719%2012.6953C38.6719%2019.7266%2044.336%2025.4394%2051.3672%2025.4394ZM51.3672%2018.6035C48.0957%2018.6035%2045.5078%2015.9668%2045.5078%2012.6953C45.5078%209.375%2048.0957%206.8359%2051.3672%206.8359C54.7364%206.8359%2057.2754%209.375%2057.2754%2012.6953C57.2754%2015.9668%2054.7364%2018.6035%2051.3672%2018.6035Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E',
        disableLoop: 'data:image/svg+xml,%3Csvg%20width%3D%2299%22%20height%3D%2266%22%20viewBox%3D%220%200%2099%2066%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M28.1739%2065.8691H70.6543C87.6953%2065.8691%2098.8284%2054.834%2098.8284%2037.7441C98.8284%2020.6543%2087.6953%209.47259%2070.6543%209.47259H62.2559C60.3028%209.47259%2058.7403%2011.084%2058.7403%2012.9883C58.7403%2014.9414%2060.3028%2016.5527%2062.2559%2016.5527H70.6543C83.252%2016.5527%2091.7964%2025.1465%2091.7964%2037.7441C91.7964%2050.3418%2083.252%2058.8379%2070.6543%2058.8379H28.1739C15.5274%2058.8379%207.03128%2050.3418%207.03128%2037.7441C7.03128%2025.1465%2015.5274%2016.5527%2028.1739%2016.5527H33.3496C33.1055%2015.332%2032.959%2014.0625%2032.959%2012.7441C32.959%2011.6699%2033.0567%2010.5957%2033.252%209.52149L28.1739%209.47259C11.0352%209.32619%200%2020.6543%200%2037.7441C0%2054.834%2011.0352%2065.8691%2028.1739%2065.8691Z%22%20fill%3D%22black%22%2F%3E%3Cpath%20d%3D%22M51.3672%2025.4394C58.4473%2025.4394%2064.1114%2019.7266%2064.1114%2012.6953C64.1114%205.6641%2058.4473%200%2051.3672%200C44.336%200%2038.6719%205.6641%2038.6719%2012.6953C38.6719%2019.7266%2044.336%2025.4394%2051.3672%2025.4394Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E',
    };

    const MIN_VIDEO_WIDTH = 300;
    const MIN_VIDEO_HEIGHT = 200;
    const BTN = 16;
    const EDGE = 16;

    // === Styles ===
    function injectStyle() {
        if (!document.querySelector('style[data-from="chimo-loop"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-from', 'chimo-loop');
            style.textContent = `
            
            #controls-bar {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 999;
            display: inline-flex;
            will-change: z-index;
            cursor: default;
            height: 31px;
            }

            .background-tint, .background-tint > div {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            pointer-events: none;
            }

            .background-tint > .blur {
            background-color: rgba(0, 0, 0, 0.55);
            backdrop-filter: saturate(180%) blur(17.5px);
            -webkit-backdrop-filter: saturate(180%) blur(17.5px);
            }

            .background-tint > .tint {
            background-color: rgba(255, 255, 255, 0.14);
            mix-blend-mode: lighten;
            }

            .pip-button, .loop-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent !important;
            appearance: none;
            transition: opacity 0.1s linear;
            }

            .picture {
            background-color: rgba(255, 255, 255, 1);
            mix-blend-mode: plus-lighter;
            mask-size: 100% 100%;
            mask-repeat: no-repeat;
            transition: transform 150ms;
            will-change: transform;
            pointer-events: none;
            }

            .pip-button:active picture,
            .loop-button:active picture {
            transform: scale(0.89);
            }

            #buttons-container {
            display: flex;
            gap: 16px;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
            }

            #controls-bar.hidden {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            }

            #controls-bar.visible {
            opacity: 1;
            pointer-events: auto;
            transition: opacity 0.3s ease;
            }
            `;
            document.head.appendChild(style);
        }
    }

    // === Core ===
    const getVideo = () => {
        const videos = Array.from(document.querySelectorAll('video'));
        if (videos.length === 0) return null;

        // Filter: Only consider videos that are visible in the viewport and sufficiently large
        const filtered = videos.filter(v => {
            const rect = v.getBoundingClientRect();
            return rect.width > MIN_VIDEO_WIDTH && rect.height > MIN_VIDEO_HEIGHT && rect.bottom > 0 && rect.top < window.innerHeight;
        });

        if (filtered.length === 0) return null;

        // Prefer videos without existing controls
        const unpatched = filtered.find(v => !v.parentElement.querySelector('#controls-bar'));
        if (unpatched) return unpatched;

        // Fallback: select the video element closest to the center of the screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        let best = null;
        let minDist = Infinity;

        for (const v of filtered) {
            const rect = v.getBoundingClientRect();
            const dx = rect.left + rect.width / 2 - centerX;
            const dy = rect.top + rect.height / 2 - centerY;
            const dist = dx * dx + dy * dy;
            if (dist < minDist) {
                best = v;
                minDist = dist;
            }
        }

        return best;
    };

    // Ensure PiP attributes and iframe permissions are set
    const ensurePipEnabled = (video) => {
        if (!video) return false;
        try {
            // Remove disablepictureinpicture attribute if present
            if (video.hasAttribute('disablepictureinpicture')) {
                video.removeAttribute('disablepictureinpicture');
            }
            // Set disablePictureInPicture property to false if supported
            if ('disablePictureInPicture' in video) {
                try { video.disablePictureInPicture = false; } catch (_) { }
            }
            // Ensure iframe allows picture-in-picture if inside an iframe
            const frame = window.frameElement;
            if (frame && frame.tagName === 'IFRAME') {
                const allow = frame.getAttribute('allow') || '';
                if (!/picture-in-picture/.test(allow)) {
                    frame.setAttribute('allow', (allow ? allow + ';' : '') + 'picture-in-picture');
                }
            }
            return true;
        } catch (e) {
            console.warn('[chimo] Failed to ensure PiP enabled:', e);
            return false;
        }
    };

    // === UI ===
    const createButtons = () => {
        const video = getVideo();
        if (!video) return;
        // Prevent duplicate controls in the same parent
        if (video.parentElement.querySelector('#controls-bar')) return;

        injectStyle();

        // Glassmorphic background (blur and tint) for the control bar
        const backgroundTint = document.createElement('div');
        backgroundTint.id = 'background-tint';
        backgroundTint.classList.add('background-tint');

        const blur = document.createElement('div');
        blur.classList.add('blur');

        const tint = document.createElement('div');
        tint.classList.add('tint');

        backgroundTint.appendChild(blur);
        backgroundTint.appendChild(tint);

        // Container that aligns the two buttons inside the bar
        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'buttons-container';
        buttonsContainer.classList.add('buttons-container');

        // PiP button and icon
        const pipPicture = document.createElement('picture');
        pipPicture.classList.add('picture');
        pipPicture.style.width = `${BTN}px`;
        pipPicture.style.height = `${BTN}px`;

        const pipButton = document.createElement('button');
        pipButton.classList.add('pip-button');
        pipButton.style.pointerEvents = 'auto';

        const updatePipButton = () => {
            const video = getVideo();
            if (!video) return;
            const isInPip = document.pictureInPictureElement === video;
            const pipBase64 = isInPip ? icons.exitPip : icons.enterPip;
            pipPicture.style.maskImage = `url('${pipBase64}')`;
        };

        pipButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const video = getVideo();
            if (!video) {
                console.warn('Video element not found');
                return;
            }
            // Ensure PiP is not blocked by site
            ensurePipEnabled(video);

            if (document.pictureInPictureElement === video) {
                document.exitPictureInPicture().catch(err => {
                    console.warn('Failed to exit Picture-in-Picture:', err);
                });
            } else {
                video.requestPictureInPicture().catch(err => {
                    if (err && /InvalidStateError/i.test(String(err))) {
                        console.warn('Failed to enter Picture-in-Picture: likely blocked by `disablepictureinpicture` or iframe policy. I tried to remove the attribute and set iframe allow=picture-in-picture. If it persists, the site may be re-applying it.');
                    } else {
                        console.warn('Failed to enter Picture-in-Picture:', err);
                    }
                });
            }
        };
        pipButton.appendChild(pipPicture);

        document.addEventListener("enterpictureinpicture", updatePipButton);
        document.addEventListener("leavepictureinpicture", updatePipButton);

        // Initial update
        updatePipButton();

        // Loop button and icon
        const loopPicture = document.createElement('picture');
        loopPicture.classList.add('picture');
        loopPicture.style.width = `${BTN}px`;
        loopPicture.style.height = `${BTN}px`;

        const loopButton = document.createElement('button');
        loopButton.classList.add('loop-button');
        loopButton.style.pointerEvents = 'auto';

        // Update loop icon to reflect current loop state
        const updateLoopButton = () => {
            const video = getVideo();
            if (!video) return;
            const loopBase64 = video?.loop ? icons.disableLoop : icons.enableLoop;
            loopPicture.style.maskImage = `url('${loopBase64}')`;
        };
        loopButton.appendChild(loopPicture);
        loopButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const video = getVideo();
            if (video) {
                video.loop = !video.loop;
                updateLoopButton();
            } else {
                console.warn('Video element not found');
            }
        };
        updateLoopButton();

        buttonsContainer.appendChild(pipButton);
        buttonsContainer.appendChild(loopButton);

        // Root element for the control bar
        const controlsBar = document.createElement('div');
        controlsBar.id = 'controls-bar';
        controlsBar.classList.add('hidden', 'controls-bar');

        controlsBar.appendChild(backgroundTint);
        controlsBar.appendChild(buttonsContainer);

        const count = buttonsContainer.children.length;

        // Attach to the video's parent if possible
        if (video.parentElement) {
            const parentStyle = getComputedStyle(video.parentElement);
            if (parentStyle.position === 'static') {
                video.parentElement.style.position = 'relative';
            }
            video.parentElement.appendChild(controlsBar);
        } else {
            document.body.appendChild(controlsBar);
        }

        // Auto-hide control bar after inactivity
        let hideTimeout;

        // Show the bar for 3s after mouse/touch activity
        const showControls = () => {
            controlsBar.classList.remove('hidden');
            controlsBar.classList.add('visible');
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                controlsBar.classList.remove('visible');
                controlsBar.classList.add('hidden');
            }, 3000);
        };

        // Show controls on user interaction
        document.addEventListener('mousemove', showControls, { passive: true });
        document.addEventListener('touchstart', showControls, { passive: true });
        showControls();
    };

    // === Observers ===
    function observeVideoDom() {
        const observer = new MutationObserver(() => {
            if (getVideo()) {
                createButtons();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // === Init ===
    function main() {
        createButtons();
        observeVideoDom();
    }

    main();
})();
