'use strict';

const inputBoxStyle = {
    fontSize: '10px',
    textAlign: 'center'
} ;


class Account extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    copyElement = (element) => () => {
        copyToClipboard(element) ;
    }

    render = () => {
        return <main>
            <h5>Account</h5>

            <label>Balance</label>
            <div style={{display:'flex'}}>
                <div style={{flex:'50%', marginRight:'10px'}}>
                    <input type="text"
                           value={formatWika(this.context.balanceWika)}
                           readOnly={true}
                           style={{textAlign:'right'}}
                    />
                </div>
                <div style={{flex:'50%', marginLeft:'10px'}}>
                    <input type="text"
                           value={formatUsd(this.context.balanceUsd)}
                           readOnly={true}
                           style={{textAlign:'right'}}
                    />
                </div>
            </div>

            <label>
                Public Address (Substrate format)
                &nbsp;&nbsp;
                <a href="#" onClick={this.copyElement("account_address_element")}>
                    <i className="far fa-copy"></i>
                </a>
            </label>
            <input id="account_address_element"
                   type="text"
                   value={this.context.address}
                   readOnly={true}
                   style={inputBoxStyle}
            />

            <label>
                Public Address (Raw hex format)
                &nbsp;&nbsp;
                <a href="#" onClick={this.copyElement("account_address_raw_element")}>
                    <i className="far fa-copy"></i>
                </a>
            </label>
            <input id="account_address_raw_element"
                   type="text"
                   value={this.context.addressRaw}
                   readOnly={true}
                   style={inputBoxStyle}
            />
        </main>;
    }

}


