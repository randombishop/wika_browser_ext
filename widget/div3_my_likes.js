
const HTML_DIV3_MY_LIKES = `
  <div id="wika-widget-div-my-likes"
       class="wika-widget-elements"
       style="flex:45%; 
                background-Color:#8e24aa; border-left:solid 1px #a2afb9;
                text-align:center;
                display:flex">
        
    </div>
`;



const HTML_SEND_LIKE = `
    <div style="margin-left:10px;margin-top:12px;width:90px;">
        <input class="wika-widget-elements" 
               style="width:100%"
               type="range" min="1" max="100"
        />
    </div>
    <div style="margin-left:10px;line-height:42px">
        <button id="wika-widget-like-button"
                class="wika-widget-elements" 
                style="height: 32px;
                       width: 120px;
                       border: 1px solid lightgray; 
                       border-radius: 3px;
                       font-size: 16px;
                       background: darkgray;
                       color: white;">
            <span class="wika-widget-like-button-text">Send 100 &#128077;</span>
        </button>
    </div>
`;

const HTML_ALREADY_LIKED = `
    <div style="font-size:16px;color:white;line-height:42px;width:100%;text-align:center">
        You sent <strong>NUM_LIKES &#128077;</strong> at rank <strong>#RANK_LIKES</strong>
    </div>
`;



function getHtmlDiv3() {
    return HTML_DIV3_MY_LIKES;
}

function getHtmlAlreadyLiked(numLikes, rank) {
    return HTML_ALREADY_LIKED.replace('NUM_LIKES', numLikes).replace('RANK_LIKES', rank);
}

function getHtmlSendLike() {
    return HTML_SEND_LIKE ;
}




