
// Prepare HTML code for the widget

let HTML_DIV1 = getHtmlDiv1() ;

let HTML_DIV2 = getHtmlDiv2() ;

let HTML_DIV3 = getHtmlDiv3() ;

let HTML_DIV4 = getHtmlDiv4() ;

let HTML_DIV5 = getHtmlDiv5() ;

let HTML_DIV_WIDGET = `
    <div id="wika-widget-fixed-div"
         class="wika-widget-elements" 
         style="visibility:hidden;
                position: fixed;
                bottom: 22px;
                right: 32px;
                zIndex: 9999;
                display: flex;
                width: 550px;
                height: 42px;
                border: solid 1px gray;
                border-radius: 15px;
                overflow: hidden;
                font-family: system-ui">
`;

let HTML_WIDGET = HTML_DIV_WIDGET + HTML_DIV1 + HTML_DIV2 + HTML_DIV3 + HTML_DIV4 + HTML_DIV5 + "</div>" ;

let HTML_WIDGET_ID = 'wika_extension_widget' ;




// Add Javascript
var js = document.createElement('script');
js.innerHTML = JS_CODE;
document.head.appendChild(js);


// Add HTML
let widget = document.createElement('div');
widget.id = HTML_WIDGET_ID ;
widget.classList.add('wika-widget-elements') ;
widget.innerHTML = HTML_WIDGET ;
document.body.appendChild(widget) ;


// Add CSS
var style = document.createElement('style');
style.innerHTML = CSS_WIDGET;
document.head.appendChild(style);





// Update Widget
function updateWidgetWithAccountInfo(msg) {
    var element = document.getElementById("wika-widget-fixed-div") ;
    if (element) {
        if (msg.on) {
            var balance = null ;
            try {
                balance = msg.balance.wika.toFixed(2);
            } catch (e) {
                balance = '-' ;
            } ;
            document.getElementById("wika-widget-balance-amount").innerText = balance ;
            showElement("wika-widget-fixed-div", "flex") ;
        } else {
            hideElement("wika-widget-fixed-div") ;
        }
    }
}

function updateWidgetWithUrlInfo(msg) {
    var element = document.getElementById("wika-widget-fixed-div") ;
    if (element) {
        var htmlMyLikes = "" ;
        if (msg.likesSubmittedCount > 0) {
            document.getElementById("wika-widget-div-already-liked-num-likes").innerText = msg.likesSubmittedCount ;
            document.getElementById("wika-widget-div-already-liked-rank").innerText = msg.likesSubmittedAt ;
            hideElement('wika-widget-div-new-like') ;
            showElement('wika-widget-div-already-liked', 'block') ;
        } else {
            hideElement('wika-widget-div-already-liked') ;
            showElement('wika-widget-div-new-like', 'flex') ;
        }
        document.getElementById("wika-widget-page-num-likes").innerText = msg.urlLikes ;
    }
}

function updateWidgetWithLikeInfo(msg) {
    console.log('updateWidgetWithLikeInfo', msg) ;
}

function hideElement(id) {
    var e = document.getElementById(id) ;
    e.style.display = 'none' ;
    e.style.visibility = 'hidden' ;
}

function showElement(id, display) {
    var e = document.getElementById(id) ;
    e.style.display = display ;
    e.style.visibility = 'visible' ;
}








// Listen to messages from the extension background
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        switch (msg.type) {
            case 'AccountInfo': updateWidgetWithAccountInfo(msg); break;
            case 'UrlInfo': updateWidgetWithUrlInfo(msg); break;
            case 'LikeInfo': updateWidgetWithLikeInfo(msg); break;
        }
    }
);



// Listen to messages from the current web page
window.addEventListener("message", function (event) {
    if (event.source!=window) return ;
    var msg = event.data ;
    switch (msg.type) {
        case 'OpenApp': chrome.runtime.sendMessage(msg);  break;
        case 'NewLike': chrome.runtime.sendMessage(msg);  break;
    }
}, false);



// Add this URL to the list of tracked
var msg = {
    type: 'NewTab',
    url: window.location.href
}
chrome.runtime.sendMessage(msg) ;
