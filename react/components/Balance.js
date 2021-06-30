'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxStyle = {
    textAlign: "right",
    borderStyle: "dotted",
    borderWidth: "1px",
    padding: "10px",
    borderColor: "#1095c1",
    borderRadius: "10px"
};

var addressInputStyle = {
    width: "100px",
    fontSize: "12px",
    padding: 0,
    margin: 0,
    height: "20px",
    display: "inline"
};

var Balance = function (_React$Component) {
    _inherits(Balance, _React$Component);

    function Balance(props) {
        _classCallCheck(this, Balance);

        var _this = _possibleConstructorReturn(this, (Balance.__proto__ || Object.getPrototypeOf(Balance)).call(this, props));

        _this.formatAddress = function (address) {
            return address.substring(0, 12) + '...' + address.substring(42);
        };

        _this.copyAddress = function () {
            copyToClipboard("wika_address_element");
        };

        return _this;
    }

    _createClass(Balance, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: boxStyle },
                React.createElement("input", { id: "wika_address_element", style: addressInputStyle,
                    type: "text", readOnly: true, value: this.context.address }),
                "\xA0\xA0",
                React.createElement(
                    "a",
                    { href: "#", onClick: this.copyAddress },
                    React.createElement("i", { className: "far fa-copy" })
                ),
                React.createElement("br", null),
                React.createElement(
                    "kbd",
                    null,
                    formatWika(this.context.balanceWika)
                ),
                React.createElement("br", null),
                React.createElement(
                    "small",
                    null,
                    formatUsd(this.context.balanceUsd)
                )
            );
        }
    }]);

    return Balance;
}(React.Component);

Balance.contextType = AppContext;