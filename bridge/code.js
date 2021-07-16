const JS_CODE = `

    function postMessageToBridge(msg) {
        window.postMessage(msg, "http://localhost:3000/*");
    }

    function sendAccountResponse() {
        var state = window.wikaReactApp.state ;
        var msg = {
            type: 'AccountRes',
            account: state.account,
            balance: state.balance
        }
        postMessageToBridge(msg) ;
    }
    
    function processUrlReq(tab, url) {
        try {
            var address = window.wikaReactApp.state.account.address ;
            var network = window.wikaReactApp.wikaNetwork ;
            network.getUrlInfo(address, url, (msg) => {
                msg.type = "UrlRes" ;
                msg.tab = tab ;
                msg.url = url ;
                postMessageToBridge(msg) ;
            }) ;
        } catch (err) {
        }
    }
    
    function processLikeReq(tab, url, urlRef, numLikes) {
        try {
            var source = window.wikaReactApp.state.account.source ;
            var address = window.wikaReactApp.state.account.address ;
            var network = window.wikaReactApp.wikaNetwork ;
            network.txLikeExt(source, address, url, urlRef, numLikes, (msg) => {
                msg.type = 'LikeRes' ;
                msg.tab = tab ;
                msg.url = url ;
                postMessageToBridge(msg) ;
            }) ;
        } catch (err) {
            postMessageToBridge({type: 'LikeRes', status: 'Error', err: err}) ; ;
        }
    }
    
    window.addEventListener("message", function (event) {
        var data = event.data ;
        switch (data.type) {
            case 'AccountReq': sendAccountResponse(); break;
            case 'UrlReq': processUrlReq(data.tab, data.url); break;
            case 'LikeReq': processLikeReq(data.tab, data.url, "", data.numLikes); break;
        }
    }, false);
    
`;
