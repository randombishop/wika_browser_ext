
// Prepare HTML code for the widget

let HTML_DIV1 = getHtmlDiv1() ;

let HTML_DIV2 = getHtmlDiv2(46) ;

let HTML_DIV3 = getHtmlDiv3() ;

let HTML_DIV4 = getHtmlDiv4(128.45) ;

let HTML_DIV5 = getHtmlDiv5() ;

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

let HTML_WIDGET_ID = 'wika_extension_widget' ;




// Add Javascript
var js = document.createElement('script');
js.innerHTML = JS_CODE;
document.head.appendChild(js);


// Add HTML
let widget = document.createElement('div');
widget.id = HTML_WIDGET_ID ;
widget.classList.add('wika-widget-elements') ;
widget.innerHTML = HTML_WIDGET ;
document.body.appendChild(widget) ;


// Add CSS
let CSS_WIDGET = `
    .wika-widget-elements {
      all: revert;
      font-family: system-ui;
    }
`;
var style = document.createElement('style');
style.innerHTML = CSS_WIDGET;
document.head.appendChild(style);




