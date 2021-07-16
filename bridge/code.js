const JS_CODE = `

    function sendAccountResponse() {
        var state = window.wikaReactApp.state ;
        var msg = {
            type: 'AccountRes',
            account: state.account,
            balance: state.balance
        }
        window.postMessage(msg, "http://localhost:3000/*");
    }
    
    function processUrlReq(tab, url) {
        try {
            var address = window.wikaReactApp.state.account.address ;
            var network = window.wikaReactApp.wikaNetwork ;
            network.getUrlInfo(address, url, (msg) => {
                msg.type = "UrlRes" ;
                msg.tab = tab ;
                msg.url = url ;
                window.postMessage(msg, "http://localhost:3000/*");
            }) ;
        } catch (err) {
        }
    }
    
    window.addEventListener("message", function (event) {
        var data = event.data ;
        switch (data.type) {
            case 'AccountReq': sendAccountResponse(); break;
            case 'UrlReq': processUrlReq(data.tab, data.url); break;
        }
    }, false);
    
`;
