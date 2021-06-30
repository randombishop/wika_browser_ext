'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inputAddressStyle = {
    fontSize: '10px',
    textAlign: 'center'
};

var NewAccountImportAddress = function (_React$Component) {
    _inherits(NewAccountImportAddress, _React$Component);

    function NewAccountImportAddress(props) {
        _classCallCheck(this, NewAccountImportAddress);

        var _this = _possibleConstructorReturn(this, (NewAccountImportAddress.__proto__ || Object.getPrototypeOf(NewAccountImportAddress)).call(this, props));

        _this.handleInputChange = function (event) {
            _this.setState({ phrase: event.target.value });
        };

        _this.import = function () {
            try {
                var account = chrome.extension.getBackgroundPage().importAccount(_this.state.phrase);
                account.imported = true;
                _this.setState(account);
            } catch (e) {
                alert(e);
            }
        };

        _this.back = function () {
            _this.setState({
                imported: false,
                address: null,
                addressRaw: null,
                phrase: ""
            });
        };

        _this.next = function () {
            _this.props.next(_this.state.address, _this.state.addressRaw, _this.state.phrase);
        };

        _this.state = {
            imported: false,
            address: null,
            addressRaw: null,
            phrase: ""
        };
        return _this;
    }

    _createClass(NewAccountImportAddress, [{
        key: 'render2',
        value: function render2() {
            if (this.state.imported) {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement('br', null),
                    React.createElement(
                        'label',
                        null,
                        'Public Address'
                    ),
                    React.createElement('input', { type: 'text',
                        value: this.state.address,
                        readOnly: true,
                        style: inputAddressStyle
                    }),
                    React.createElement(
                        'div',
                        { style: { display: 'flex' } },
                        React.createElement(
                            'div',
                            { style: { flex: '50%', paddingRight: '10px' } },
                            React.createElement(
                                'button',
                                { className: 'secondary', onClick: this.back },
                                'Clear'
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { flex: '50%', paddingLeft: '10px' } },
                            React.createElement(
                                'button',
                                { className: 'primary', onClick: this.next },
                                'Continue'
                            )
                        )
                    )
                );
            } else {
                return React.createElement(
                    'button',
                    { onClick: this.import, className: 'secondary' },
                    'Import'
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'main',
                null,
                React.createElement(
                    'h4',
                    null,
                    'Import your address'
                ),
                React.createElement(
                    'label',
                    null,
                    'Your 12-words phrase'
                ),
                React.createElement('textarea', { id: 'account_secret_element',
                    value: this.state.phrase,
                    onChange: this.handleInputChange,
                    readOnly: this.state.imported
                }),
                this.render2()
            );
        }
    }]);

    return NewAccountImportAddress;
}(React.Component);