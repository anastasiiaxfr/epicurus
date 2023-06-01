//USER CLICK ON LINK INSIDE EMAIL
export default function () {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');

    const formEmailClicked = document.querySelector("#modalEmailClicked");
    const formEmailClicked_btn = formEmailClicked.querySelector(".btn");
    const formEmailClicked_close = formEmailClicked.querySelector(".modal-close");

    if (emailParam === 'checked') { setCookie("email_confirm", "true", 1); }
    const email_confirm = getCookie("email_confirm");

    if (email_confirm === "true") {
        formEmailClicked.classList.add('d-block', 'show');
    } else {
        formEmailClicked.classList.remove('d-block', 'show');
        removeCookie("email_confirm");
    }
    formEmailClicked_btn.addEventListener('click', function (event) {
        event.preventDefault();
        removeCookie("email_confirm");
        window.location.href = redirect_url;
    });
    formEmailClicked_close.addEventListener('click', function () {
        removeCookie("email_confirm");
        window.location.replace("/");
        urlParams.delete('email');
        const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
        window.history.replaceState(null, null, newUrl);
    });
    formEmailClicked.addEventListener("click", function (event) {
        if (event.target === formEmailClicked) {
            removeCookie("email_confirm");
            //window.location.replace("/"); NOT needed
        }
    });
}