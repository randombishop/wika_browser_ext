const BACKGROUND = {
    tab: null,
    account: null,
    balance: null,
    on: false,
    tabs:{}
}

const WIKA_APP_URL = "http://localhost:3000/"


function createWikaApp() {
    chrome.tabs.create({url: WIKA_APP_URL}, (tab) => {
        BACKGROUND.tab = tab.id ;
    }) ;
}

function selectWikaApp() {
    chrome.tabs.update(BACKGROUND.tab, {active: true}) ;
}

function openWikaApp() {
    if (BACKGROUND.tab) {
        pingTab((pong) => {
            if (pong) {
                selectWikaApp() ;
            } else {
                createWikaApp() ;
            }
        })
    } else {
        createWikaApp() ;
    }
}

function setBadge(color, text) {
    chrome.browserAction.setBadgeBackgroundColor({color:color}) ;
    chrome.browserAction.setBadgeText({text:text}) ;
}

function setBadgeOn(on) {
    if (on) {
        setBadge('green', 'On') ;
    } else {
        setBadge('red', 'Off') ;
    }
}

function setOn(on) {
    BACKGROUND.on = on ;
    setBadgeOn(on) ;
    // TODO: this should only happen if there's a change in state to avoid wasting messages
    broadcastState() ;
}

function pingTab(callback) {
    var msg = {type:"Ping"} ;
    chrome.tabs.sendMessage(BACKGROUND.tab, msg, function(response) {
        if (!window.chrome.runtime.lastError) {
            callback(response.type=="Pong") ;
        } else {
            callback(false) ;
        }
    });
}

function checkWikaApp() {
    if (BACKGROUND.tab) {
        pingTab((pong) => {
            if (pong) {
                sendAccountReq() ;
            } else {
                setOn(false) ;
            }
        })
    } else {
        setOn(false) ;
    }
}

function sendAccountReq(callback) {
    var msg = {type: "AccountReq"} ;
    chrome.tabs.sendMessage(BACKGROUND.tab, msg);
}

function receiveAccountRes(msg) {
    BACKGROUND.account = msg.account ;
    BACKGROUND.balance = msg.balance ;
    setOn(msg.account!=null) ;
}

function broadcastState() {
    var msg = {
        type: 'AccountInfo',
        account: BACKGROUND.account,
        balance: BACKGROUND.balance,
        on: BACKGROUND.on
    }
    chrome.tabs.query({currentWindow:true}, (tabs) => {
        if (!window.chrome.runtime.lastError) {
            for (var i in tabs) {
                var tabId = tabs[i].id ;
                chrome.tabs.sendMessage(tabId, msg);
            }
        }
    }) ;
}

function registerNewTab(tabId, url) {
    BACKGROUND.tabs[tabId] = url ;
    sendUrlReq(tabId, url) ;
}

function sendUrlReq(tabId, url) {
    if (BACKGROUND.tab) {
        var msg = {type: "UrlReq", tab: tabId, url: url};
        chrome.tabs.sendMessage(BACKGROUND.tab, msg);
    }
}

function trackUrls() {
    queryCallback = (id, url) => (tabs) => {
        if (!window.chrome.runtime.lastError) {
            var tab = findById(id, tabs);
            if (tab != null) {
                sendUrlReq(id, url) ;
            } else {
                delete BACKGROUND.tabs[id] ;
            }
        }
    }
    if (BACKGROUND.tab) {
        for (var tabId in BACKGROUND.tabs) {
            var url = BACKGROUND.tabs[tabId] ;
            chrome.tabs.query({url: url}, queryCallback(tabId, url)) ;
        }
    }
}

function findById(id, array) {
    for (var i in array) {
        if (array[i].id==id) {
            return array[i];
        }
    }
    return null ;
}

function receiveUrlRes(msg) {
    msg.tab = Number(msg.tab) ;
    chrome.tabs.query({url: msg.url}, (tabs) => {
        var tab = findById(msg.tab, tabs);
        if (tab) {
            msg.type = "UrlInfo" ;
            chrome.tabs.sendMessage(msg.tab, msg);
        }
    }) ;
}






chrome.browserAction.onClicked.addListener(openWikaApp) ;

chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
      if (sender.tab) {
          if (sender.tab.id==BACKGROUND.tab) {
              // Messages from Wika App
              switch (msg.type) {
                case 'AccountRes': receiveAccountRes(msg); break;
                case 'UrlRes': receiveUrlRes(msg); break;
              }
          } else {
              // Messages from other tabs
              switch (msg.type) {
                  case 'OpenApp': openWikaApp(); break;
                  case 'NewTab': registerNewTab(sender.tab.id, msg.url); break;
              }
          }
      }
  }
);

setInterval(checkWikaApp, 1000);

setInterval(trackUrls, 10000);



