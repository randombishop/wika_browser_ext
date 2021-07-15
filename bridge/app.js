
// Listen to messages from the extension background and forward them to the window
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request=='ping') {
            sendResponse('pong') ;
        } else if (request.action) {
            window.postMessage(request, "http://localhost:3000/*");
            sendResponse("ok") ;
        }
    }
);


// Listen to messages from the wika app page and forward them to the extension
// (We only forward messages from same page with field response present.)
window.addEventListener("message", function (event) {
    if (event.source==window && event.data.response) {
        chrome.runtime.sendMessage(event.data) ;
    }
}, false);


// Add Javascript
var js = document.createElement('script');
js.innerHTML = JS_CODE;
document.head.appendChild(js);
