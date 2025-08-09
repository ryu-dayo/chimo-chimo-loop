// ==UserScript==
// @name         chimo-chimo-loop
// @namespace    https://github.com/ryu-dayo
// @version      0.1
// @description  Adds PiP and loop controls to some HTML5 video players
// @author       ryu-dayo
// @match        https://www.douyin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Inline base64 SVG icons
    const icons = {
        pip: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDMwIDMwIj48ZyBmaWxsPSJub25lIj48cGF0aCBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuODc1IiBkPSJNMTEuNTYzIDIyLjgxM2gtNC4zNzVhMy43NSAzLjc1IDAgMCAxIC0zLjc1IC0zLjc1di0xMC42MjVhMy43NSAzLjc1IDAgMCAxIDMuNzUgLTMuNzVoMTUuNjI1YTMuNzUgMy43NSAwIDAgMSAzLjc1IDMuNzV2NC4zNzUiLz48cGF0aCB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHg9IjExIiB5PSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiByeD0iMiIgZD0iTTE2LjI1IDE1SDI2LjI1QTIuNSAyLjUgMCAwIDEgMjguNzUgMTcuNVYyNUEyLjUgMi41IDAgMCAxIDI2LjI1IDI3LjVIMTYuMjVBMi41IDIuNSAwIDAgMSAxMy43NSAyNVYxNy41QTIuNSAyLjUgMCAwIDEgMTYuMjUgMTV6Ii8+PHBhdGggc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjg3NSIgZD0iTTEyLjUgOS41ODRWMTNhMC43NSAwLjc1IDAgMCAxIC0wLjIyIDAuNTNNOC4zMzQgMTMuNzVIMTEuNzVhMC43NSAwLjc1IDAgMCAwIDAuNTMgLTAuMjJNNy41IDguNzVsMy43NSAzLjc1IDEuMDMgMS4wMyIvPjwvZz48L3N2Zz4=',
        loopOn: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDMwIDMwIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xNSA1VjIuNzYzYzAgLTAuNTYzIC0wLjY3NSAtMC44MzggLTEuMDYzIC0wLjQzOGwtMy41IDMuNDg3Yy0wLjI1IDAuMjUgLTAuMjUgMC42MzcgMCAwLjg4N2wzLjQ4NyAzLjQ4N2MwLjQgMC4zODggMS4wNzUgMC4xMTIgMS4wNzUgLTAuNDVWNy41YzQuMTM4IDAgNy41IDMuMzYyIDcuNSA3LjUgMCAwLjk4OCAtMC4xODggMS45NSAtMC41NSAyLjgxMyAtMC4xODggMC40NSAtMC4wNSAwLjk2MyAwLjI4OCAxLjMgMC42MzcgMC42MzcgMS43MTMgMC40MTMgMi4wNSAtMC40MjUgMC40NjMgLTEuMTM3IDAuNzEyIC0yLjM4NyAwLjcxMiAtMy42ODggMCAtNS41MjUgLTQuNDc1IC0xMCAtMTAgLTEwbTAgMTcuNWMtNC4xMzggMCAtNy41IC0zLjM2MiAtNy41IC03LjUgMCAtMC45ODggMC4xODggLTEuOTUgMC41NSAtMi44MTMgMC4xODggLTAuNDUgMC4wNSAtMC45NjMgLTAuMjg4IC0xLjMgLTAuNjM3IC0wLjYzNyAtMS43MTMgLTAuNDEzIC0yLjA1IDAuNDI1QzUuMjUgMTIuNDUgNSAxMy43IDUgMTVjMCA1LjUyNSA0LjQ3NSAxMCAxMCAxMHYyLjIzN2MwIDAuNTYzIDAuNjc1IDAuODM4IDEuMDYzIDAuNDM4bDMuNDg3IC0zLjQ4N2MwLjI1IC0wLjI1IDAuMjUgLTAuNjM3IDAgLTAuODg3bC0zLjQ4NyAtMy40ODdhMC42MjUgMC42MjUgMCAwIDAgLTEuMDYzIDAuNDV6IiBzdHJva2Utd2lkdGg9IjAuNjI1IiBzdHJva2U9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==',
        loopOff: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjIwIiBzdHJva2UtZGFzaG9mZnNldD0iMjAiIGQ9Ik0zIDEyaDE3LjUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iMC4ycyIgdmFsdWVzPSIyMDswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjEyIiBzdHJva2UtZGFzaG9mZnNldD0iMTIiIGQ9Im0yMSAxMiAtNyA3TTIxIDEyIDE0IDUiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjJzIiBkdXI9IjAuMnMiIHZhbHVlcz0iMTI7MCIvPjwvcGF0aD48L2c+PC9zdmc+',
    };

    const getVideo = () => document.querySelector('video');

    // Ensure the video/iframe does not block Picture-in-Picture
    const ensurePipEnabled = (video) => {
        if (!video) return false;
        try {
            // Remove the blocking attribute and runtime flag if present
            if (video.hasAttribute('disablepictureinpicture')) {
                video.removeAttribute('disablepictureinpicture');
            }
            if ('disablePictureInPicture' in video) {
                try { video.disablePictureInPicture = false; } catch (_) { }
            }
            // If inside an iframe, make sure PiP is allowed
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

    // Builds the controls bar UI once a <video> is available
    const createButtons = () => {
        if (!document.querySelector('style[data-from="chimo-loop"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-from', 'chimo-loop');
            style.textContent = `
            
            #controls-bar {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 1;
            display: block;
            will-change: z-index;
            cursor: default;
            width: 82px;
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
            width: 15px;
            height: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent !important;
            appearance: none;
            transition: opacity 0.1s linear;
            }

            .picture {
            width: 15px;
            height: 15px;
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
        // Guard: prevent duplicates and abort if no <video>
        if (document.querySelector('#pip-loop-controls')) return;
        if (!getVideo()) return;

        // Background glass effect (blur + tint) placed behind the buttons
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

        // PiP icon
        const pipPicture = document.createElement('picture');
        pipPicture.classList.add('picture');
        pipPicture.style.maskImage = `url('${icons.pip}')`;

        // PiP button
        const pipButton = document.createElement('button');
        pipButton.classList.add('pip-button');
        pipButton.style.left = '16px';
        pipButton.style.pointerEvents = 'auto';
        // Toggle PiP on click
        pipButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const video = getVideo();
            if (!video) {
                console.warn('Video element not found');
                return;
            }
            // Clear site-imposed PiP blocks
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

        // Loop icon
        const loopPicture = document.createElement('picture');
        loopPicture.classList.add('picture');

        // Loop button
        const loopButton = document.createElement('button');
        loopButton.classList.add('loop-button');
        loopButton.style.left = '47px';
        loopButton.style.pointerEvents = 'auto';

        // Reflect current loop state on the icon
        const updateLoopButton = () => {
            const video = getVideo();
            const loopBase64 = video?.loop ? icons.loopOn : icons.loopOff;
            loopPicture.style.maskImage = `url('${loopBase64}')`;
        };

        loopButton.appendChild(loopPicture);

        // Button click event to toggle loop mode
        loopButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const video = getVideo();
            if (video) {
                video.loop = !video.loop; // Toggle loop state
                updateLoopButton();
            } else {
                console.warn('Video element not found');
            }
        };
        updateLoopButton();

        buttonsContainer.appendChild(pipButton);
        buttonsContainer.appendChild(loopButton);

        // Root element of the control bar
        const controlsBar = document.createElement('div');
        controlsBar.id = 'controls-bar';
        controlsBar.classList.add('hidden', 'controls-bar');

        controlsBar.appendChild(backgroundTint);
        controlsBar.appendChild(buttonsContainer);

        // Prefer to mount inside the video's parent
        const video = getVideo();
        if (video && video.parentElement) {
            const parentStyle = getComputedStyle(video.parentElement);
            if (parentStyle.position === 'static') {
                video.parentElement.style.position = 'relative';
            }
            video.parentElement.appendChild(controlsBar);
        } else {
            document.body.appendChild(controlsBar);
        }

        // Auto-hide logic
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

        // Show controls on interaction
        document.addEventListener('mousemove', showControls, { passive: true });
        document.addEventListener('touchstart', showControls, { passive: true });
        showControls(); // show once on load
    };

    // Wait for the page to load a <video> before building the UI
    const observer = new MutationObserver(() => {
        if (getVideo()) {
            createButtons();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Try to create buttons immediately
    createButtons();
})();
