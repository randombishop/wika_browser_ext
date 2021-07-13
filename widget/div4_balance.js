
const HTML_DIV4_BALANCE_A = `
   <div class="wika-widget-elements"
         style="flex:20%; 
         background-color:#5e35b1; border-left:solid 1px #a2afb9;
         color:white; font-size:16px; font-weight:bold;
         text-align:center;line-height:42px">
`;

const HTML_DIV4_BALANCE_B = `
    W</div>
`;



function getHtmlDiv4(balance) {
    return HTML_DIV4_BALANCE_A + balance + HTML_DIV4_BALANCE_B ;
}




