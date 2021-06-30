'use strict';


const menuStyle = {
    position: 'absolute',
    left: '220px',
    backgroundColor: 'aliceblue',
    padding: '10px',
    borderRadius: '10px',
    top: '60px',
    opacity: '90%'
}


class NavBar extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {menuOpened: false};
    }

    toggleMenu = () => {
        let toggle = !this.state.menuOpened ;
        this.setState({menuOpened:toggle}) ;
    }

    navigate = (tab) => {
        this.setState({menuOpened:false}) ;
        this.context.update({tab: tab});
    }

    renderMenu = () => {
        if (this.state.menuOpened) {
            return (
                <aside style={menuStyle}>
                    <nav>
                        <ul>
                            <li><a href="#" onClick={() => this.navigate('account')}>Account</a></li>
                            <li><a href="#" onClick={() => this.navigate('history')}>History</a></li>
                            <li><a href="#" onClick={() => this.navigate('claim_page')}>Claim page ownership</a></li>
                            <li><a href="#" onClick={() => this.navigate('owned_pages')}>Owned pages</a></li>
                            <li><a href="#" onClick={() => this.navigate('keccak')}>Keccak 256</a></li>
                            <li><a href="#" onClick={() => this.navigate('blockchains')}>Blockchains</a></li>
                            <li><a href="#" onClick={() => this.navigate('about')}>About</a></li>
                        </ul>
                    </nav>
                </aside>
            );
        } else {
            return "" ;
        }
    }

    buttonClass = (tab) => {
        if (this.context.tab == tab) {
            return "contrast" ;
        } else {
            return "secondary" ;
        }
    }

    render() {
        return (
            <div style={{position:'relative', textAlign:'center', padding:'10px', backgroundColor:'lightgray'}}>
                <a role="button" href="#" className={this.buttonClass('like')} onClick={() => this.navigate('like')}>Like</a>&nbsp;&nbsp;
                <a role="button" href="#" className={this.buttonClass('recommend')} onClick={() => this.navigate('recommend')}>Recommended</a>&nbsp;&nbsp;
                <a role="button" href="#" className={this.buttonClass('wallet')} onClick={() => this.navigate('wallet')}>Wallet</a>&nbsp;&nbsp;
                <a role="button" href="#" className={this.buttonClass('menu')} onClick={this.toggleMenu}><i className="fas fa-bars"></i></a>
                {this.renderMenu()}
            </div>
        );
    }

}


