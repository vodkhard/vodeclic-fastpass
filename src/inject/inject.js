let mutation = new MutationObserver(([mutation]) => {
    mutation.type === 'attributes' && document.querySelector('[data-msv-next]').click()
});

chrome.extension.sendMessage({}, () => {});

function injectScript(file_path) {
    var node = document.body;
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'activateFastMode') {
        console.log('🦄 Fastpass activated 🦄');
        document.querySelectorAll('[data-msv-seen]')
            .forEach(seen =>
                mutation.observe(seen, {
                    attributes: true,
                    childList: false,
                    subtree: false
                })
            );
    } else if (request.action === 'deactivateFastMode') {
        console.log('❄️ Fastpass deactivated ❄️');
        mutation.disconnect();
    } else if (request.action === 'activateLongMode') {
        console.log('⏰ Longmode activated ⏰');
        injectScript(chrome.extension.getURL('src/inject/long.js'));
    } else if (request.action === 'deactivateLongMode') {
        console.log('💫 Longmode deactivated 💫');
        alert('Refresh page to deactivate this mode');
    }

    return true;
});