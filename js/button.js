$(document).ready(function(){
  var stu = document.createElement("button"); //scroll to up button
  stu.innerHTML = "<i class='arrow up'></i>"; //set button text
  stu.className = "stubt"; //set class
  $("body").append(stu); //place button

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
      chrome.storage.sync.get(['status'], function(items) {  // get extension status
        status = items.status;                               // and set default elements
        if(items.status == "true"){
          $('.stubt:hidden').fadeIn();
        }
      });
    } else {
        $('.stubt').fadeOut();
    }
  });

  $('.stubt').click(function(){
    $("body").addClass("stuHead"); //set again top referance
    $("html, body").animate({
      scrollTop: $('.stuHead').offset().top
    }, "1000");
  });

});
