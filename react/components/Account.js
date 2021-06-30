'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inputBoxStyle = {
    fontSize: '10px',
    textAlign: 'center'
};

var Account = function (_React$Component) {
    _inherits(Account, _React$Component);

    function Account(props) {
        _classCallCheck(this, Account);

        var _this = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, props));

        _this.copyElement = function (element) {
            return function () {
                copyToClipboard(element);
            };
        };

        _this.render = function () {
            return React.createElement(
                'main',
                null,
                React.createElement(
                    'h5',
                    null,
                    'Account'
                ),
                React.createElement(
                    'label',
                    null,
                    'Balance'
                ),
                React.createElement(
                    'div',
                    { style: { display: 'flex' } },
                    React.createElement(
                        'div',
                        { style: { flex: '50%', marginRight: '10px' } },
                        React.createElement('input', { type: 'text',
                            value: formatWika(_this.context.balanceWika),
                            readOnly: true,
                            style: { textAlign: 'right' }
                        })
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: '50%', marginLeft: '10px' } },
                        React.createElement('input', { type: 'text',
                            value: formatUsd(_this.context.balanceUsd),
                            readOnly: true,
                            style: { textAlign: 'right' }
                        })
                    )
                ),
                React.createElement(
                    'label',
                    null,
                    'Public Address (Substrate format) \xA0\xA0',
                    React.createElement(
                        'a',
                        { href: '#', onClick: _this.copyElement("account_address_element") },
                        React.createElement('i', { className: 'far fa-copy' })
                    )
                ),
                React.createElement('input', { id: 'account_address_element',
                    type: 'text',
                    value: _this.context.address,
                    readOnly: true,
                    style: inputBoxStyle
                }),
                React.createElement(
                    'label',
                    null,
                    'Public Address (Raw hex format) \xA0\xA0',
                    React.createElement(
                        'a',
                        { href: '#', onClick: _this.copyElement("account_address_raw_element") },
                        React.createElement('i', { className: 'far fa-copy' })
                    )
                ),
                React.createElement('input', { id: 'account_address_raw_element',
                    type: 'text',
                    value: _this.context.addressRaw,
                    readOnly: true,
                    style: inputBoxStyle
                })
            );
        };

        return _this;
    }

    return Account;
}(React.Component);

Account.contextType = AppContext;