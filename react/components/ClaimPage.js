'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClaimPage = function (_React$Component) {
    _inherits(ClaimPage, _React$Component);

    function ClaimPage(props) {
        _classCallCheck(this, ClaimPage);

        var _this = _possibleConstructorReturn(this, (ClaimPage.__proto__ || Object.getPrototypeOf(ClaimPage)).call(this, props));

        _this.DEFAULT_ACCOUNT = "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM";
        _this.NUM_BLOCKS_TO_WAIT = 10;
        _this.styleTextArea = {
            fontFamily: 'monospace',
            fontSize: '9px'
        };
        _this.styleButton = {
            padding: 0,
            marginBottom: '4px'
        };

        _this.componentDidMount = function () {
            _this.getOwnersRequestPrice();
            _this.subscribeToUrlOwner();
            _this.subscribeToOwnerRequest();
            _this.subscribeToOwnerResult();
            _this.subscribeToBlockNumber();
        };

        _this.getOwnersRequestPrice = function () {
            var self = _this;
            self.context.network.getOwnersRequestPrice(function (result) {
                var price = convertToWika(result);
                self.setState({ requestPrice: price });
            });
        };

        _this.subscribeToUrlOwner = function () {
            var self = _this;
            var url = _this.context.url;
            self.context.network.getUrlOwner(url, function (result) {
                self.setState({
                    owner: result
                });
            }).then(function (s) {
                self.unsubUrlOwner = s;
            });
        };

        _this.subscribeToOwnerRequest = function () {
            var self = _this;
            var url = _this.context.url;
            self.context.network.getOwnerRequest(url, function (result) {
                self.setState({
                    requestBlock: Number(result[0]),
                    requestAccount: result[1]
                });
            }).then(function (s) {
                self.unsubOwnerRequest = s;
            });
        };

        _this.subscribeToOwnerResult = function () {
            var self = _this;
            var url = _this.context.url;
            self.context.network.getOwnerResult(url, function (result) {
                var data = {
                    resultBlock: Number(result[0]),
                    resultNumVotes: Number(result[1]),
                    resultNumVotesYes: Number(result[2]),
                    resultNumVotesMajority: Number(result[3]),
                    resultIntro: result[4],
                    resultMark: result[5],
                    resultOutcome: result[6] == true
                };
                self.setState(data);
            }).then(function (s) {
                self.unsubOwnerResult = s;
            });
        };

        _this.subscribeToBlockNumber = function () {
            var self = _this;
            self.context.network.getBlockNumber(function (result) {
                self.setState({
                    currentBlock: Number(result)
                });
            }).then(function (s) {
                self.unsubBlockNumber = s;
            });
        };

        _this.submitRequest = function () {
            var self = _this;
            var url = _this.context.url;
            self.setState({ txStatus: 'Sending...' }, function () {
                self.context.network.txOwnerRequest(url, self.monitorRequest).then(function (s) {
                    self.unsubTransaction = s;
                });
            });
        };

        _this.monitorRequest = function (result) {
            var status = result.status;
            if (status.isInBlock) {
                _this.setState({ txStatus: 'In block...' });
            } else if (status.isFinalized) {
                _this.setState({ txStatus: null });
                _this.unsubTransaction();
                var error = parseError(result);
                if (error) {
                    alert(error);
                }
            }
        };

        _this.componentWillUnmount = function () {
            if (_this.unsubUrlOwner) {
                _this.unsubUrlOwner();
            }
            if (_this.unsubOwnerRequest) {
                _this.unsubOwnerRequest();
            }
            if (_this.unsubOwnerResult) {
                _this.unsubOwnerResult();
            }
            if (_this.unsubBlockNumber) {
                _this.unsubBlockNumber();
            }
        };

        _this.copyMark = function () {
            copyToClipboard("wika_mark_element");
        };

        _this.testUrl = function () {
            /*let self = this;
            let url = self.context.url ;
            fetch(url, {
                  method: "GET",
                })
                .then(response => console.log(response))
                .catch(err => console.log(err));*/
        };

        _this.renderPreparation = function () {
            if (_this.state.owner != _this.context.address) {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'label',
                        null,
                        'Preparation'
                    ),
                    React.createElement(
                        'div',
                        { style: { display: 'flex' } },
                        React.createElement(
                            'div',
                            { style: { flex: '33%', paddingRight: '10px', textAlign: 'center' } },
                            React.createElement(
                                'button',
                                { style: _this.styleButton,
                                    className: 'outline',
                                    onClick: _this.copyMark },
                                '1. Copy this'
                            ),
                            React.createElement('input', { id: 'wika_mark_element',
                                type: 'text',
                                readOnly: true,
                                defaultValue: "wika.network/author/" + _this.context.addressRaw })
                        ),
                        React.createElement(
                            'div',
                            { style: { flex: '33%', textAlign: 'center' } },
                            React.createElement(
                                'button',
                                { disabled: true,
                                    style: _this.styleButton,
                                    className: 'outline' },
                                '2. Insert it'
                            ),
                            React.createElement(
                                'small',
                                null,
                                '(Use an invisible img or link for example.)'
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { flex: '33%', paddingLeft: '10px', textAlign: 'center' } },
                            React.createElement(
                                'button',
                                { disabled: true,
                                    style: _this.styleButton,
                                    className: 'outline',
                                    onClick: _this.testUrl },
                                '3. Test it'
                            ),
                            React.createElement(
                                'small',
                                null,
                                _this.renderTestResult()
                            )
                        )
                    )
                );
            } else {
                return "";
            }
        };

        _this.renderTestResult = function () {
            if (_this.state.testResult == null) {
                return "";
            } else if (_this.state.testResult == true) {
                return "YES";
            } else {
                return "NO";
            }
        };

        _this.renderButton = function () {
            if (_this.state.txStatus == null) {
                return React.createElement(
                    'button',
                    { onClick: _this.submitRequest, style: { marginBottom: '2px' } },
                    'Submit your request'
                );
            } else {
                return React.createElement(
                    'button',
                    { disabled: true, style: { marginBottom: '2px' } },
                    React.createElement('i', { className: 'fas fa-spinner' }),
                    '\xA0\xA0',
                    _this.state.txStatus
                );
            }
        };

        _this.renderSubmitRequest = function () {
            if (_this.state.owner != _this.context.address) {
                return React.createElement(
                    React.Fragment,
                    null,
                    _this.renderButton(),
                    React.createElement(
                        'small',
                        null,
                        'Note that the request fee is ',
                        _this.state.requestPrice,
                        ' W'
                    )
                );
            } else {
                return "";
            }
        };

        _this.renderMyRequestProgress = function () {
            var blocks_done = _this.state.currentBlock - _this.state.requestBlock;
            var blocks_remaining = _this.NUM_BLOCKS_TO_WAIT - blocks_done;
            return React.createElement(
                React.Fragment,
                null,
                React.createElement('hr', null),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Waiting for verification results (',
                    blocks_done,
                    '/',
                    _this.NUM_BLOCKS_TO_WAIT,
                    ')...'
                ),
                React.createElement('progress', { value: blocks_done, max: _this.NUM_BLOCKS_TO_WAIT })
            );
        };

        _this.renderMyRequestResult = function () {
            var icon = _this.state.resultOutcome ? "fas fa-vote-yea" : "fas fa-times";
            return React.createElement(
                React.Fragment,
                null,
                React.createElement('hr', null),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { style: { fontSize: '18px', marginBottom: '15px' } },
                    React.createElement('i', { className: icon }),
                    '\xA0\xA0 Your request was ',
                    _this.state.resultOutcome ? "approved" : "rejected",
                    '.'
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Verifications: ',
                    _this.state.resultNumVotes
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Approvals: ',
                    _this.state.resultNumVotesYes
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Page intro'
                ),
                React.createElement('textarea', { style: _this.styleTextArea,
                    defaultValue: bytesToString(_this.state.resultIntro),
                    readOnly: true }),
                React.createElement(
                    'label',
                    null,
                    'Mark found'
                ),
                React.createElement('textarea', { style: _this.styleTextArea,
                    defaultValue: bytesToString(_this.state.resultMark),
                    readOnly: true })
            );
        };

        _this.renderMyRequest = function () {
            if (_this.state.resultBlock == 0) {
                return _this.renderMyRequestProgress();
            } else {
                return _this.renderMyRequestResult();
            }
        };

        _this.renderOtherRequest = function () {
            return React.createElement(
                'p',
                null,
                React.createElement('i', { className: 'fas fa-exclamation-triangle' }),
                ' \xA0 There is currently another user trying to claim ownership for this URL.'
            );
        };

        _this.renderFooter = function () {
            var currentRequester = _this.state.requestAccount;
            if (currentRequester == _this.DEFAULT_ACCOUNT) {
                return _this.renderSubmitRequest();
            } else if (currentRequester == _this.context.address) {
                return _this.renderMyRequest();
            } else {
                return _this.renderOtherRequest();
            }
        };

        _this.formatOwner = function (owner) {
            if (owner == _this.DEFAULT_ACCOUNT) {
                return "-";
            } else if (owner == _this.context.address) {
                return "You are the owner!";
            } else {
                return owner;
            }
        };

        _this.state = {
            requestPrice: null,
            owner: null,
            txStatus: null,
            requestBlock: null,
            requestAccount: null,
            currentBlock: null,
            testResult: null
        };
        return _this;
    }

    _createClass(ClaimPage, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'main',
                null,
                React.createElement(
                    'h5',
                    null,
                    'Claim Page Ownership'
                ),
                React.createElement(
                    'label',
                    null,
                    'Webpage'
                ),
                React.createElement('input', { type: 'text', readOnly: true, defaultValue: this.context.url }),
                React.createElement(
                    'label',
                    null,
                    'Current Owner'
                ),
                React.createElement('input', { type: 'text', readOnly: true, defaultValue: this.formatOwner(this.state.owner) }),
                this.renderPreparation(),
                this.renderFooter()
            );
        }
    }]);

    return ClaimPage;
}(React.Component);

ClaimPage.contextType = AppContext;