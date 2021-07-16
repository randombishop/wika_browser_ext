

function forwardMessageToWindow(msg) {
    window.postMessage(msg, window.location.href) ;
}

function forwardMessageToExt(msg) {
    chrome.runtime.sendMessage(msg);
}



// Listen to messages from the extension background
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        switch (msg.type) {
            case 'Ping': sendResponse({type:'Pong'}); break;
            case 'AccountReq': forwardMessageToWindow(msg); break;
            case 'UrlReq': forwardMessageToWindow(msg); break;
            case 'LikeReq': forwardMessageToWindow(msg); break;
        }
    }
);


// Listen to messages from the wika app page
window.addEventListener("message", function (event) {
    if (event.source!=window) return ;
    var msg = event.data ;
    switch (msg.type) {
        case 'AccountRes': forwardMessageToExt(msg); break;
        case 'UrlRes': forwardMessageToExt(msg); break;
        case 'LikeRes': forwardMessageToExt(msg); break;
    }
}, false);


// Add Javascript
var js = document.createElement('script');
js.innerHTML = JS_CODE;
document.head.appendChild(js);
