document.addEventListener('DOMContentLoaded', function () {
    //REDIRECT
    function redirect(token) {
        //alert(token);
        window.location.href = redirect_url + `?token=${token}`;
    }

    //SEND TO SENDPULSE
    function sendRegForm(sp_data) {
        const accessData = {
            "grant_type": "client_credentials",
            "client_id": sp_id,
            "client_secret": sp_secret
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accessData)
        };

        fetch('https://api.sendpulse.com/oauth/access_token', requestOptions)
            .then(response => response.json())
            .then(data => {
                fetch(sp_apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.access_token}`,
                    },
                    body: JSON.stringify(sp_data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        //console.log(data);
                    })
                    .catch((error) => console.error(error));
            })
            .catch(error => console.error(error));
    }



    //FORM REGISTRATION DATA
    //Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");
   
    let isInValid = true;

    (function () {
        "use strict";

        //Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                "submit",
                function (event) {
                    form.classList.add("was-validated");

                    event.preventDefault()
                    event.stopPropagation()

                    const emailInput = form.querySelector('input[type="email"]');
                    const passwordInput = form.querySelector('input[type="password"]');
                    const nameInput = form.querySelector('input[name="reg_username"]');
                    if (emailInput && passwordInput && nameInput) {
                        const emailData = {
                            emails: [{
                                email: emailInput.value,

                                variables: {
                                    name: nameInput.value,
                                    referrer: 'Epicurus_LP'
                                },
                            }],
                        };

                        //alert(nameInput.value);
                        if (emailInput.value.length > 0 && passwordInput.value.length > 0 && nameInput.value.length > 0) {
                            sendRegForm(emailData);
                            signUp(emailInput.value, passwordInput.value, nameInput.value, check_login_from);
                        }

                        //alert(emailData.emails[0].email + emailData.emails[0].variables.password);

                        //show_success_modal();
                        //setTimeout(window.location.replace("/"), 4000);
                        //setTimeout(form.reset(), 1500);
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

            event.preventDefault()
            event.stopPropagation()

            const emailInput = this.closest(".from-validation").querySelector('input[type="email"]');
            const passwordInput = this.closest(".from-validation").querySelector('input[type="password"]');



            if (emailInput && passwordInput) {
                let login_email = emailInput.value;
                let login_password = passwordInput.value;
                //alert(login_email);
                //alert(login_password);

                if (login_email.length > 0 && login_password.length > 0) {
                    signIn(login_email, login_password, check_login_from);
                }
                //getAuthData(login_email, login_password);
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
                invalidFeedback.classList.remove("d-none");
            }
        });
    });

    const input = document.querySelectorAll(".form-control:not([type=password])");
    const form_error = document.querySelectorAll('form');

    input.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            const invalidFeedback = inputElement
                .closest(".modal-row")
                .querySelector(".invalid-feedback");
            if (inputElement.validity.valid) {
                invalidFeedback.classList.add("d-none");
                
                
            }
        });

        inputElement.addEventListener("change", function (e) {
            const invalidFeedback = inputElement
                .closest(".modal-row")
                .querySelector(".invalid-feedback");
            set_login_form();
           
        });
    });

    //FORM LOGIN CHECKED
    const formLogin = document.querySelector("#modalSignIn");
    const formLogin_error = formLogin.querySelector(".invalid-feedback-all");
    const form_login_fields = formLogin.querySelectorAll("input");
    const formLoginSuccess = document.querySelector("#modalLoginSuccess");
    const formLoginSuccess_btn = formLoginSuccess.querySelector(".btn");
    const formReg = document.querySelector('[name="Epicurus_LP_reg"]');
    const formReg_error = formReg.querySelector(".invalid-feedback-all");
    const form_reg_fields = formReg.querySelectorAll("input");

    //const check_login_true = getCookie("login_true");
    function set_login_form() {
        formLogin.querySelector("input").validity.valid;
        formLogin_error.classList.remove("d-block");
        form_login_fields.forEach(i => {
            i.setCustomValidity("");
            i.classList.remove("is-invalid");
        });
       
    };

    //FORM RESET
    function reset_login_form() {
        formLogin_error.classList.add("d-block");
        form_login_fields.forEach(i => {
            if (!i.validity.valid) {
                i.setCustomValidity("Invalid input");
                i.classList.add("is-invalid");
            }
        });

        form_reset();
    };
    function reset_reg_form() {
        formReg_error.classList.add("d-block");
        form_reg_fields.forEach(i => {
            if (!i.validity.valid) {
                i.setCustomValidity("Invalid input");
                i.classList.add("is-invalid");
            }
        });

        form_reset();
    };

    function check_login_from(check_login_true, form, token) {
        if (check_login_true === true) {
            set_login_form();
            redirect(token);
            form_reset();
            //alert(check_login_true);
        } else if (check_login_true === false) {
            if(form === 'reg'){
                reset_reg_form();
            } else {
                reset_login_form();
            }
            //alert(check_login_true);
        }
    };

});