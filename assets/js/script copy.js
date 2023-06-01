document.addEventListener('DOMContentLoaded', function () {

    //FORMS SEND DATA
    //Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    (function () {
        "use strict";

        //Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                "submit",
                function (event) {
                    form.classList.add("was-validated");
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        //event.preventDefault()
                        //event.stopPropagation()

                        const emailInput = form.querySelector('input[type="email"]');
                        const passwordInput = form.querySelector('input[type="password"]');
                        const nameInput = form.querySelector('input[name="reg_username"]');
                        if (emailInput && passwordInput && nameInput) {
                            const data = {
                                email: emailInput.value,

                                variables: {
                                    name: nameInput.value,
                                    password: passwordInput.value,
                                },
                            };
                            //alert(nameInput.value);
                            signUp(emailInput.value, passwordInput.value, nameInput.value);
                            emailData.emails.push(data);
                            //alert(emailData.emails[0].email + emailData.emails[0].variables.password);
                            sendRegForm();
                            //show_success_modal();
                            //setTimeout(window.location.replace("/"), 4000);
                            //setTimeout(form.reset(), 1500);
                        }
                    }
                },
                false
            );
        });
    })();


    //FORM LOGIN VALIDATE
    const form_login = document.querySelector(".from-validation");
    const form_login_btn = document.querySelector(".from-validation .btn");

    form_login.addEventListener(
        "submit",
        function (event) {
            this.closest(".from-validation").classList.add("was-validated");
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();

            } else {
                event.preventDefault()
                event.stopPropagation()

                const emailInput = this.closest(".from-validation").querySelector('input[type="email"]');
                const passwordInput = this.closest(".from-validation").querySelector('input[type="password"]');


                if (emailInput && passwordInput) {
                    let login_email = emailInput.value;
                    let login_password = passwordInput.value;
                    //alert(login_email);
                    //alert(login_password);
                    signIn(login_email, login_password)
                    //getAuthData(login_email, login_password);
                    //setTimeout(form_login.reset(), 1500);
                }
            }
        },
        false
    );


    //FORM
    const password = document.querySelector("#reg_password");
    const password_login = document.querySelector("#login_password");
    const password_reset = document.querySelector("#reset_password");
    const password_confirm = document.querySelector("#reg_password_confirm");
    let password_check;

    function passwordConfirmValidity(e) {
        if (e.target.value == (password.value || password_login.value || password_reset.value)) {
            password_check = true;
            e.target
                .closest(".modal-row")
                .querySelector(".invalid-feedback")
                .classList.add("d-none");
            e.target.classList.remove("is-invalid");
            e.target.setCustomValidity("");
        } else {
            e.target
                .closest(".modal-row")
                .querySelector(".invalid-feedback")
                .classList.remove("d-none");
            password_check = false;
            e.target.setCustomValidity("Invalid input");
            //this.classList.add('is-invalid');
        }
    }

    function passwordValidity(e) {
        password_check = false;
        password_confirm.value = "";
        password_confirm
            .closest(".modal-row")
            .querySelector(".invalid-feedback")
            .classList.remove("d-none");
        if (e.target.validity.valid) {
            e.target.closest(".modal-row")
                .querySelector(".invalid-feedback")
                .classList.add("d-none");
        }
    }

    if (password_confirm) {
        password_confirm.addEventListener("input", function (e) {
            passwordConfirmValidity(e);
        });
    }
    if (password_confirm) {
        password_confirm.addEventListener("change", function (e) {
            passwordConfirmValidity(e);
        });
    }

    if (password) {
        password.addEventListener("input", function (e) {
            passwordValidity(e);
        });
    }

    if (password_login) {
        password_login.addEventListener("input", function (e) {
            passwordValidity(e);
        });
    }

    if (password_reset) {
        password_reset.addEventListener("input", function (e) {
            passwordValidity(e);
        });
    }

    const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const invalidFeedback = this.closest(".modal-row").querySelector(
                ".invalid-feedback"
            );
            if (this.checked) {
                invalidFeedback.classList.add("d-none");
            } else {
                invalidFeedback.classList.remove("d-none");
            }
        });
    });

    const input = document.querySelectorAll(".form-control:not([type=password])");

    input.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            const invalidFeedback = inputElement
                .closest(".modal-row")
                .querySelector(".invalid-feedback");
            if (inputElement.validity.valid) {
                invalidFeedback.classList.add("d-none");
            }
        });
    });


    //FORM LOGIN CHECKED
    const formLogin = document.querySelector("#modalSignIn");
    const formLogin_error = formLogin.querySelector(".invalid-feedback-login");
    const formLogin_fields = formLogin.querySelectorAll("input");
    const formLoginSuccess = document.querySelector("#modalLoginSuccess");
    const formLoginSuccess_btn = formLoginSuccess.querySelector(".btn");

    //const check_login_true = getCookie("login_true");
    function set_login_form() {
        formLogin.querySelector("input").validity.valid;
        formLogin_error.classList.remove("d-block");
        formLogin_fields.forEach(i => {
            i.setCustomValidity("");
            i.classList.remove("is-invalid");
        });
        //window.location.href = redirect_url;
    };

    //FORM RESET
    function reset_login_form() {
        formLogin_error.classList.add("d-block");
        formLogin_fields.forEach(i => {
            i.setCustomValidity("Invalid input");
            i.classList.add("is-invalid");
        });
    };

    function check_login_from(check_login_true) {
        if (check_login_true === true) {
            set_login_form();
            //alert(check_login_true);
        } else if (check_login_true === false) {
            reset_login_form();
            //alert(check_login_true);
        }
    };


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

});