
const BACKGROUND = {
    cryptoReady: false,
    network: null
}

function bytesToHex(byteArray) {
    var s = '0x';
    byteArray.forEach(function (byte) {
        s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
    });
    return s;
}

window.loadCrypto = (callback) => {
    if (BACKGROUND.cryptoReady) {
        callback() ;
    } else {
        polkadot_crypto.cryptoWaitReady().then(() => {
            BACKGROUND.cryptoReady = true ;
            callback() ;
        }) ;
    }
}

window.connectNetwork = (callback) => {
    if (BACKGROUND.network) {
        callback(BACKGROUND.network) ;
    } else {
        let network = new WikaNetwork() ;
        network.connect(() => {
            BACKGROUND.network = network ;
            callback(BACKGROUND.network) ;
        }) ;
    }
}

window.closeNetwork = (callback) => {
    if (!BACKGROUND.network) {
        callback() ;
    } else {
        BACKGROUND.network.disconnect(callback) ;
    }
}

window.importAccount = (phrase) => {
    let keyring = new window.polkadot_api.Keyring({ type: 'sr25519' });
    let newPair = keyring.addFromUri(phrase) ;
    let account = {
        address: newPair.address,
        addressRaw: bytesToHex(newPair.addressRaw),
        phrase: phrase
    } ;
    return account ;
}

window.generateNewAccount = () => {
    let phrase = polkadot_crypto.mnemonicGenerate(12);
    return window.importAccount(phrase) ;
}
