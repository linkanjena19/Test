$(function(){

    //Increase and Decrease font size start
    var $affectedElements = $(".nav-link span,.card-title, table th,.footer-nav a,.navbar-nav-link span,.nav-item a, table td,.login-register-container h1,.login-register-container h6"); // Can be extended, ex. $("div, p, span.someClass")
// Storing the original size in a data attribute so size can be reset
    $affectedElements.each(function () {
        var $this = $(this);
        $this.data("orig-size", $this.css("font-size"));
    });
    $("#btn-increase").click(function () {
        changeFontSize(1);
    });
    $("#btn-decrease").click(function () {
        changeFontSize(-1);
    });
    $("#btn-orig").click(function () {
        $affectedElements.each(function () {
            var $this = $(this);
            $this.css("font-size", $this.data("orig-size"));
        });
    });
    function changeFontSize(direction) {

debugger

        $affectedElements.each(function () {
            var $this = $(this);
            if (direction > 0) {
                if ($this.css("font-size").slice(0, -2) < 19) {
                    $this.css("font-size", parseInt($this.css("font-size")) + direction);
                }
                ;
            } else {
                if ($this.css("font-size").slice(0, -2) > 12) {
                    $this.css("font-size", parseInt($this.css("font-size")) + direction);
                }
                ;
            }
        });
    }



})


/* Change Contrast */
function changeContrast(contrast) {
       if (contrast === 'inactivate') {
           $('body').removeClass('contrast-active');
       } else {
           $('body').addClass('contrast-active');
       }
   
   }
