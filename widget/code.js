const JS_CODE = `

    function initializeWikaWidget() {
        setUpDragButton() ;
    }
    
    function wikaLogoClicked() {
            alert('wikaLogoClicked') ;
    }
    
    function setUpDragButton() {
        alert('setUpDragButton') ;
        element = document.getElementById("wika-widget-move-button") ;
        alert(element) ;
    }
    
`;



