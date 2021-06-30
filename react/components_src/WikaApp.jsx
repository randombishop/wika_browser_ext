'use strict';


const AppContext = React.createContext();

const styleMini = {width: "500px", height: "42px", padding: 0, margin: 0, overflowY: 'hidden'} ;

const styleMaxi = {width: "500px", height: "600px", padding: 0, margin: 0, overflowY: 'hidden'} ;

const styleMainContentDiv = {padding: '20px', width:'100%', height: '490px', overflowY: 'auto', overflowX: 'hidden'} ;


class WikaApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phase: 'loading_context',
            context: {},
            minimized: true,
            balanceWika: null,
            balanceUsd: null,
            url: null,
            title: null,
            referrer: null,
            likePrice: null,
            rewardPrct: '33%',
            rewardTarget: 1.33,
            rewardWaitFactor: 4,
            urlLikes: null,
            likesSubmittedAt: null,
            likesSubmittedCount: null,
            likesSubmittedRemaining: null
        };
        this.wikaContext = new WikaContext(this) ;
    }

    componentDidMount = () => {
        this.loadContext() ;
    }

    loadContext = () => {
        let self = this ;
        self.setState({phase:'loading_context'}, () => {
            self.wikaContext.load(self.loadCrypto) ;
        }) ;
    }

    loadCrypto = () => {
        let self = this ;
        self.setState({phase:'loading_crypto'}, () => {
            chrome.extension.getBackgroundPage().loadCrypto(self.startSwitch) ;
        }) ;
    }

    startSwitch = () => {
        if (this.state.context.account) {
            this.connect() ;
        } else {
            this.setState({phase:'onboarding'}) ;
        }
    }

    connect = () => {
        let self = this ;
        self.setState({phase:'connecting'}, () => {
            chrome.extension.getBackgroundPage().connectNetwork((network) => {
                self.wikaNetwork = network ;
                self.wikaNetwork.setAccount(self.state.context.account) ;
                self.setState({phase: 'ready'}, this.subscribeToBalance) ;
            }) ;
        }) ;
    }

    updateContext = (update, callback) => {
        let newContext = Object.assign({}, this.state.context, update);
        this.wikaContext.save(newContext) ;
        this.setState({context: newContext}, callback) ;
    }

    newAccountDone = (address, addressRaw, phrase) => {
        let account = {
            address: address,
            addressRaw: addressRaw,
            phrase: phrase
        };
        this.updateContext({account:account, tab:'like'}, this.connect) ;
    }

    subscribeToBalance = () => {
        let self = this;
        let address = this.state.context.account.address;
        self.wikaNetwork.getBalance(address, (result) => {
            let balanceWika = convertToWika(result.data.free) ;
            let balanceUsd = balanceWika/6.5 ;
            self.setState({
                balanceWika:balanceWika,
                balanceUsd:balanceUsd
            }, self.getCurrentTab);
        }).then((s) => {
            self.unsubGetBalance = s ;
        });
    }

    getCurrentTab = () => {
        let self = this;
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];
            self.setState({
                tabId: activeTab.id,
                url: activeTab.url,
                title: activeTab.title
            }, self.getReferrer);
        });
    }

    getReferrer = () => {
        let self = this;
        try {
            chrome.tabs.executeScript(
                self.state.tabId,
                {code: "document.referrer;"},
                (result) => {
                    self.setState({referrer: result}, self.getLikePrice);
                }
            );
        } catch (err) {
            self.setState({referrer: ""}, self.getLikePrice);
        }
    }

    getLikePrice = () => {
        let self = this;
        self.wikaNetwork.getLikePrice((result) => {
            let price = convertToWika(result) ;
            self.setState({likePrice:price}, self.subscribeToUrl) ;
        })
    }

    subscribeToUrl = () => {
        let self = this;
        let url = this.state.url;
        self.wikaNetwork.getUrl(url, (result) => {
            let urlLikes = Number(result[0]) ;
            self.setState({urlLikes:urlLikes}, self.subscribeToLike) ;
        }).then((s) => {
            self.unsubUrl = s ;
        });
    }

    subscribeToLike = () => {
        let self = this;
        let address = this.state.context.account.address;
        let url = this.state.url;
        self.wikaNetwork.getLike(address, url, (result) => {
            self.setState({
                likesSubmittedAt:Number(result[0]),
                likesSubmittedCount:Number(result[1]),
                likesSubmittedRemaining:Number(result[2])
            }) ;
        }).then((s) => {
            self.unsubLike = s ;
        });
    }

    componentWillUnmount = () => {
        if (this.unsubGetBalance) {
            this.unsubGetBalance() ;
        }
        if (this.unsubUrl) {
            this.unsubUrl() ;
        }
        if (this.unsubLike) {
            this.unsubLike() ;
        }
    }

    switchMiniMaxi = () => {
        let minimized = !this.state.minimized ;
        this.setState({minimized:minimized}) ;
    }

    renderOnboarding = () => {
        return (
            <div style={styleMaxi}>
                <Splash done={this.newAccountDone} /> ;
            </div>
        ) ;
    }

    renderLoading = () => {
        return (
            <div style={styleMini}>
                <Loading />
            </div>
        ) ;
    }

    renderMaxi = () => {
        return (
            <div style={styleMaxi}>
                <MiniBar minimized={this.state.minimized} switch={this.switchMiniMaxi} />
                <NavBar />
                <div style={styleMainContentDiv}>
                    <MainContent />
                </div>
            </div>
        );
    }

    renderMini = () => {
        return (
            <div style={styleMini}>
                <MiniBar minimized={this.state.minimized} switch={this.switchMiniMaxi} />
            </div>
        );
    }

    renderMinMax = () => {
        if (this.state.minimized) {
            return this.renderMini() ;
        } else {
            return this.renderMaxi() ;
        }
    }

    renderMain = () => {
        return (
            <AppContext.Provider value={{
                tab: this.state.context.tab,
                address: this.state.context.account.address,
                addressRaw: this.state.context.account.addressRaw,
                update:this.updateContext,
                network: this.wikaNetwork,
                balanceWika: this.state.balanceWika,
                balanceUsd: this.state.balanceUsd,
                url: this.state.url,
                title: this.state.title,
                referrer: this.state.referrer,
                likePrice: this.state.likePrice,
                rewardPrct: this.state.rewardPrct,
                rewardTarget: this.state.rewardTarget,
                rewardWaitFactor: this.state.rewardWaitFactor,
                urlLikes: this.state.urlLikes,
                likesSubmittedAt: this.state.likesSubmittedAt,
                likesSubmittedCount: this.state.likesSubmittedCount,
                likesSubmittedRemaining: this.state.likesSubmittedRemaining
            }}>
                {this.renderMinMax()}
            </AppContext.Provider>
        ) ;
    }

    render = () => {
        switch (this.state.phase) {
            case 'ready': return this.renderMain() ;
            case 'onboarding': return this.renderOnboarding() ;
            default: return this.renderLoading() ;
        }
    }

}


