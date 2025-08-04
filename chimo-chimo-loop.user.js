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

    const getVideo = () => document.querySelector('video');

    // Create button container
    const createButtons = () => {
        if (document.querySelector('#pip-loop-controls')) return;

        const container = document.createElement('div');
        container.id = 'pip-loop-controls';
        container.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: row;
        gap: 12px;
        background-color: rgba(50, 50, 50, 0.9);
        padding: 8px 12px;
        border-radius: 12px;
        align-items: center;
    `;
        container.style.pointerEvents = 'none';

        // Define button styles
        const styles = `
        background: transparent;
        border: none;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.7);
        transition: transform 0.1s ease, color 0.3s ease;
        font-size: 18px;
    `;

        // PiP button
        const pipButton = document.createElement('button');
        pipButton.innerText = '🌠';
        pipButton.style.cssText = styles;
        pipButton.style.pointerEvents = 'auto';
        // Button click event to enter or exit Picture-in-Picture
        pipButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const video = getVideo();
            if (!video) {
                console.warn('Video element not found');
                return;
            }
            if (document.pictureInPictureElement === video) {
                document.exitPictureInPicture().catch(err => {
                    console.warn('Failed to exit Picture-in-Picture:', err);
                });
            } else {
                video.requestPictureInPicture().catch(err => {
                    console.warn('Failed to enter Picture-in-Picture:', err);
                });
            }
        };

        // Loop button
        const loopButton = document.createElement('button');
        loopButton.style.cssText = styles;
        loopButton.style.pointerEvents = 'auto';

        const updateLoopButton = () => {
            const video = getVideo();
            loopButton.innerText = video?.loop ? '🔁' : '➡️';
        };

        // Button click event to toggle loop mode
        loopButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const video = getVideo();
            if (video) {
                video.loop = !video.loop;   // Toggle loop state
                updateLoopButton();
            } else {
                console.warn('Video element not found');
            }
        };
        updateLoopButton();

        // Add button click feedback animation
        [pipButton, loopButton].forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.85)';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'scale(1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });

        container.appendChild(pipButton);
        container.appendChild(loopButton);

        // Insert buttons into video container or body
        const video = getVideo();
        if (video && video.parentElement) {
            const style = getComputedStyle(video.parentElement);
            if (style.position === 'static') {
                video.parentElement.style.position = 'relative';
            }
            video.parentElement.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    };

    // Use MutationObserver to wait for video element to load
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
