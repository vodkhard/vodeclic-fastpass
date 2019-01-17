let toggleFastMode = document.getElementById('fast_mode');
toggleFastMode.checked = sessionStorage.getItem('fast_mode') || false;

let toggleLongMode = document.getElementById('long_mode');
toggleLongMode.checked = sessionStorage.getItem('long_mode') || false;

toggleFastMode.addEventListener('change', () => {
    sessionStorage.setItem('fast_mode', toggleFastMode.checked);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: `${toggleFastMode.checked ? 'activate' : 'deactivate'}FastMode`
        });
    });
});

toggleLongMode.addEventListener('change', () => {
    sessionStorage.setItem('long_mode', toggleLongMode.checked);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: `${toggleLongMode.checked ? 'activate' : 'deactivate'}LongMode`
        });
    });
});
