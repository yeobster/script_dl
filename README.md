## **YouTube Script Downloader**

### **Description**
This Chrome extension automates the process of opening the "Script" section of a YouTube video, extracting its content, and downloading it as a `.txt` file. The extension is designed to simplify the process of obtaining video transcripts for further use.

---

### **Features**
- Opens the YouTube "Script" section automatically.
- Extracts the full transcript or script from the video.
- Downloads the script content as a `.txt` file directly to your computer.

---

### **Installation**
1. Download or clone this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing this project.

---

### **How to Use**
1. Open a YouTube video in your browser.
2. Click the extension icon in the Chrome toolbar.
3. The extension will:
   - Automatically open the "Script" section of the video.
   - Extract the script content.
   - Download the extracted script as a `.txt` file.

---

### **File Structure**
```
/script_dl
├── background.js       # Handles extension activation and messaging
├── content.js          # Handles DOM manipulation and data extraction
├── manifest.json       # Defines the extension configuration and permissions
└── icons/
    ├── icon16.png      # 16x16 icon for the extension
    ├── icon48.png      # 48x48 icon for the extension
    └── icon128.png     # 128x128 icon for the extension
```

---

### **Permissions**
This extension requires the following permissions, as specified in `manifest.json`:
- **activeTab**: To access the content of the current tab.
- **scripting**: To execute scripts in the context of the current page.

---

### **How It Works**
1. **`background.js`**:
   - Listens for the user's click on the extension icon.
   - Sends a message to `content.js` to initiate the script extraction process.

2. **`content.js`**:
   - Locates the "Script" button on the YouTube video page and clicks it.
   - Waits for the "Script" section to render.
   - Extracts the script data from the DOM.
   - Sends the script data back to the `background.js` for file generation.

3. **`manifest.json`**:
   - Configures the extension's metadata, permissions, and scripts.

4. **Icons**:
   - Provides visual assets for the extension.

---

### **Known Issues**
- This extension relies on YouTube's DOM structure, which may change over time. If the extension stops working, ensure that the selectors in `content.js` match YouTube's current structure.
- For long scripts, the rendering time may cause delays.

---

### **Contributions**
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

### **License**
This project is licensed under the MIT License.

---

### **Contact**
For any issues or suggestions, please contact the project maintainer.