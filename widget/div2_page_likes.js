
const HTML_DIV2_PAGE_LIKES_A = `
  <div class="wika-widget-elements" 
         style="flex:20%; background-color:#d81b60; border-left:solid 1px #a2afb9;
                color:white; font-size:20px; font-weight:bold;
                text-align:center; line-height:42px">
`;

const HTML_DIV2_PAGE_LIKES_B = `
    &#128077;
    </div>
`;


function getHtmlDiv2(numLikes) {
    return HTML_DIV2_PAGE_LIKES_A + numLikes + HTML_DIV2_PAGE_LIKES_B ;
}




