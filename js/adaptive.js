$(document).ready(function() {  
  
//cancel hover effect for touch devices

  var touch = window.ontouchstart
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);

if (touch) { // remove all :hover stylesheets
    try { // prevent crash on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

/*$("body").bind('swipeup',function(event) {
   if ($(event.target).closest(".menu-mobile.open").length) {
     if($('a.menu-toggle').hasClass("open")){
      $('a.menu-toggle').removeClass("open");
      $('.menu-mobile').removeClass("open");
      }
   };
 
});

$("body").bind('swipedown',function(event) {
   if ($(event.target).closest("header")) {
     if(!$('a.menu-toggle').hasClass("open")){
      $('a.menu-toggle').addClass("open");
      $('.menu-mobile').addClass("open");
      }
   };
});
*/
 $('.menu-mobile .arrow').bind("click",function(e){
  e.preventDefault();
     $(this).parents('li').find('ul.submenu').slideToggle();
     $(this).parents('li').toggleClass("open");
    return false;
  });

$('.menu-close').bind("click",function(e){
  e.preventDefault();
     $('body').removeClass("menu-open");
    return false;
  });

  $('a.menu-toggle').bind("click",function(){
    $('body').addClass("menu-open");
    return false;
  });



});