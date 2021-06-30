'use strict';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <a href="#" className="secondary">
                            <img src="images/logo32.png"/>
                        </a>
                    </li>
                    <li><strong>Wika Network</strong></li>
                </ul>
            </nav>
        );
    }

}


