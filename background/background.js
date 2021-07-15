const BACKGROUND = {
    tab: null,
    account: null,
    balance: null,
    on: false
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
    chrome.tabs.sendMessage(BACKGROUND.tab, {type: "AccountReq"});
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








chrome.browserAction.onClicked.addListener(openWikaApp) ;

chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
      if (sender.tab) {
          if (sender.tab.id==BACKGROUND.tab) {
              // Messages from Wika App
              switch (msg.type) {
                case 'AccountRes': receiveAccountRes(msg) ;
              }
          } else {
              // Messages from other tabs
              switch (msg.type) {
                  case 'OpenApp': openWikaApp() ;
              }
          }
      }
  }
);

setInterval(checkWikaApp, 1000);



