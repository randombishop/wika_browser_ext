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
    
    window.addEventListener("message", function (event) {
        var data = event.data ;
        if (data.type) {
            switch (data.type) {
                case 'AccountReq': sendAccountResponse();
            }
        }
    }, false);
    
`;
