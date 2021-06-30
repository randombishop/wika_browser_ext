'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppContext = React.createContext();

var styleMini = { width: "500px", height: "42px", padding: 0, margin: 0, overflowY: 'hidden' };

var styleMaxi = { width: "500px", height: "600px", padding: 0, margin: 0, overflowY: 'hidden' };

var styleMainContentDiv = { padding: '20px', width: '100%', height: '490px', overflowY: 'auto', overflowX: 'hidden' };

var WikaApp = function (_React$Component) {
    _inherits(WikaApp, _React$Component);

    function WikaApp(props) {
        _classCallCheck(this, WikaApp);

        var _this = _possibleConstructorReturn(this, (WikaApp.__proto__ || Object.getPrototypeOf(WikaApp)).call(this, props));

        _this.componentDidMount = function () {
            _this.loadContext();
        };

        _this.loadContext = function () {
            var self = _this;
            self.setState({ phase: 'loading_context' }, function () {
                self.wikaContext.load(self.loadCrypto);
            });
        };

        _this.loadCrypto = function () {
            var self = _this;
            self.setState({ phase: 'loading_crypto' }, function () {
                chrome.extension.getBackgroundPage().loadCrypto(self.startSwitch);
            });
        };

        _this.startSwitch = function () {
            if (_this.state.context.account) {
                _this.connect();
            } else {
                _this.setState({ phase: 'onboarding' });
            }
        };

        _this.connect = function () {
            var self = _this;
            self.setState({ phase: 'connecting' }, function () {
                chrome.extension.getBackgroundPage().connectNetwork(function (network) {
                    self.wikaNetwork = network;
                    self.wikaNetwork.setAccount(self.state.context.account);
                    self.setState({ phase: 'ready' }, _this.subscribeToBalance);
                });
            });
        };

        _this.updateContext = function (update, callback) {
            var newContext = Object.assign({}, _this.state.context, update);
            _this.wikaContext.save(newContext);
            _this.setState({ context: newContext }, callback);
        };

        _this.newAccountDone = function (address, addressRaw, phrase) {
            var account = {
                address: address,
                addressRaw: addressRaw,
                phrase: phrase
            };
            _this.updateContext({ account: account, tab: 'like' }, _this.connect);
        };

        _this.subscribeToBalance = function () {
            var self = _this;
            var address = _this.state.context.account.address;
            self.wikaNetwork.getBalance(address, function (result) {
                var balanceWika = convertToWika(result.data.free);
                var balanceUsd = balanceWika / 6.5;
                self.setState({
                    balanceWika: balanceWika,
                    balanceUsd: balanceUsd
                }, self.getCurrentTab);
            }).then(function (s) {
                self.unsubGetBalance = s;
            });
        };

        _this.getCurrentTab = function () {
            var self = _this;
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var activeTab = tabs[0];
                self.setState({
                    tabId: activeTab.id,
                    url: activeTab.url,
                    title: activeTab.title
                }, self.getReferrer);
            });
        };

        _this.getReferrer = function () {
            var self = _this;
            try {
                chrome.tabs.executeScript(self.state.tabId, { code: "document.referrer;" }, function (result) {
                    self.setState({ referrer: result }, self.getLikePrice);
                });
            } catch (err) {
                self.setState({ referrer: "" }, self.getLikePrice);
            }
        };

        _this.getLikePrice = function () {
            var self = _this;
            self.wikaNetwork.getLikePrice(function (result) {
                var price = convertToWika(result);
                self.setState({ likePrice: price }, self.subscribeToUrl);
            });
        };

        _this.subscribeToUrl = function () {
            var self = _this;
            var url = _this.state.url;
            self.wikaNetwork.getUrl(url, function (result) {
                var urlLikes = Number(result[0]);
                self.setState({ urlLikes: urlLikes }, self.subscribeToLike);
            }).then(function (s) {
                self.unsubUrl = s;
            });
        };

        _this.subscribeToLike = function () {
            var self = _this;
            var address = _this.state.context.account.address;
            var url = _this.state.url;
            self.wikaNetwork.getLike(address, url, function (result) {
                self.setState({
                    likesSubmittedAt: Number(result[0]),
                    likesSubmittedCount: Number(result[1]),
                    likesSubmittedRemaining: Number(result[2])
                });
            }).then(function (s) {
                self.unsubLike = s;
            });
        };

        _this.componentWillUnmount = function () {
            if (_this.unsubGetBalance) {
                _this.unsubGetBalance();
            }
            if (_this.unsubUrl) {
                _this.unsubUrl();
            }
            if (_this.unsubLike) {
                _this.unsubLike();
            }
        };

        _this.switchMiniMaxi = function () {
            var minimized = !_this.state.minimized;
            _this.setState({ minimized: minimized });
        };

        _this.renderOnboarding = function () {
            return React.createElement(
                "div",
                { style: styleMaxi },
                React.createElement(Splash, { done: _this.newAccountDone }),
                " ;"
            );
        };

        _this.renderLoading = function () {
            return React.createElement(
                "div",
                { style: styleMini },
                React.createElement(Loading, null)
            );
        };

        _this.renderMaxi = function () {
            return React.createElement(
                "div",
                { style: styleMaxi },
                React.createElement(MiniBar, { minimized: _this.state.minimized, "switch": _this.switchMiniMaxi }),
                React.createElement(NavBar, null),
                React.createElement(
                    "div",
                    { style: styleMainContentDiv },
                    React.createElement(MainContent, null)
                )
            );
        };

        _this.renderMini = function () {
            return React.createElement(
                "div",
                { style: styleMini },
                React.createElement(MiniBar, { minimized: _this.state.minimized, "switch": _this.switchMiniMaxi })
            );
        };

        _this.renderMinMax = function () {
            if (_this.state.minimized) {
                return _this.renderMini();
            } else {
                return _this.renderMaxi();
            }
        };

        _this.renderMain = function () {
            return React.createElement(
                AppContext.Provider,
                { value: {
                        tab: _this.state.context.tab,
                        address: _this.state.context.account.address,
                        addressRaw: _this.state.context.account.addressRaw,
                        update: _this.updateContext,
                        network: _this.wikaNetwork,
                        balanceWika: _this.state.balanceWika,
                        balanceUsd: _this.state.balanceUsd,
                        url: _this.state.url,
                        title: _this.state.title,
                        referrer: _this.state.referrer,
                        likePrice: _this.state.likePrice,
                        rewardPrct: _this.state.rewardPrct,
                        rewardTarget: _this.state.rewardTarget,
                        rewardWaitFactor: _this.state.rewardWaitFactor,
                        urlLikes: _this.state.urlLikes,
                        likesSubmittedAt: _this.state.likesSubmittedAt,
                        likesSubmittedCount: _this.state.likesSubmittedCount,
                        likesSubmittedRemaining: _this.state.likesSubmittedRemaining
                    } },
                _this.renderMinMax()
            );
        };

        _this.render = function () {
            switch (_this.state.phase) {
                case 'ready':
                    return _this.renderMain();
                case 'onboarding':
                    return _this.renderOnboarding();
                default:
                    return _this.renderLoading();
            }
        };

        _this.state = {
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
        _this.wikaContext = new WikaContext(_this);
        return _this;
    }

    return WikaApp;
}(React.Component);