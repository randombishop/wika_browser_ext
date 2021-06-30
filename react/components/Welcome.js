'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var layoutStyle = { display: "grid", gridAutoColumns: "1fr", gridAutoFlow: "column" };
var columnStyle = { padding: "10px", fontSize: "15px", textAlign: "center" };

var Welcome = function (_React$Component) {
    _inherits(Welcome, _React$Component);

    function Welcome(props) {
        _classCallCheck(this, Welcome);

        return _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this, props));
    }

    _createClass(Welcome, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "main",
                { style: { textAlign: "center" } },
                React.createElement(
                    "h3",
                    null,
                    "Welcome to the Wika Network!"
                ),
                React.createElement(
                    "div",
                    { style: layoutStyle },
                    React.createElement(
                        "div",
                        { style: columnStyle },
                        React.createElement("img", { src: "images/splash1.png", width: "125" }),
                        " ",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "Like your favorite pages and reward the authors and previous likers."
                    ),
                    React.createElement(
                        "div",
                        { style: columnStyle },
                        React.createElement("img", { src: "images/splash2.png", width: "125" }),
                        " ",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "Lay breadcrumbs so that others can follow your steps towards good quality content."
                    ),
                    React.createElement(
                        "div",
                        { style: columnStyle },
                        React.createElement("img", { src: "images/splash3.png", width: "125" }),
                        " ",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "Earn rewards and participate to the daily lottery."
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "h3",
                    null,
                    "Together, let's make the internet a better place and spread quality content."
                ),
                React.createElement(
                    "button",
                    { className: "primary", onClick: function onClick() {
                            return _this2.props.navigate('new_account');
                        } },
                    "Get Started Now!"
                )
            );
        }
    }]);

    return Welcome;
}(React.Component);