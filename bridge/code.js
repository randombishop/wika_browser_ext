const JS_CODE = `

    function getAccount() {
        var state = window.wikaReactApp.state ;
        var msg = {
            response: 'getAccount',
            account: state.account,
            balance: state.balance
        }
        window.postMessage(msg, "http://localhost:3000/*");
    }
    
    window.addEventListener("message", function (event) {
        var data = event.data ;
        if (data.action) {
            switch (data.action) {
                case 'getAccount': getAccount();
            }
        }
    }, false);
    
`;
