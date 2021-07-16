

function forwardMessage(msg, sendResponse) {
    window.postMessage(msg, "http://localhost:3000/*");
    sendResponse({type:'Forwarded'}) ;
}



// Listen to messages from the extension background
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        switch (msg.type) {
            case 'Ping': sendResponse({type:'Pong'}); break;
            case 'AccountReq': forwardMessage(msg, sendResponse); break;
            case 'UrlReq': forwardMessage(msg, sendResponse); break;
        }
    }
);


// Listen to messages from the wika app page
window.addEventListener("message", function (event) {
    if (event.source!=window) return ;
    var msg = event.data ;
    switch (msg.type) {
        case 'AccountRes': chrome.runtime.sendMessage(msg); break;
    }
}, false);


// Add Javascript
var js = document.createElement('script');
js.innerHTML = JS_CODE;
document.head.appendChild(js);
