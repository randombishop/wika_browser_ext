const JS_CODE = `

    function currentOrigin() {
        return window.location.protocol + '//' + window.location.hostname + '/*' ;
    }
    
    function initializeWikaWidget() {
        setUpDragButton() ;
    }
    
    function wikaLogoClicked() {
        window.postMessage({type:'OpenApp'}, currentOrigin());
    }
    
    function likeSliderChanged(event) {
        var n = event.target.value ;
        document.getElementById("wika-widget-like-button-value").innerText = n ;
    }
     
    function likeButtonClicked() {
        document.getElementById("wika-widget-like-button").disabled = true ;
        var numLikes = Number(document.getElementById("wika-widget-like-slider").value) ;
        var msg = {
            type:'NewLike',
            url: window.location.href,
            numLikes: numLikes
        } ;
        window.postMessage(msg, currentOrigin());
    }
       
    function setUpDragButton() {
        var widget = document.getElementById("wika-widget-fixed-div") ;
        var button = document.getElementById("wika-widget-move-button") ;
        dragElement(button, widget) ;
    }
    
    function dragElement(elmntButton, elmntWidget) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmntButton.onmousedown = dragMouseDown;
      
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmntWidget.style.top = (elmntWidget.offsetTop - pos2) + "px";
        elmntWidget.style.left = (elmntWidget.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    
`;



