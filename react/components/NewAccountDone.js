'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewAccountDone = function (_React$Component) {
    _inherits(NewAccountDone, _React$Component);

    function NewAccountDone(props) {
        _classCallCheck(this, NewAccountDone);

        return _possibleConstructorReturn(this, (NewAccountDone.__proto__ || Object.getPrototypeOf(NewAccountDone)).call(this, props));
    }

    _createClass(NewAccountDone, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "h4",
                    null,
                    "Congrats, your Wika address is ready!"
                ),
                React.createElement(
                    "label",
                    null,
                    "Your public address"
                ),
                React.createElement("input", { type: "text", disabled: true, value: this.props.address }),
                React.createElement(
                    "p",
                    null,
                    "You can safely share this address to receive Wika tokens. ",
                    React.createElement("br", null),
                    "(But never share the secret 12 words phrase.)"
                ),
                React.createElement(
                    "h4",
                    null,
                    "Now, what can I do in this network?"
                ),
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        "Like web pages to reward the authors and previous likers."
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Claim your web pages ownership to start receiving rewards."
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Participate to daily lotteries and earn more Wika tokens."
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Use your wallet to send and receive Wika tokens instantly across the nework."
                    )
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.next },
                    "Connect to Wika Network!"
                )
            );
        }
    }]);

    return NewAccountDone;
}(React.Component);