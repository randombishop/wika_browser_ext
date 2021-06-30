'use strict';

const styleMainDiv = {
    color: "#edf0f3",
    display: "flex",
    width: "100%",
    height: "42px",
} ;

const styleDiv1 = {
    flex: "10%",
    backgroundColor: "#e53935",
    padding: "5px",
    textAlign: "center"
} ;

const styleDiv2 = {
    flex: "15%",
    backgroundColor: "#d81b60",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "16px",
    paddingTop: "9px",
    textAlign: "center"
} ;

const styleDiv3 = {
    flex: "40%",
    backgroundColor: "#8e24aa",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "11px",
    padding: "5px",
    display: "flex"
} ;

const styleDiv4 = {
    flex: "20%",
    backgroundColor: "#5e35b1",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "16px",
    paddingTop: "9px",
    textAlign: "center"
} ;

const styleDiv5 = {
    flex: "5%",
    backgroundColor: "#3949ab",
    borderLeft: "solid 1px #a2afb9",
    fontSize: "16px",
    paddingTop: "9px",
    textAlign: "center"
} ;


class MiniBar extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    renderBoxIcon = () => {
        return (
           <div style={styleDiv1}>
                <img src="images/logo32.png" style={{filter: "invert(100%)"}}/>
            </div>
        ) ;
    }

    renderBoxPage = () => {
        return (
           <div style={styleDiv2}>
               {this.context.urlLikes} <i className="fas fa-thumbs-up"></i>
            </div>
        ) ;
    }

    renderBoxLike = () => {
        return (
            <div style={styleDiv3}>
                <MiniLike />
            </div>
        )
    }

    renderBoxBalance = () => {
        return (
            <div style={styleDiv4}>
                {formatWika(this.context.balanceWika)}
            </div>
        )
    }

    renderBoxOpenClose = () => {
        return (
           <div style={styleDiv5}>
               <a href="#" onClick={this.props.switch}>
                   <i className={(this.props.minimized)?"fas fa-chevron-circle-down":"fas fa-chevron-circle-up"} ></i>
               </a>
            </div>
        ) ;
    }

    render() {
        return (
            <div style={styleMainDiv}>
                {this.renderBoxIcon()}
                {this.renderBoxPage()}
                {this.renderBoxLike()}
                {this.renderBoxBalance()}
                {this.renderBoxOpenClose()}
            </div>
        );
    }

}


