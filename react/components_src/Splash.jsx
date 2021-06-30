'use strict';


const layoutStyle = {display: "grid", gridAutoColumns: "1fr", gridAutoFlow: "column"} ;
const columnStyle = {padding:"10px", fontSize: "larger", textAlign:"center"} ;

class Splash extends React.Component {

    constructor(props) {
        super(props) ;
        this.state = {page:'welcome'}
    }

    navigate = (page) => {
        this.setState({page: page});
    }

    renderSwitch = () => {
        switch (this.state.page) {
            case "welcome":
                return <Welcome navigate={this.navigate}/>;
            case "new_account":
                return <NewAccount done={this.props.done}/>;
            default:
                return <Loading/>;
        }
    }

    render = () => {
        return (
            <div style={{padding: '20px'}}>
                {this.renderSwitch()}
            </div>
        ) ;
    }

}


