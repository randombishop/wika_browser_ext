const BACKGROUND = {
    on: false
}

const WIKA_APP_URL = "http://localhost:3000/"


function selectWikaApp(tabId) {
    chrome.tabs.update(tabId, {active: true, pinned: true}) ;
}

function openWikaApp() {
    findWikaTab((tab) => {
        if (tab) {
            selectWikaApp(tab.id) ;
        } else {
            chrome.tabs.create({url: WIKA_APP_URL, pinned: true }) ;
        }
    }) ;
}

function findWikaTab(callback) {
    chrome.tabs.query({url: WIKA_APP_URL+'*'}, (tabs) => {
        if (tabs.length>0) {
            callback(tabs[0]) ;
        } else {
            callback(null) ;
        }
    }) ;
}

function checkWikaApp() {
    if (BACKGROUND.wikaTabId!=null) {
        pingWikaApp() ;
    } else {
        findWikaTab((tab) => {
            if (tab) {
                BACKGROUND.wikaTabId = tab.id ;
                pingWikaApp() ;
            } else {
                BACKGROUND.on = false ;
                chrome.browserAction.setBadgeBackgroundColor({color:'red'}) ;
                chrome.browserAction.setBadgeText({text:'OFF'}) ;
            }
        }) ;
    }
}

function pingWikaApp() {
    alert('pingWikaApp') ;
}


chrome.browserAction.onClicked.addListener(openWikaApp) ;



pingWikaApp() ;
