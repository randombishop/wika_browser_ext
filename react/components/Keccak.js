'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Keccak = function (_React$Component) {
    _inherits(Keccak, _React$Component);

    function Keccak(props) {
        _classCallCheck(this, Keccak);

        var _this = _possibleConstructorReturn(this, (Keccak.__proto__ || Object.getPrototypeOf(Keccak)).call(this, props));

        _this.updateText = function (event) {
            _this.setState({ text: event.target.value });
        };

        _this.generateHash = function () {
            var text = _this.state.text;
            var hash = window.polkadot_crypto.keccakAsHex(text);
            _this.setState({
                hash: hash
            });
        };

        _this.copy = function () {
            copyToClipboard("keccak_hash_element");
        };

        _this.state = {
            text: "",
            hash: ""
        };
        return _this;
    }

    _createClass(Keccak, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "h5",
                    null,
                    "Keccak"
                ),
                React.createElement(
                    "label",
                    null,
                    "Text"
                ),
                React.createElement("textarea", { value: this.state.text, onChange: this.updateText }),
                React.createElement(
                    "button",
                    { onClick: this.generateHash },
                    "Hash"
                ),
                React.createElement("input", { id: "keccak_hash_element",
                    type: "text",
                    value: this.state.hash,
                    readOnly: true,
                    style: {
                        fontSize: '10px',
                        textAlign: 'center'
                    }
                }),
                React.createElement(
                    "button",
                    { onClick: this.copy },
                    "Copy to clipboard"
                )
            );
        }
    }]);

    return Keccak;
}(React.Component);

Keccak.contextType = AppContext;