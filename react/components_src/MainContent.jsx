'use strict';

class MainContent extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    render = () => {
        switch (this.context.tab) {
            case "like":
                return <Like />;
            case "recommend":
                return <Recommended />;
            case "wallet":
                return <Wallet />;
            case "account":
                return <Account />;
            case "claim_page":
                return <ClaimPage />;
            case "owned_pages":
                return <OwnedPages />;
            case "history":
                return <History />;
            case "keccak":
                return <Keccak />;
            case "blockchains":
                return <Blockchains />;
            case "about":
                return <About />;
            default:
                return <Loading />;
        }
    }

}


