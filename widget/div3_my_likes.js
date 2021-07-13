
const HTML_DIV3_MY_LIKES = `
  <div class="wika-widget-elements"
         style="flex:45%; 
                background-Color:#8e24aa; border-left:solid 1px #a2afb9;
                text-align:center;
                display:flex">
        <div style="margin-left:10px;margin-top:12px;width:90px;">
            <input class="wika-widget-elements" 
                   style="width:100%"
                   type="range" min="1" max="100"
            />
        </div>
        <div style="margin-left:10px;line-height:42px">
            <button class="wika-widget-elements" 
                    style="height: 32px;
                           width: 110px;
                           border: 1px solid lightgray; 
                           border-radius: 3px;
                           font-size: 16px;
                           font-weight: bold;
                           background: darkgray;
                           color: white;">
                Send 100 &#128077;
            </button>
        </div>
    </div>
`;


function getHtmlDiv3() {
    return HTML_DIV3_MY_LIKES;
}




