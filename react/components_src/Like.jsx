'use strict';

class Like extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    render = () => {
        if (this.context.likesSubmittedCount==0) {
            return <Like1 /> ;
        } else {
            return <Like2 /> ;
        }
    }

}


