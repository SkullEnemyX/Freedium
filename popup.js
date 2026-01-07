document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const convertBtn = document.getElementById('convertBtn');
  const copyBtn = document.getElementById('copyBtn');
  const errorDiv = document.getElementById('error');
  
  // Get current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0] && tabs[0].url) {
      urlInput.value = tabs[0].url;
    }
  });
  
  // Convert URL function
  function convertToFreedium(url) {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'medium.com' || urlObj.hostname.endsWith('.medium.com')) {
        const path = urlObj.pathname + urlObj.search;
        return `https://freedium-mirror.cfd/medium.com${path}`;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  
  // Convert button click
  convertBtn.addEventListener('click', function() {
    const url = urlInput.value.trim();
    const freediumUrl = convertToFreedium(url);
    
    if (freediumUrl) {
      chrome.tabs.create({ url: freediumUrl, active: true });
      window.close(); // Close popup
    } else {
      errorDiv.textContent = 'Please enter a valid Medium URL';
      errorDiv.style.display = 'block';
    }
  });
  
  // Copy button click
  copyBtn.addEventListener('click', function() {
    const url = urlInput.value.trim();
    const freediumUrl = convertToFreedium(url);
    
    if (freediumUrl) {
      navigator.clipboard.writeText(freediumUrl)
        .then(() => {
          copyBtn.textContent = 'Copied!';
          copyBtn.disabled = true;
          setTimeout(() => {
            copyBtn.textContent = 'Copy Link';
            copyBtn.disabled = false;
          }, 2000);
        });
    } else {
      errorDiv.textContent = 'Please enter a valid Medium URL';
      errorDiv.style.display = 'block';
    }
  });
  
  // Validate URL as user types
  urlInput.addEventListener('input', function() {
    const url = urlInput.value.trim();
    const isValid = convertToFreedium(url) !== null;
    
    convertBtn.disabled = !isValid;
    copyBtn.disabled = !isValid;
    errorDiv.style.display = 'none';
  });
});