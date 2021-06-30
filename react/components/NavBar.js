'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var menuStyle = {
    position: 'absolute',
    left: '220px',
    backgroundColor: 'aliceblue',
    padding: '10px',
    borderRadius: '10px',
    top: '60px',
    opacity: '90%'
};

var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar(props) {
        _classCallCheck(this, NavBar);

        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

        _this.toggleMenu = function () {
            var toggle = !_this.state.menuOpened;
            _this.setState({ menuOpened: toggle });
        };

        _this.navigate = function (tab) {
            _this.setState({ menuOpened: false });
            _this.context.update({ tab: tab });
        };

        _this.renderMenu = function () {
            if (_this.state.menuOpened) {
                return React.createElement(
                    'aside',
                    { style: menuStyle },
                    React.createElement(
                        'nav',
                        null,
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('account');
                                        } },
                                    'Account'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('history');
                                        } },
                                    'History'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('claim_page');
                                        } },
                                    'Claim page ownership'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('owned_pages');
                                        } },
                                    'Owned pages'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('keccak');
                                        } },
                                    'Keccak 256'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('blockchains');
                                        } },
                                    'Blockchains'
                                )
                            ),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '#', onClick: function onClick() {
                                            return _this.navigate('about');
                                        } },
                                    'About'
                                )
                            )
                        )
                    )
                );
            } else {
                return "";
            }
        };

        _this.buttonClass = function (tab) {
            if (_this.context.tab == tab) {
                return "contrast";
            } else {
                return "secondary";
            }
        };

        _this.state = { menuOpened: false };
        return _this;
    }

    _createClass(NavBar, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { style: { position: 'relative', textAlign: 'center', padding: '10px', backgroundColor: 'lightgray' } },
                React.createElement(
                    'a',
                    { role: 'button', href: '#', className: this.buttonClass('like'), onClick: function onClick() {
                            return _this2.navigate('like');
                        } },
                    'Like'
                ),
                '\xA0\xA0',
                React.createElement(
                    'a',
                    { role: 'button', href: '#', className: this.buttonClass('recommend'), onClick: function onClick() {
                            return _this2.navigate('recommend');
                        } },
                    'Recommended'
                ),
                '\xA0\xA0',
                React.createElement(
                    'a',
                    { role: 'button', href: '#', className: this.buttonClass('wallet'), onClick: function onClick() {
                            return _this2.navigate('wallet');
                        } },
                    'Wallet'
                ),
                '\xA0\xA0',
                React.createElement(
                    'a',
                    { role: 'button', href: '#', className: this.buttonClass('menu'), onClick: this.toggleMenu },
                    React.createElement('i', { className: 'fas fa-bars' })
                ),
                this.renderMenu()
            );
        }
    }]);

    return NavBar;
}(React.Component);

NavBar.contextType = AppContext;