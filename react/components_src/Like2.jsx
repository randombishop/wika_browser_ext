'use strict';

class Like2 extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {};
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
                <p>
                    You sent this page <strong>{data.likesSubmittedCount} likes</strong>.
                </p>
                <p>
                    You are ranked <strong>#{data.likesSubmittedAt+1}</strong> on the queue of people who liked this page,
                    therefore, you will start receiving rewards when it hits {(data.likesSubmittedAt*data.rewardWaitFactor)+2} likes.
                </p>
            </main>
        );
    }

}


