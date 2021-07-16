
const HTML_DIV3_MY_LIKES = `
  <div id="wika-widget-div-my-likes"
       class="wika-widget-elements"
       style="flex:45%;background-Color:#8e24aa; border-left:solid 1px #a2afb9;">
        
        <div id="wika-widget-div-new-like"
             class="wika-widget-elements"
             style="text-align:center;
                    display:none;
                    visibility:hidden">
            <div style="margin-left:10px;margin-top:12px;width:90px;">
                <input id="wika-widget-like-slider"
                       class="wika-widget-elements" 
                       style="width:100%"
                       type="range" min="1" max="100"
                       value="1"
                       onchange="likeSliderChanged(event)"
                />
            </div>
            <div style="margin-left:10px;line-height:42px">
                <button id="wika-widget-like-button"
                        class="wika-widget-elements" 
                        onclick="likeButtonClicked()"
                        style="height: 32px;
                               width: 120px;
                               border: 1px solid lightgray; 
                               border-radius: 3px;
                               font-size: 16px;
                               background: darkgray;
                               color: white;">
                    <span class="wika-widget-like-button-text">Send <span id="wika-widget-like-button-value">1</span> &#128077;</span>
                </button>
            </div>                
        </div>
        
        <div id="wika-widget-div-already-liked"
             class="wika-widget-elements"
             style="font-size:16px;
                    color:white;
                    line-height:42px;
                    width:100%;
                    text-align:center;
                    display:none;
                    visibility:hidden">
            You sent <strong id="wika-widget-div-already-liked-num-likes">- &#128077;</strong>
            at rank <strong id="wika-widget-div-already-liked-rank">-</strong>
        </div>
            
    </div>
`;





function getHtmlDiv3() {
    return HTML_DIV3_MY_LIKES;
}


