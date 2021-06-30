'use strict';

//const ENDPOINT = "ws://127.0.0.1:9944" ;
const ENDPOINT = "wss://testnode3.wika.network:443" ;

class WikaNetwork {

    constructor() {

    }

    connect = (callback) => {
        let self = this ;
        self.wsProvider = new polkadot_api.WsProvider(ENDPOINT) ;
        polkadot_api.ApiPromise.create({ provider: self.wsProvider })
            .then((api) => {
                self.api = api ;
                callback() ;
            }).catch(err => {
                alert(err)
            }) ;
    }

    disconnect = (callback) => {
        this.api.disconnect().then(callback) ;
    }

    setAccount(account) {
        this.keyring = new polkadot_api.Keyring({ type: 'sr25519' });
        this.signer = this.keyring.addFromUri(account.phrase);
    }

    getBalance = (address, callback) => {
        return this.api.query.system.account(address, callback)
            .catch((err) => {
                alert(err) ;
            }) ;
    }

    getUrl = (url, callback) => {
        return this.api.query.likes.urls(url, callback)
            .catch((err) => {
                alert(err) ;
            }) ;
    }

    getLike = (address, url, callback) => {
        return this.api.query.likes.likes(address, url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getLikePrice = (callback) => {
        return this.api.query.likes.likePrice(callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getOwnersRequestPrice = (callback) => {
        return this.api.query.owners.requestPrice(callback)
                .catch((err) => {
                    alert(err) ;
                }) ;
    }

    getUrlOwner = (url, callback) => {
        return this.api.query.owners.owners(url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getOwnerRequest = (url, callback) => {
        return this.api.query.owners.requests(url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getOwnerResult = (url, callback) => {
        return this.api.query.owners.results(url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getBlockNumber = (callback) => {
        return this.api.query.system.number(callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }




    txLike = (url, referrer, numLikes, callback) => {
        return this.api.tx.likes.like(url, referrer, numLikes)
                    .signAndSend(this.signer, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    txOwnerRequest = (url, callback) => {
        return this.api.tx.owners.requestUrlCheck(url)
                    .signAndSend(this.signer, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

}
