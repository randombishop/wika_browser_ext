'use strict';

class NewAccountDone extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <h4>Congrats, your Wika address is ready!</h4>
                <label>Your public address</label>
                <input type="text" disabled value={this.props.address} />
                <p>
                    You can safely share this address to receive Wika tokens. <br/>
                    (But never share the secret 12 words phrase.)
                </p>
                <h4>Now, what can I do in this network?</h4>
                <ul>
                    <li>Like web pages to reward the authors and previous likers.</li>
                    <li>Claim your web pages ownership to start receiving rewards.</li>
                    <li>Participate to daily lotteries and earn more Wika tokens.</li>
                    <li>Use your wallet to send and receive Wika tokens instantly across the nework.</li>
                </ul>
                <button onClick={this.props.next}>
                    Connect to Wika Network!
                </button>
            </main>
        );
    }

}


