'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewAccountGenerateAddress = function (_React$Component) {
    _inherits(NewAccountGenerateAddress, _React$Component);

    function NewAccountGenerateAddress(props) {
        _classCallCheck(this, NewAccountGenerateAddress);

        var _this = _possibleConstructorReturn(this, (NewAccountGenerateAddress.__proto__ || Object.getPrototypeOf(NewAccountGenerateAddress)).call(this, props));

        _this.componentDidMount = function () {
            var account = chrome.extension.getBackgroundPage().generateNewAccount();
            _this.setState(account);
        };

        _this.next = function () {
            _this.props.next(_this.state.address, _this.state.addressRaw, _this.state.phrase);
        };

        _this.renderNext = function () {
            var enabled = _this.state.address && _this.state.addressRaw && _this.state.phrase && _this.state.checkSecretSaved;
            return React.createElement(
                "button",
                { onClick: _this.next, disabled: !enabled },
                "Continue"
            );
        };

        _this.handleCheckboxChange = function () {
            _this.setState({ checkSecretSaved: !_this.state.checkSecretSaved });
        };

        _this.copySecret = function () {
            copyToClipboard("account_secret_element");
        };

        _this.state = {
            address: null,
            addressRaw: null,
            phrase: "",
            checkSecretSaved: false
        };
        return _this;
    }

    _createClass(NewAccountGenerateAddress, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "h4",
                    null,
                    "New Wika Network address"
                ),
                React.createElement(
                    "label",
                    null,
                    "Your 12-words phrase"
                ),
                React.createElement("textarea", { id: "account_secret_element",
                    readOnly: true,
                    value: this.state.phrase }),
                React.createElement(
                    "button",
                    { onClick: this.copySecret, className: "secondary" },
                    "Copy to clipboard"
                ),
                React.createElement(
                    "p",
                    null,
                    "Please write down your wallet's mnemonic seed and keep it in a safe place.",
                    React.createElement("br", null),
                    "The mnemonic can be used to restore your wallet. ",
                    React.createElement("br", null),
                    "Keep it carefully to not lose your assets. ",
                    React.createElement("br", null),
                    React.createElement(
                        "strong",
                        null,
                        "Never share this phrase with anyone!"
                    )
                ),
                React.createElement(
                    "fieldset",
                    null,
                    React.createElement(
                        "label",
                        null,
                        React.createElement("input", { type: "checkbox",
                            value: this.state.checkSecretSaved,
                            onChange: this.handleCheckboxChange
                        }),
                        "I have safely saved my secret phrase."
                    )
                ),
                this.renderNext()
            );
        }
    }]);

    return NewAccountGenerateAddress;
}(React.Component);