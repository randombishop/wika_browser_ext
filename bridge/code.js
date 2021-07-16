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
        console.log('processUrlReq '+tab+' -> '+url) ;
    }
    
    window.addEventListener("message", function (event) {
        var data = event.data ;
        switch (data.type) {
            case 'AccountReq': sendAccountResponse(); break;
            case 'UrlReq': processUrlReq(data.tab, data.url); break;
        }
    }, false);
    
`;
