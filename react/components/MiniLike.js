'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styleSlider = {
    width: "90px",
    paddingTop: "11px",
    "--input-background": "rgb(142, 36, 170)",
    "--input-border": "lightgray",
    "--text": "#a2afb9"
};

var MiniLike = function (_React$Component) {
    _inherits(MiniLike, _React$Component);

    function MiniLike(props) {
        _classCallCheck(this, MiniLike);

        var _this = _possibleConstructorReturn(this, (MiniLike.__proto__ || Object.getPrototypeOf(MiniLike)).call(this, props));

        _this.handleNumLikeChange = function (event) {
            _this.setState({ numLikes: event.target.value }, _this.update);
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

        _this.renderTxStatus = function () {
            return React.createElement(
                "div",
                { style: { paddingLeft: '20px', paddingTop: '5px', fontSize: '16px' } },
                React.createElement("i", { className: "fas fa-spinner" }),
                "\xA0\xA0\xA0",
                _this.state.txStatus
            );
        };

        _this.renderNewLike = function () {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { style: { marginLeft: "15px" } },
                    React.createElement("input", { type: "range", min: "1", max: "100",
                        value: _this.state.numLikes,
                        onChange: _this.handleNumLikeChange,
                        style: styleSlider
                    })
                ),
                React.createElement(
                    "div",
                    { style: { marginLeft: "15px" } },
                    React.createElement(
                        "button",
                        { className: "secondary",
                            onClick: _this.submitLike,
                            style: { height: "32px", width: "70px", padding: 0, borderLeft: "solid 1px #a2afb9" } },
                        _this.state.numLikes,
                        " ",
                        React.createElement("i", { className: "fas fa-thumbs-up" })
                    )
                )
            );
        };

        _this.renderAlreadyLiked = function () {
            return React.createElement(
                "div",
                { style: { paddingLeft: '20px', paddingTop: '5px', fontSize: '16px' } },
                React.createElement("i", { className: "far fa-paper-plane" }),
                "\xA0\xA0",
                _this.context.likesSubmittedCount,
                " ",
                React.createElement("i", { className: "fas fa-thumbs-up" }),
                "\xA0\xA0",
                React.createElement(
                    "small",
                    null,
                    "(sent at #",
                    _this.context.likesSubmittedAt + 1,
                    ")"
                )
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

    _createClass(MiniLike, [{
        key: "render",
        value: function render() {
            if (this.context.likesSubmittedCount == 0) {
                if (this.state.txStatus != null) {
                    return this.renderTxStatus();
                } else {
                    return this.renderNewLike();
                }
            } else {
                return this.renderAlreadyLiked();
            }
        }
    }]);

    return MiniLike;
}(React.Component);

MiniLike.contextType = AppContext;