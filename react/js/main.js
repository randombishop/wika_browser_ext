'use strict';


document.addEventListener('DOMContentLoaded', function() {
   const domContainer = document.querySelector('#wika_container');
   const wikaApp = React.createElement(WikaApp) ;
   ReactDOM.render(wikaApp, domContainer);
});


