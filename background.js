chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { message: "fetch_script" }, (response) => {
        if (chrome.runtime.lastError) {
            showNotification(
                "Youtube Script Downloader",
                "Content Script를 찾을 수 없습니다. 유튜브 페이지인지 확인해주세요."
            );
            return null;
        } else if (response && response.success) {
            const downloadAPI = chrome?.downloads || browser?.downloads;
            const data = response.data;

            try {
                const transcriptData = encodeURIComponent(data.transcript);
                const dataUrl = `data:text/plain;charset=utf-8,${transcriptData}`;

                const sanitizedTitle = sanitizeFilename(data.title);

                downloadAPI.download(
                    {
                        url: dataUrl,
                        filename: `${sanitizedTitle}.txt`,
                        saveAs: false
                    },
                    (downloadId) => {
                        if (chrome.runtime.lastError) {
                            console.error("Download Error", chrome.runtime.lastError.message)
                        } else {
                            console.log("Download initiated ID:", downloadId);
                        }
                    });
            } catch (error) {
                console.error("Download Error:", error);
                showNotification("No Transcript Found", "스크립트를 가져오지 못했습니다.");
            }
        } else {
            showNotification(
                "Youtube Script Downloader",
                "스크립트를 가져오는데 실패했습니다. 스크립트 UI를 열어주세요."
            );
        }
    });
});

function sanitizeFilename(filename) {
    return filename.replace(/[\\/:*?"<>|]/g, "").trim() || "default_filename";
}

function showNotification(title, message) {
    chrome.notifications.create(
        null,
        {
            type: "basic",
            iconUrl: "icons/icon16.png",
            title: title,
            message: message,
            priority: 0
        }, (notificationId) => {
            if (chrome.runtime.lastError) {
                console.error("Notification Error:", chrome.runtime.lastError.message);
            } else {
                console.log("Notification ID:", notificationId);
            }
        });
}