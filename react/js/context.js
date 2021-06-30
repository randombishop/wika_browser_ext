'use strict';

class WikaContext {

    constructor(wikaApp) {
        this.wikaApp = wikaApp;
        this.context = null;
    }

    load = (callback) => {
        let self = this ;
        window.chrome.storage.local.get(['context'], function(result) {
            if (result.context) {
                self.context = result.context ;
            } else {
                self.context = {tab: 'Splash'} ;
            }
            self.wikaApp.setState({context: self.context}, callback) ;
        });
    };

    save = (context) => {
        this.context = context ;
        window.chrome.storage.local.set({context:context}, function() {});
    };

}


