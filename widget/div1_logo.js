
const HTML_DIV1_LOGO = `
  <div class="wika-widget-elements" 
       style="flex:10%; 
              background-color:#e53935; 
              text-align:center;
              padding-top:5px" >
    <img id="wika-widget-logo"
         onclick="wikaLogoClicked()"
         class="wika-widget-elements" 
         onload="initializeWikaWidget()"
         src="data:image/png;base64,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" 
         style="filter:invert(100%)" /> 
  </div>
`;


function getHtmlDiv1() {
    return HTML_DIV1_LOGO ;
}




