'use strict';

class NewAccountIntro extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <h3>Set up your Wika Network address</h3>
                <p>
                    Wika Network is built in the Polkadot eco-system.
                    You can re-use an existing Polkadot address if you already have one,
                    or create a new one from scratch.
                </p>
                <button onClick={() => this.props.navigate('generate')}>
                    Generate a new address
                </button>
                <button onClick={() => this.props.navigate('import')}>
                    Import an existing Polkadot address
                </button>
            </main>
        );
    }

}


