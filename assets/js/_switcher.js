//SWITCHER
if (getCookie("theme") === "white") {
    $("body").addClass("white");
    $(".switch input[type=checkbox]").prop("checked", true);
} else {
    $("body").removeClass("white");
    $(".switch input[type=checkbox]").prop("checked", false);
}

$(".switch input[type=checkbox]").change(function () {
    if ($(this).is(":checked")) {
        $("body")
            .addClass("white")
            .removeClass("dark");
        setCookie("theme", "white", 365);
    } else {
        $("body")
            .removeClass("white")
            .addClass("dark");
        removeCookie("theme");
        setCookie("theme", "dark", 365);
    }
});

