'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Like2 = function (_React$Component) {
    _inherits(Like2, _React$Component);

    function Like2(props) {
        _classCallCheck(this, Like2);

        var _this = _possibleConstructorReturn(this, (Like2.__proto__ || Object.getPrototypeOf(Like2)).call(this, props));

        _this.render = function () {
            var data = _this.context;
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "label",
                    null,
                    "Webpage"
                ),
                React.createElement(
                    "div",
                    { style: { display: "flex" } },
                    React.createElement(
                        "div",
                        { style: { flex: "80%" } },
                        React.createElement(
                            "strong",
                            null,
                            shortenText(data.title)
                        )
                    ),
                    React.createElement(
                        "div",
                        { style: { flex: "20%", textAlign: "right" } },
                        React.createElement(
                            "strong",
                            null,
                            data.urlLikes,
                            " ",
                            React.createElement("i", { className: "fas fa-thumbs-up" })
                        )
                    )
                ),
                React.createElement("input", { type: "text", readOnly: true, defaultValue: data.url }),
                React.createElement(
                    "p",
                    null,
                    "You sent this page ",
                    React.createElement(
                        "strong",
                        null,
                        data.likesSubmittedCount,
                        " likes"
                    ),
                    "."
                ),
                React.createElement(
                    "p",
                    null,
                    "You are ranked ",
                    React.createElement(
                        "strong",
                        null,
                        "#",
                        data.likesSubmittedAt + 1
                    ),
                    " on the queue of people who liked this page, therefore, you will start receiving rewards when it hits ",
                    data.likesSubmittedAt * data.rewardWaitFactor + 2,
                    " likes."
                )
            );
        };

        _this.state = {};
        return _this;
    }

    return Like2;
}(React.Component);

Like2.contextType = AppContext;