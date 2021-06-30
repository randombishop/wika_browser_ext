'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewAccount = function (_React$Component) {
    _inherits(NewAccount, _React$Component);

    function NewAccount(props) {
        _classCallCheck(this, NewAccount);

        var _this = _possibleConstructorReturn(this, (NewAccount.__proto__ || Object.getPrototypeOf(NewAccount)).call(this, props));

        _this.navigate = function (page) {
            _this.setState({ page: page });
        };

        _this.pairCreated = function (address, addressRaw, phrase) {
            var state = {
                page: 'finish',
                address: address,
                addressRaw: addressRaw,
                phrase: phrase
            };
            _this.setState(state);
        };

        _this.finish = function () {
            _this.props.done(_this.state.address, _this.state.addressRaw, _this.state.phrase);
        };

        _this.render = function () {
            switch (_this.state.page) {
                case "intro":
                    return React.createElement(NewAccountIntro, {
                        navigate: _this.navigate });
                case "generate":
                    return React.createElement(NewAccountGenerateAddress, {
                        next: _this.pairCreated });
                case "import":
                    return React.createElement(NewAccountImportAddress, {
                        next: _this.pairCreated });
                case "finish":
                    return React.createElement(NewAccountDone, {
                        address: _this.state.address,
                        next: _this.finish });
                default:
                    return React.createElement(Loading, null);
            }
        };

        _this.state = { page: 'intro' };
        return _this;
    }

    return NewAccount;
}(React.Component);