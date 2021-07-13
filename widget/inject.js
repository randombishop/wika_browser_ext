
let HTML_DIV1 = HTML_DIV1_LOGO;




let HTML_DIV2 = `
    <div class="wika-widget-elements" 
         style="flex:20%; background-color:#d81b60; border-left:solid 1px #a2afb9;
                color:white; font-size:20px; font-weight:bold;
                text-align:center; line-height:42px">
        74 &#128077;
    </div>
`;




let HTML_DIV3 = `
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





let HTML_DIV4 = `
    <div class="wika-widget-elements"
         style="flex:20%; 
         background-color:#5e35b1; border-left:solid 1px #a2afb9;
         color:white; font-size:16px; font-weight:bold;
         text-align:center;line-height:42px">
         1039.12 W
    </div>
`;




let HTML_DIV5 = `
    <div class="wika-widget-elements"
         style="flex:5%; 
                background-color:#3949ab; border-left:solid 1px #a2afb9;
                color:white; font-size:20px;
                text-align:center;line-height:42px">
       &#9678;
    </div>
`;




let HTML_DIV_WIDGET = `
    <div class="wika-widget-elements" 
         style="position: fixed;
                bottom: 22px;
                right: 32px;
                zIndex: 9999;
                display: flex;
                width: 520px;
                height: 42px;
                border: solid 1px gray;
                border-radius: 15px;
                overflow: hidden;
                font-family: system-ui">
`;


let HTML_WIDGET = HTML_DIV_WIDGET + HTML_DIV1 + HTML_DIV2 + HTML_DIV3 + HTML_DIV4 + HTML_DIV5 + "</div>" ;

let HTML_WIDGET_STYLE = `
    .wika-widget-elements {
      all: revert;
      font-family: system-ui;
    }
`;


let HTML_WIDGET_ID = 'wika_extension_widget' ;

let widget = document.createElement('div');
widget.id = HTML_WIDGET_ID ;
widget.classList.add('wika-widget-elements') ;
widget.innerHTML = HTML_WIDGET ;
document.body.appendChild(widget) ;

var style = document.createElement('style');
style.innerHTML = HTML_WIDGET_STYLE;
document.head.appendChild(style);


var js1 = document.createElement('script');
js1.innerHTML = JS_DIV1_LOGO;
document.head.appendChild(js1);




