let toggleFastMode = document.getElementById('fast_mode');
toggleFastMode.checked = localStorage.getItem('fast_mode') || false;

toggleFastMode.addEventListener('change', () => {
    localStorage.setItem('fast_mode', toggleFastMode.checked);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: `${toggleFastMode.checked ? 'activate' : 'deactivate'}FastMode`
        });
    });
});
