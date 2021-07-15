
// Listen to messages from the extension background
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type=='Ping') {
            sendResponse({type:'Pong'}) ;
        } else if (request.type=='AccountReq') {
            window.postMessage(request, "http://localhost:3000/*");
            sendResponse({type:'Ack'}) ;
        }
    }
);


// Listen to messages from the wika app page
window.addEventListener("message", function (event) {
    if (event.source!=window) return ;
    var msg = event.data ;
    switch (msg.type) {
        case 'AccountRes': chrome.runtime.sendMessage(msg) ;
    }
}, false);


// Add Javascript
var js = document.createElement('script');
js.innerHTML = JS_CODE;
document.head.appendChild(js);
