// ==UserScript==
// @name         chimo-chimo-loop
// @namespace    https://github.com/ryu-dayo
// @version      0.1
// @description  Adds PiP and loop controls to some HTML5 video players
// @author       ryu-dayo
// @match        https://*.douyin.com/*
// @match        https://www.instagram.com/*
// @match        https://*.xiaohongshu.com/explore/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Inline base64-encoded SVG icons
    const icons = {
        pip: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDMwIDMwIj48ZyBmaWxsPSJub25lIj48cGF0aCBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuODc1IiBkPSJNMTEuNTYzIDIyLjgxM2gtNC4zNzVhMy43NSAzLjc1IDAgMCAxIC0zLjc1IC0zLjc1di0xMC42MjVhMy43NSAzLjc1IDAgMCAxIDMuNzUgLTMuNzVoMTUuNjI1YTMuNzUgMy43NSAwIDAgMSAzLjc1IDMuNzV2NC4zNzUiLz48cGF0aCB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHg9IjExIiB5PSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiByeD0iMiIgZD0iTTE2LjI1IDE1SDI2LjI1QTIuNSAyLjUgMCAwIDEgMjguNzUgMTcuNVYyNUEyLjUgMi41IDAgMCAxIDI2LjI1IDI3LjVIMTYuMjVBMi41IDIuNSAwIDAgMSAxMy43NSAyNVYxNy41QTIuNSAyLjUgMCAwIDEgMTYuMjUgMTV6Ii8+PHBhdGggc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjg3NSIgZD0iTTEyLjUgOS41ODRWMTNhMC43NSAwLjc1IDAgMCAxIC0wLjIyIDAuNTNNOC4zMzQgMTMuNzVIMTEuNzVhMC43NSAwLjc1IDAgMCAwIDAuNTMgLTAuMjJNNy41IDguNzVsMy43NSAzLjc1IDEuMDMgMS4wMyIvPjwvZz48L3N2Zz4=',
        loopOn: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDMwIDMwIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xNSA1VjIuNzYzYzAgLTAuNTYzIC0wLjY3NSAtMC44MzggLTEuMDYzIC0wLjQzOGwtMy41IDMuNDg3Yy0wLjI1IDAuMjUgLTAuMjUgMC42MzcgMCAwLjg4N2wzLjQ4NyAzLjQ4N2MwLjQgMC4zODggMS4wNzUgMC4xMTIgMS4wNzUgLTAuNDVWNy41YzQuMTM4IDAgNy41IDMuMzYyIDcuNSA3LjUgMCAwLjk4OCAtMC4xODggMS45NSAtMC41NSAyLjgxMyAtMC4xODggMC40NSAtMC4wNSAwLjk2MyAwLjI4OCAxLjMgMC42MzcgMC42MzcgMS43MTMgMC40MTMgMi4wNSAtMC40MjUgMC40NjMgLTEuMTM3IDAuNzEyIC0yLjM4NyAwLjcxMiAtMy42ODggMCAtNS41MjUgLTQuNDc1IC0xMCAtMTAgLTEwbTAgMTcuNWMtNC4xMzggMCAtNy41IC0zLjM2MiAtNy41IC03LjUgMCAtMC45ODggMC4xODggLTEuOTUgMC41NSAtMi44MTMgMC4xODggLTAuNDUgMC4wNSAtMC45NjMgLTAuMjg4IC0xLjMgLTAuNjM3IC0wLjYzNyAtMS43MTMgLTAuNDEzIC0yLjA1IDAuNDI1QzUuMjUgMTIuNDUgNSAxMy43IDUgMTVjMCA1LjUyNSA0LjQ3NSAxMCAxMCAxMHYyLjIzN2MwIDAuNTYzIDAuNjc1IDAuODM4IDEuMDYzIDAuNDM4bDMuNDg3IC0zLjQ4N2MwLjI1IC0wLjI1IDAuMjUgLTAuNjM3IDAgLTAuODg3bC0zLjQ4NyAtMy40ODdhMC42MjUgMC42MjUgMCAwIDAgLTEuMDYzIDAuNDV6IiBzdHJva2Utd2lkdGg9IjAuNjI1IiBzdHJva2U9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==',
        loopOff: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjIwIiBzdHJva2UtZGFzaG9mZnNldD0iMjAiIGQ9Ik0zIDEyaDE3LjUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iMC4ycyIgdmFsdWVzPSIyMDswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjEyIiBzdHJva2UtZGFzaG9mZnNldD0iMTIiIGQ9Im0yMSAxMiAtNyA3TTIxIDEyIDE0IDUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjJzIiBkdXI9IjAuMnMiIHZhbHVlcz0iMTI7MCIvPjwvcGF0aD48L2c+PC9zdmc+',
    };

    const MIN_VIDEO_WIDTH = 300;
    const MIN_VIDEO_HEIGHT = 200;

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

    const BTN = 15;
    const EDGE = 16;

    // Construct and inject the control bar UI when a <video> is available
    const createButtons = () => {
        const video = getVideo();
        if (!video) return;
        // Prevent duplicate controls in the same parent
        if (video.parentElement.querySelector('#controls-bar')) return;

        if (!document.querySelector('style[data-from="chimo-loop"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-from', 'chimo-loop');
            style.textContent = `
            
            #controls-bar {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 999;
            display: block;
            will-change: z-index;
            cursor: default;
            height: 31px;
            }

            .background-tint, .background-tint > div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
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
            position: absolute;
            border: 0;
            padding: 0;
            width: ${BTN}px;
            height: ${BTN}px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent !important;
            appearance: none;
            transition: opacity 0.1s linear;
            }

            .picture {
            width: ${BTN}px;
            height: ${BTN}px;
            background-color: rgba(255, 255, 255, 0.55);
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

            #pip-loop-controls {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
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
        buttonsContainer.id = 'pip-loop-controls';
        buttonsContainer.classList.add('pip-loop-controls');

        // Compute left offset for each button (0-indexed)
        const getButtonLeftOffset = (index) => {
            return (EDGE + BTN) * index + EDGE;
        }

        // PiP button and icon
        const pipPicture = document.createElement('picture');
        pipPicture.classList.add('picture');
        pipPicture.style.maskImage = `url('${icons.pip}')`;

        const pipButton = document.createElement('button');
        pipButton.classList.add('pip-button');
        pipButton.style.left = getButtonLeftOffset(0) + 'px';
        pipButton.style.pointerEvents = 'auto';
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

        // Loop button and icon
        const loopPicture = document.createElement('picture');
        loopPicture.classList.add('picture');

        const loopButton = document.createElement('button');
        loopButton.classList.add('loop-button');
        loopButton.style.left = getButtonLeftOffset(1) + 'px';
        loopButton.style.pointerEvents = 'auto';

        // Update loop icon to reflect current loop state
        const updateLoopButton = () => {
            const video = getVideo();
            if (!video) return;
            const loopBase64 = video?.loop ? icons.loopOn : icons.loopOff;
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
        controlsBar.style.width = ((EDGE + BTN) * count + EDGE) + 'px';

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

    // Observe DOM changes to inject controls when a <video> element appears
    const observer = new MutationObserver(() => {
        if (getVideo()) {
            createButtons();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Attempt early injection on page load
    createButtons();
})();
