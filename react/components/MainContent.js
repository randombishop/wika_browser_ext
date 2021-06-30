'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainContent = function (_React$Component) {
    _inherits(MainContent, _React$Component);

    function MainContent(props) {
        _classCallCheck(this, MainContent);

        var _this = _possibleConstructorReturn(this, (MainContent.__proto__ || Object.getPrototypeOf(MainContent)).call(this, props));

        _this.render = function () {
            switch (_this.context.tab) {
                case "like":
                    return React.createElement(Like, null);
                case "recommend":
                    return React.createElement(Recommended, null);
                case "wallet":
                    return React.createElement(Wallet, null);
                case "account":
                    return React.createElement(Account, null);
                case "claim_page":
                    return React.createElement(ClaimPage, null);
                case "owned_pages":
                    return React.createElement(OwnedPages, null);
                case "history":
                    return React.createElement(History, null);
                case "keccak":
                    return React.createElement(Keccak, null);
                case "blockchains":
                    return React.createElement(Blockchains, null);
                case "about":
                    return React.createElement(About, null);
                default:
                    return React.createElement(Loading, null);
            }
        };

        return _this;
    }

    return MainContent;
}(React.Component);

MainContent.contextType = AppContext;