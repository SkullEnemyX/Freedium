// Function to convert Medium URL to Freedium URL
function convertToFreedium(url) {
  try {
    // Parse the URL
    const urlObj = new URL(url);
    
    // Check if it's a Medium URL
    if (urlObj.hostname === 'medium.com' || urlObj.hostname.endsWith('.medium.com')) {
      // Keep the pathname and query string, but remove protocol and hostname
      const path = urlObj.pathname + urlObj.search;
      
      // Construct new URL with freedium-mirror.cfd
      const newUrl = `https://freedium-mirror.cfd/medium.com${path}`;
      
      console.log('Converted URL:', newUrl);
      return newUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener(async (tab) => {
  const currentUrl = tab.url;
  const freediumUrl = convertToFreedium(currentUrl);
  
  if (freediumUrl) {
    // Open the Freedium URL in a new tab
    chrome.tabs.create({ url: freediumUrl, active: true });
  } else {
    // Show a notification if not a Medium article
    chrome.tabs.sendMessage(tab.id, {
      action: "showNotification",
      message: "This is not a Medium article URL"
    });
  }
});

// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openInFreedium",
    title: "Open in Freedium Mirror",
    contexts: ["page", "link"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openInFreedium") {
    let urlToConvert = info.linkUrl || tab.url;
    const freediumUrl = convertToFreedium(urlToConvert);
    
    if (freediumUrl) {
      chrome.tabs.create({ url: freediumUrl, active: true });
    }
  }
});

// Optional: Keyboard shortcut support
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-in-freedium") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const freediumUrl = convertToFreedium(tabs[0].url);
        if (freediumUrl) {
          chrome.tabs.create({ url: freediumUrl, active: true });
        }
      }
    });
  }
});