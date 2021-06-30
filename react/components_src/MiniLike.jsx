'use strict';

const styleSlider = {
   width: "90px",
   paddingTop: "11px",
   "--input-background": "rgb(142, 36, 170)",
   "--input-border": "lightgray",
   "--text": "#a2afb9"
} ;


class MiniLike extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            numLikes: 1,
            totalPrice:null,
            rewardsAfter:null,
            rewardCeiling: null
        };
    }

    handleNumLikeChange = (event) => {
        this.setState({numLikes: event.target.value}, this.update) ;
    }

    submitLike = () => {
        let self = this;
        let url = this.context.url ;
        let referrer = this.context.referrer ;
        let numLikes = this.state.numLikes ;
        self.setState({txStatus:'Sending...'}, () => {
            self.context.network.txLike(url, referrer, numLikes, self.monitorLike).then((s) => {
                self.unsubTransaction = s ;
            });
        })
    }

    monitorLike = (result) => {
        let status = result.status ;
        if (status.isInBlock) {
            this.setState({txStatus: 'In block...'}) ;
        } else if (status.isFinalized) {
            this.setState({txStatus: null}) ;
            this.unsubTransaction();
            let error = parseError(result) ;
            if (error) {
                alert(error) ;
            }
        }
    }

    renderTxStatus = () => {
        return (<div style={{paddingLeft:'20px', paddingTop: '5px', fontSize:'16px'}}>
                    <i className="fas fa-spinner"></i>&nbsp;&nbsp;&nbsp;{this.state.txStatus}
                </div>
        );
    }

    renderNewLike = () => {
        return (
            <React.Fragment>
                <div style={{marginLeft: "15px"}}>
                    <input type="range" min="1" max="100"
                           value={this.state.numLikes}
                           onChange={this.handleNumLikeChange}
                           style={styleSlider}
                    />
                </div>
                <div style={{marginLeft: "15px"}}>
                    <button className="secondary"
                            onClick={this.submitLike}
                            style={{height: "32px", width: "70px", padding: 0, borderLeft: "solid 1px #a2afb9"}}>
                        {this.state.numLikes} <i className="fas fa-thumbs-up"></i>
                    </button>
                </div>
            </React.Fragment>
        ) ;
    }

    renderAlreadyLiked = () => {
        return (<div style={{paddingLeft:'20px', paddingTop: '5px', fontSize:'16px'}}>
                    <i className="far fa-paper-plane"></i>
                    &nbsp;&nbsp;
                    {this.context.likesSubmittedCount} <i className="fas fa-thumbs-up"></i>
                    &nbsp;&nbsp;
                    <small>(sent at #{this.context.likesSubmittedAt+1})</small>
                </div>
        );
    }

    render() {
        if (this.context.likesSubmittedCount==0) {
            if (this.state.txStatus!=null) {
                return this.renderTxStatus() ;
            } else {
                return this.renderNewLike() ;
            }
        } else {
            return this.renderAlreadyLiked() ;
        }
    }

}


