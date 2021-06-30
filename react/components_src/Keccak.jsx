'use strict';

class Keccak extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state={
            text:"",
            hash:""
        }
    }

    updateText = (event) => {
        this.setState({text:event.target.value}) ;
    }

    generateHash = () => {
        let text = this.state.text ;
        let hash = window.polkadot_crypto.keccakAsHex(text) ;
        this.setState({
            hash:hash
        }) ;
    }

    copy = () => {
        copyToClipboard("keccak_hash_element") ;
    }

    render() {
        return (
            <main>
                <h5>Keccak</h5>
                <label>Text</label>
                <textarea value={this.state.text} onChange={this.updateText}/>
                <button onClick={this.generateHash}>Hash</button>
                <input id="keccak_hash_element"
                       type="text"
                       value={this.state.hash}
                       readOnly={true}
                       style={{
                           fontSize: '10px',
                           textAlign: 'center'
                       }}
                />
                <button onClick={this.copy}>Copy to clipboard</button>
            </main>
        );
    }

}


