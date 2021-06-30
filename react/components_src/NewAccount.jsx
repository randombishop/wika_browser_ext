'use strict';

class NewAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page: 'intro'}
    }

    navigate = (page) => {
        this.setState({page: page});
    };

    pairCreated = (address, addressRaw, phrase) => {
        let state = {
            page: 'finish',
            address: address,
            addressRaw: addressRaw,
            phrase: phrase
        }
        this.setState(state) ;
    }

    finish = () => {
        this.props.done(this.state.address, this.state.addressRaw, this.state.phrase) ;
    }

    render = () => {
        switch (this.state.page) {
            case "intro":
                return <NewAccountIntro
                            navigate={this.navigate}/>;
            case "generate":
                return <NewAccountGenerateAddress
                            next={this.pairCreated}/>;
            case "import":
                return <NewAccountImportAddress
                            next={this.pairCreated}/>;
            case "finish":
                return <NewAccountDone
                            address={this.state.address}
                            next={this.finish}/> ;
            default:
                return <Loading/>;
        }
    }

}


