let mutation = new MutationObserver(([mutation]) => {
    mutation.type === 'attributes' && document.querySelector('[data-msv-next]').click()
});

chrome.extension.sendMessage({}, () => {});

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
    }

    return true;
});