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
}

function pingTab(callback) {
    chrome.tabs.sendMessage(BACKGROUND.tab, "ping", function(response) {
        if (!window.chrome.runtime.lastError) {
            callback(response=="pong") ;
        } else {
            callback(false) ;
        }
    });
}

function checkWikaApp() {
    if (BACKGROUND.tab) {
        pingTab((pong) => {
            if (pong) {
                getAccount() ;
            } else {
                setOn(false) ;
            }
        })
    } else {
        setOn(false) ;
    }
}

function getAccount(callback) {
    chrome.tabs.sendMessage(BACKGROUND.tab, {action: "getAccount"});
}

function getAccountResponse(msg) {
    BACKGROUND.account = msg.account ;
    BACKGROUND.balance = msg.balance ;
    setOn(msg.account!=null) ;
}








chrome.browserAction.onClicked.addListener(openWikaApp) ;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (sender.tab && sender.tab.id==BACKGROUND.tab) {
          switch (request.response) {
              case 'getAccount': getAccountResponse(request) ;
          }
      }
  }
);

setInterval(checkWikaApp, 1000);



