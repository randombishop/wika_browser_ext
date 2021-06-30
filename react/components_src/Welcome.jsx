'use strict';


const layoutStyle = {display: "grid", gridAutoColumns: "1fr", gridAutoFlow: "column"};
const columnStyle = {padding: "10px", fontSize: "15px", textAlign: "center"};

class Welcome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<main style={{textAlign: "center"}}>
            <h3>Welcome to the Wika Network!</h3>
            <div style={layoutStyle}>
                <div style={columnStyle}>
                    <img src="images/splash1.png" width="125"/> <br/><br/>
                    Like your favorite pages and reward the authors and previous likers.
                </div>
                <div style={columnStyle}>
                    <img src="images/splash2.png" width="125"/> <br/><br/>
                    Lay breadcrumbs so that others can follow your steps towards good quality content.
                </div>
                <div style={columnStyle}>
                    <img src="images/splash3.png" width="125"/> <br/><br/>
                    Earn rewards and participate to the daily lottery.
                </div>
            </div>
            <br/>
            <h3>Together, let's make the internet a better place and spread quality content.</h3>
            <button className="primary" onClick={() => this.props.navigate('new_account')}>
                Get Started Now!
            </button>
        </main>);
    }

}


