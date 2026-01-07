# Freedium Mirror - Chrome Extension

A lightweight Chrome extension that automatically redirects Medium article URLs to the [freedium-mirror.cfd](https://freedium-mirror.cfd) service, allowing you to read articles without a paywall or sign-in requirement.

## ✨ Features

*   **One-Click Redirection**: Click the extension icon on any Medium article page to instantly view it on Freedium Mirror.
*   **Multiple Access Methods**:
    *   Click the toolbar icon.
    *   Right-click context menu option.
    *   Popup interface for manual URL conversion.
*   **Clean & Simple UI**: A minimal popup for manual URL entry and copying.
*   **Privacy-Focused**: Works locally in your browser. Does not collect, store, or transmit any user data.
*   **Lightweight**: No dependencies or background processes that slow down your browser.

## 🔧 How It Works

This extension operates by intercepting and modifying Medium URLs. Here's the technical flow:

1.  **URL Detection**: The extension identifies when you are on a webpage hosted on `medium.com` or a subdomain like `*.medium.com`.
2.  **URL Transformation**: It takes the path and query parameters from the original Medium URL.
3.  **Prefix Injection**: It prepends `https://freedium-mirror.cfd/` to the original `medium.com/...` path.
4.  **New Tab Launch**: It automatically opens the newly constructed URL in a new browser tab.

**Example Transformation:**
Original: https://medium.com/author/some-article-12345
Converted: https://freedium-mirror.cfd/medium.com/author/some-article-12345

The core logic is contained in the `convertToFreedium()` function within `background.js`.

## 📁 Project Structure
freedium-mirror-extension/
├── manifest.json # Extension configuration and permissions
├── background.js # Core logic for URL conversion and event listeners
├── popup.html # User interface for the extension popup
├── popup.js # Logic for the popup interface
├── icons/
│ ├── icon16.png # Extension icon (16x16)
│ ├── icon48.png # Extension icon (48x48)
│ └── icon128.png # Extension icon (128x128)
└── README.md # This file


## 🚀 Local Installation (Developer Mode)

Since this extension is not currently published on the Chrome Web Store, you must load it manually in "Developer Mode." Follow these steps:

### Step 1: Download the Project Files
1.  Click the green "**Code**" button on this GitHub repository page.
2.  Select "**Download ZIP**".
3.  Extract the ZIP file to a folder on your computer (e.g., `Downloads/freedium-mirror-extension`).

### Step 2: Load the Extension in Chrome
1.  Open the **Chrome browser**.
2.  Navigate to `chrome://extensions/`.
3.  Enable **"Developer mode"** using the toggle in the top-right corner.
4.  Click the **"Load unpacked"** button that appears.
5.  In the file dialog, **select the folder** where you extracted the project files (e.g., `freedium-mirror-extension`).
6.  The extension should now appear in your list of extensions and its icon will be added to your Chrome toolbar.

### Step 3: Verify Installation
*   You should see a new puzzle-piece icon in your Chrome toolbar.
*   Clicking it should open a small popup window.
*   Navigate to any Medium article and click the extension icon—a new tab should open with the article on Freedium Mirror.

## 🖱️ How to Use

After installation, you can use the extension in three ways:

1.  **Toolbar Icon (Primary Method)**:
    *   Navigate to any Medium article.
    *   Click the Freedium Mirror icon (![icon](icons/icon16.png)) in your Chrome toolbar.
    *   The article will immediately open in a new tab via the mirror service.

2.  **Context Menu**:
    *   Right-click on any **link** to a Medium article or on the **page** of a Medium article itself.
    *   Select **"Open in Freedium Mirror"** from the context menu.

3.  **Manual Conversion via Popup**:
    *   Click the extension icon at any time to open the popup.
    *   Paste a Medium URL into the input field.
    *   Click **"Open in Freedium"** to open it, or **"Copy Link"** to copy the converted URL to your clipboard.

## ⚙️ Permissions Explained

The extension requests the minimum permissions needed to function:
*   `"activeTab"`: To access the URL of your current tab when you click the icon.
*   `"contextMenus"`: To add the "Open in Freedium Mirror" option to the right-click menu.
*   `"storage"`: (Optional/Reserved) For potential future settings; currently not used.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/issues) if you want to contribute.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This extension is an independent tool that provides convenience for accessing a third-party service. It is not affiliated with, endorsed by, or connected to Medium.com or freedium-mirror.cfd. The availability and functionality of the mirror service are outside the control of this extension.
