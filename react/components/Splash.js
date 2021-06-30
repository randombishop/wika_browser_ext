'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var layoutStyle = { display: "grid", gridAutoColumns: "1fr", gridAutoFlow: "column" };
var columnStyle = { padding: "10px", fontSize: "larger", textAlign: "center" };

var Splash = function (_React$Component) {
    _inherits(Splash, _React$Component);

    function Splash(props) {
        _classCallCheck(this, Splash);

        var _this = _possibleConstructorReturn(this, (Splash.__proto__ || Object.getPrototypeOf(Splash)).call(this, props));

        _this.navigate = function (page) {
            _this.setState({ page: page });
        };

        _this.renderSwitch = function () {
            switch (_this.state.page) {
                case "welcome":
                    return React.createElement(Welcome, { navigate: _this.navigate });
                case "new_account":
                    return React.createElement(NewAccount, { done: _this.props.done });
                default:
                    return React.createElement(Loading, null);
            }
        };

        _this.render = function () {
            return React.createElement(
                "div",
                { style: { padding: '20px' } },
                _this.renderSwitch()
            );
        };

        _this.state = { page: 'welcome' };
        return _this;
    }

    return Splash;
}(React.Component);