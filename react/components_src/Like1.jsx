'use strict';

class Like1 extends React.Component {

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

    componentDidMount() {
        this.update() ;
    }

    update = () => {
        let data = this.context ;
        if (data.url && data.likePrice && data.urlLikes!=null) {
            this.setState({
                totalPrice: this.state.numLikes * data.likePrice,
                rewardsAfter: data.rewardWaitFactor * data.urlLikes + 1,
                rewardCeiling: this.state.numLikes * data.likePrice * data.rewardTarget
            }) ;
        } else {
            this.setState({
                totalPrice:null,
                rewardsAfter:null,
                rewardCeiling:null
                }
            ) ;
        }
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

    renderButton = () => {
        if (this.state.txStatus==null) {
            return (
                <button onClick={this.submitLike}>
                    Send {this.state.numLikes} <i className="fas fa-thumbs-up"></i>
                </button>
            );
        } else {
            return (
                <button disabled>
                    <i className="fas fa-spinner"></i> {this.state.txStatus}
                </button>
            ) ;
        }
    }

    render = () => {
        let data = this.context ;
        return (
            <main>
                <label>Webpage</label>
                <div style={{display: "flex"}}>
                    <div style={{flex: "80%"}}>
                        <strong>{shortenText(data.title)}</strong>
                    </div>
                    <div style={{flex: "20%", textAlign: "right"}}>
                        <strong>{data.urlLikes} <i className="fas fa-thumbs-up"></i></strong>
                    </div>
                </div>
                <input type="text" readOnly defaultValue={data.url}/>

                <label>Referrer</label>
                <input type="text" readOnly defaultValue={data.referrer}/>


                <div style={{display:'flex'}}>
                    <div style={{flex:'60%'}}>
                        <label>How much I like it?</label>
                        <div style={{display:'flex'}}>
                            <div style={{width:'80px', marginRight:'15px'}}>
                                <input type="range" min="1" max="100"
                                       value={this.state.numLikes}
                                       onChange={this.handleNumLikeChange}
                                />
                            </div>
                            <div>
                                <strong>{this.state.numLikes} <i className="fas fa-thumbs-up"></i></strong>
                            </div>
                        </div>
                    </div>
                    <div style={{flex:'40%'}}>
                        <label>Total cost</label>
                        <input style={{textAlign:"right"}} type="text" readOnly defaultValue={this.state.totalPrice}/>
                    </div>
                </div>

                {this.renderButton()}

            </main>
        );
    }

}


