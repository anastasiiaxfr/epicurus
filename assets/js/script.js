 //Cookie
 function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function removeCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  // Switcher
    if (getCookie("theme") === "white") {
      $('body').addClass("white");
      $('.switch input[type=checkbox]').prop('checked', true);
    } else {
      $('body').removeClass("white");
      $('.switch input[type=checkbox]').prop('checked', false);
    }
  
    $('.switch input[type=checkbox]').change(function() {
      if ($(this).is(':checked')) {
        $('body').addClass("white").removeClass("dark");
        setCookie("theme", "white", 365);
      } else {
        $('body').removeClass("white").addClass("dark");
        removeCookie("theme");
        setCookie("theme", "dark", 365);
      }
    });
 