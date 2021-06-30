'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Like1 = function (_React$Component) {
    _inherits(Like1, _React$Component);

    function Like1(props) {
        _classCallCheck(this, Like1);

        var _this = _possibleConstructorReturn(this, (Like1.__proto__ || Object.getPrototypeOf(Like1)).call(this, props));

        _this.handleNumLikeChange = function (event) {
            _this.setState({ numLikes: event.target.value }, _this.update);
        };

        _this.update = function () {
            var data = _this.context;
            if (data.url && data.likePrice && data.urlLikes != null) {
                _this.setState({
                    totalPrice: _this.state.numLikes * data.likePrice,
                    rewardsAfter: data.rewardWaitFactor * data.urlLikes + 1,
                    rewardCeiling: _this.state.numLikes * data.likePrice * data.rewardTarget
                });
            } else {
                _this.setState({
                    totalPrice: null,
                    rewardsAfter: null,
                    rewardCeiling: null
                });
            }
        };

        _this.submitLike = function () {
            var self = _this;
            var url = _this.context.url;
            var referrer = _this.context.referrer;
            var numLikes = _this.state.numLikes;
            self.setState({ txStatus: 'Sending...' }, function () {
                self.context.network.txLike(url, referrer, numLikes, self.monitorLike).then(function (s) {
                    self.unsubTransaction = s;
                });
            });
        };

        _this.monitorLike = function (result) {
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

        _this.renderButton = function () {
            if (_this.state.txStatus == null) {
                return React.createElement(
                    'button',
                    { onClick: _this.submitLike },
                    'Send ',
                    _this.state.numLikes,
                    ' ',
                    React.createElement('i', { className: 'fas fa-thumbs-up' })
                );
            } else {
                return React.createElement(
                    'button',
                    { disabled: true },
                    React.createElement('i', { className: 'fas fa-spinner' }),
                    ' ',
                    _this.state.txStatus
                );
            }
        };

        _this.render = function () {
            var data = _this.context;
            return React.createElement(
                'main',
                null,
                React.createElement(
                    'label',
                    null,
                    'Webpage'
                ),
                React.createElement(
                    'div',
                    { style: { display: "flex" } },
                    React.createElement(
                        'div',
                        { style: { flex: "80%" } },
                        React.createElement(
                            'strong',
                            null,
                            shortenText(data.title)
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: "20%", textAlign: "right" } },
                        React.createElement(
                            'strong',
                            null,
                            data.urlLikes,
                            ' ',
                            React.createElement('i', { className: 'fas fa-thumbs-up' })
                        )
                    )
                ),
                React.createElement('input', { type: 'text', readOnly: true, defaultValue: data.url }),
                React.createElement(
                    'label',
                    null,
                    'Referrer'
                ),
                React.createElement('input', { type: 'text', readOnly: true, defaultValue: data.referrer }),
                React.createElement(
                    'div',
                    { style: { display: 'flex' } },
                    React.createElement(
                        'div',
                        { style: { flex: '60%' } },
                        React.createElement(
                            'label',
                            null,
                            'How much I like it?'
                        ),
                        React.createElement(
                            'div',
                            { style: { display: 'flex' } },
                            React.createElement(
                                'div',
                                { style: { width: '80px', marginRight: '15px' } },
                                React.createElement('input', { type: 'range', min: '1', max: '100',
                                    value: _this.state.numLikes,
                                    onChange: _this.handleNumLikeChange
                                })
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'strong',
                                    null,
                                    _this.state.numLikes,
                                    ' ',
                                    React.createElement('i', { className: 'fas fa-thumbs-up' })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: '40%' } },
                        React.createElement(
                            'label',
                            null,
                            'Total cost'
                        ),
                        React.createElement('input', { style: { textAlign: "right" }, type: 'text', readOnly: true, defaultValue: _this.state.totalPrice })
                    )
                ),
                _this.renderButton()
            );
        };

        _this.state = {
            numLikes: 1,
            totalPrice: null,
            rewardsAfter: null,
            rewardCeiling: null
        };
        return _this;
    }

    _createClass(Like1, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.update();
        }
    }]);

    return Like1;
}(React.Component);

Like1.contextType = AppContext;