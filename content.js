async function extractYoutubeTranscript() {
    const scriptButton = document.querySelector('button[aria-label="스크립트 표시"]');
    console.log(scriptButton);

    if (scriptButton) {
        // click
        scriptButton.click();

        const waitForElement = (timeout = 10000) => {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    observer.disconnect();
                    reject(new Error("Timeout: 요소를 찾지 못했습니다."));
                }, timeout);

                const observer = new MutationObserver(() => {
                    const segmentContainer = document.querySelector("#segments-container");
                    if (segmentContainer) {
                        clearTimeout(timer);
                        observer.disconnect();
                        resolve(segmentContainer);
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });
            });
        };

        try {
            const segmentContainer = await waitForElement()
            const segments = segmentContainer.querySelectorAll("ytd-transcript-segment-renderer");
            const transcript = [...segments].map((segment) => {
                const text = segment.querySelector(".segment-text")?.innerText.trim();
                return text;
            }).filter(Boolean).join("\n");

            const titleElement = document.querySelector("#title yt-formatted-string");
            const title = titleElement?.innerText.trim() || "youtube_transcript";
            return { transcript, title };
        } catch (err) {
            throw err;
        }
    } else {
        throw new Error('no script button');
    }
}

const runtime = chrome?.runtime || browser?.runtime;
runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "fetch_script") {
        console.log('fetch script');
        const fetchScriptData = async () => {
            try {
                const data = await extractYoutubeTranscript();
                sendResponse({ success: true, data: data });
            } catch (err) {
                sendResponse({ success: false, error: err.message });
            }
        };
        fetchScriptData();
        return true;
    }
});