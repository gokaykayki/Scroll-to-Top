$(document).ready(function() {
  "use strict"

  var status = "";  // define variables
  var textSelector = "";

  function replace_i18n(obj, tag) {
    var msg = tag.replace(/__MSG_(\w+)__/g, function(match, v1) {
        return v1 ? chrome.i18n.getMessage(v1) : '';
    });

    if(msg != tag) obj.innerHTML = msg;
  }
  function localizeHtmlPage() {
    var data = document.querySelectorAll('[data-localize]');

    for (var i in data) if (data.hasOwnProperty(i)) {
        var tag = data[i].getAttribute('data-localize').toString();

        replace_i18n(data[i], tag);
    }

    var page = document.getElementsByTagName('html');

    for (var j = 0; j < page.length; j++) {
        var obj = page[j];
        var tag = page[j].innerHTML.toString();

        replace_i18n(page[j], tag);
    }
  }

  localizeHtmlPage(); // set strings

  chrome.storage.sync.get(['status'], function(items) {  // get extension status
    status = items.status;                               // and set default elements
    if(items.status == "true"){
      $('input.tgl-flip').attr('checked', true);
      $('.textContainer').append(chrome.i18n.getMessage("extWorking"))
    }else{
      $('input.tgl-flip').attr('checked', false);
      $('.textContainer').append(chrome.i18n.getMessage("extNotWorking"))
    }
  });

  $('.tgl-flip').click(function(){    // change extension status
    if(status != "true"){             // and elements and variables values
      status = "true";
    }else{
      status = "false";
    }
    chrome.storage.sync.set({'status': status}, function() { // set status
      if(status == "true"){
        textSelector = "extWorking";
      }else{
        textSelector = "extNotWorking";
      }
      $('.textContainer').empty();
      $('.textContainer').append(chrome.i18n.getMessage(textSelector)); // show status message
    });
  });
});
