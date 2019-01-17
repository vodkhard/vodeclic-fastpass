let mutation = new MutationObserver(([mutation]) => {
    mutation.type === 'attributes' && document.querySelector('[data-msv-next]').click()
});

let longScript = null;
let longMutation = new MutationObserver((mutations) => {
    if (mutations.length === 2 && longScript.parentNode) {
        longScript.parentNode.removeChild(longScript);
        setTimeout(() => {
            longScript = injectScript(chrome.extension.getURL('src/inject/long.js'));
        }, 1000);
    }
});

chrome.extension.sendMessage({}, () => {});

const injectScript = (file_path) => {
    var node = document.body;
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
    
    return script;
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
        longScript = injectScript(chrome.extension.getURL('src/inject/long.js'));
        longMutation.observe(document.querySelector('[data-wrapper="player"]'), {
            attributes: true,
            childList: false,
            subtree: false
        })
    } else if (request.action === 'deactivateLongMode') {
        console.log('💫 Longmode deactivated 💫');
        longMutation.disconnect();
        alert('Refresh page to deactivate this mode');
    }

    return true;
});