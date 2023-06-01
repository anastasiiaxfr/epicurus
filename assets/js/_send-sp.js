//FORM SEND SUCCESS
const formSend = document.querySelector("#modalSuccessSend");
let check_form_send = getCookie("form_send");
let form_send_close = formSend.querySelector(".modal-close");

function show_form_send() {
    window.location.href = redirect_url;
};

if (check_form_send) {
    if (check_form_send === "true") {
        formSend.classList.add('d-block', 'show');

    } else {
        formSend.classList.remove('d-block', 'show');
    };
    form_send_close.addEventListener('click', function () {
        removeCookie("form_send");
        //window.location.replace("/");
        show_form_send();
    });

    formSend.addEventListener("click", function (e) {
        removeCookie("form_send");
        show_form_send();
        //window.location.replace("/");
    });
};





