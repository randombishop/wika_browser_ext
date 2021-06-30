'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styleMainDiv = {
    color: "#edf0f3",
    display: "flex",
    width: "100%",
    height: "42px"
};

var styleDiv1 = {
    flex: "10%",
    backgroundColor: "#e53935",
    padding: "5px",
    textAlign: "center"
};

var styleDiv2 = {
    flex: "15%",
    backgroundColor: "#d81b60",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "16px",
    paddingTop: "9px",
    textAlign: "center"
};

var styleDiv3 = {
    flex: "40%",
    backgroundColor: "#8e24aa",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "11px",
    padding: "5px",
    display: "flex"
};

var styleDiv4 = {
    flex: "20%",
    backgroundColor: "#5e35b1",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "16px",
    paddingTop: "9px",
    textAlign: "center"
};

var styleDiv5 = {
    flex: "5%",
    backgroundColor: "#3949ab",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "16px",
    paddingTop: "9px",
    textAlign: "center"
};

var MiniBar = function (_React$Component) {
    _inherits(MiniBar, _React$Component);

    function MiniBar(props) {
        _classCallCheck(this, MiniBar);

        var _this = _possibleConstructorReturn(this, (MiniBar.__proto__ || Object.getPrototypeOf(MiniBar)).call(this, props));

        _this.renderBoxIcon = function () {
            return React.createElement(
                "div",
                { style: styleDiv1 },
                React.createElement("img", { src: "images/logo32.png", style: { filter: "invert(100%)" } })
            );
        };

        _this.renderBoxPage = function () {
            return React.createElement(
                "div",
                { style: styleDiv2 },
                _this.context.urlLikes,
                " ",
                React.createElement("i", { className: "fas fa-thumbs-up" })
            );
        };

        _this.renderBoxLike = function () {
            return React.createElement(
                "div",
                { style: styleDiv3 },
                React.createElement(MiniLike, null)
            );
        };

        _this.renderBoxBalance = function () {
            return React.createElement(
                "div",
                { style: styleDiv4 },
                formatWika(_this.context.balanceWika)
            );
        };

        _this.renderBoxOpenClose = function () {
            return React.createElement(
                "div",
                { style: styleDiv5 },
                React.createElement(
                    "a",
                    { href: "#", onClick: _this.props.switch },
                    React.createElement("i", { className: _this.props.minimized ? "fas fa-chevron-circle-down" : "fas fa-chevron-circle-up" })
                )
            );
        };

        return _this;
    }

    _createClass(MiniBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: styleMainDiv },
                this.renderBoxIcon(),
                this.renderBoxPage(),
                this.renderBoxLike(),
                this.renderBoxBalance(),
                this.renderBoxOpenClose()
            );
        }
    }]);

    return MiniBar;
}(React.Component);

MiniBar.contextType = AppContext;