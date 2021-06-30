'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewAccountIntro = function (_React$Component) {
    _inherits(NewAccountIntro, _React$Component);

    function NewAccountIntro(props) {
        _classCallCheck(this, NewAccountIntro);

        return _possibleConstructorReturn(this, (NewAccountIntro.__proto__ || Object.getPrototypeOf(NewAccountIntro)).call(this, props));
    }

    _createClass(NewAccountIntro, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'main',
                null,
                React.createElement(
                    'h3',
                    null,
                    'Set up your Wika Network address'
                ),
                React.createElement(
                    'p',
                    null,
                    'Wika Network is built in the Polkadot eco-system. You can re-use an existing Polkadot address if you already have one, or create a new one from scratch.'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this2.props.navigate('generate');
                        } },
                    'Generate a new address'
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this2.props.navigate('import');
                        } },
                    'Import an existing Polkadot address'
                )
            );
        }
    }]);

    return NewAccountIntro;
}(React.Component);