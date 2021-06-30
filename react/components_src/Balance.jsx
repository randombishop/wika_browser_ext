'use strict';

const boxStyle = {
    textAlign: "right",
    borderStyle: "dotted",
    borderWidth: "1px",
    padding: "10px",
    borderColor: "#1095c1",
    borderRadius: "10px"
};

const addressInputStyle = {
    width: "100px",
    fontSize: "12px",
    padding: 0,
    margin: 0,
    height: "20px",
    display: "inline"
}

class Balance extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    formatAddress = (address) => {
        return address.substring(0, 12) + '...' + address.substring(42);
    }

    copyAddress = () => {
        copyToClipboard("wika_address_element") ;
    };

    render() {
        return (
            <div style={boxStyle}>
                <input id="wika_address_element" style={addressInputStyle}
                       type='text' readOnly value={this.context.address} />
                &nbsp;&nbsp;
                <a href="#" onClick={this.copyAddress}>
                    <i className="far fa-copy"></i>
                </a>
                <br/>
                <kbd>{formatWika(this.context.balanceWika)}</kbd>
                <br/>
                <small>{formatUsd(this.context.balanceUsd)}</small>
            </div>
        );
    }

}




