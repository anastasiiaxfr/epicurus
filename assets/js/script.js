document.addEventListener('DOMContentLoaded', function() {

//MENU TOGGLE
let navbar_toggle = document.querySelector('.navbar-toggler');
let navbar_toggle_open = document.querySelector('.navbar-toggler-open');
let navbar_toggle_close = document.querySelector('.navbar-toggler-close');

navbar_toggle.addEventListener('click', function () {
    navbar_toggle_close.classList.toggle('d-block')
    navbar_toggle_open.classList.toggle('d-none')
});


//COLLAPSE
let collapse_toggle = document.querySelector('.toc__header');
let collapse_body = document.querySelector('.toc__body');
if (collapse_toggle) {
    collapse_toggle.addEventListener('click', function () {
        this.firstElementChild.classList.toggle('active');
        collapse_body.classList.toggle('d-block');
    })
};


//TEXT COPY
function copy(el) {
    let text_parent = document.querySelector(el);
    let text = '';
    document.querySelectorAll(`${el} li`).forEach(li => {
        text += li.textContent + '\n';
    });
    let text_copy = document.createElement('span');
    text_copy.classList.add('copy');
    text_copy.textContent = 'Copy all IPs';

    text_parent && text_parent.parentNode.insertBefore(text_copy, text_parent.nextSibling);

    text_copy.addEventListener('click', async () => {
        text_copy.classList.toggle('active');
        text_parent.classList.toggle('active');
        try {
            await navigator.clipboard.writeText(text);
            //console.log(text);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

    });
}

copy('#p4 + ul');
copy('#p3 + ul');


//COOKIE
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

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

//GENERATE JWT TOKEN
const getToken = async (token) => {
    
    const jwt = 'https://jwtecho.pixegami.io';
    const certStr =
      "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAOSiZ8/teEIgMA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIz\nMDUyMjA5MzkzMVoXDTIzMDYwNzIxNTQzMVowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQDVa5tRVVAWGZFRze9/YQZcXyVXLjvyU+DK1EkmZwYOe30D\nsw/fov5g34upphGLYsN6oZAp8kjiRPUBUhdBodZfeIIfgbcAGsfQ0OLPeWliIq1S\npQb9e2j4c58bsb5uotqyBC2CAmNrBmU0ASYLYAVf/+gSzfZPNBrcYuWlf8/+P+9Z\nEMy/gWb/bUSrKxAasoDDLLxNWGYQ0omOPCQsjyQxdJlmYfgWetemJ442TLkNcJ9R\nBb0KkBu4QKaBBmheIb38/VnIMH2/oe21UsD4u4tJpYbqff8gAuU6ql8gXHlClYF0\nBpbx5W0l3hqlsUN43EFQcixTt+7jT3GrsERlQPw3AgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQDHsfCD+bnyOFZ2h0ETUss/EZgOjhEdklZwAI1OebgW\nhQ0neV33Fa4MNe2sIGMFCHPLLEY9KWaQPqz5asIiWB05NejSyzQsrv3Qll4/eUn1\nInnYGksFh/i5Bni6unem0Y7gik1Z9HFH7dFk82X2v8c+9F/44dXbbzIEDG430vn6\nVONeT3/bf8+B89hVqhjEufCIt7TohSG1Hy8I7ZbOHrKku5UpVpq0yfVXN7vh2vt8\nJLPAwYXQA+A2XbHRRPlvnKOTozPn57P+5X7W2WxCfh2Dr7f6dEy2E2yX+eoXW2gz\nbllJ13HWd00ZWtukwJU9I/GKh2JtTemWQ+5Hh48aBzEG\n-----END CERTIFICATE-----\n";
    const encodedCertStr = encodeURIComponent(certStr);
    const audience = projectId;
    const verificationEndpoint = `${jwt}/verify?audience=${audience}&cert_str=${encodedCertStr}`;

    const requestInfo = {
        headers: {
          Authorization: "Bearer " + token + "xx",
        }
    };
    const response = await fetch(jwt, requestInfo);
    const responseBody = await response.json();
    console.log('responseBody', responseBody);
    
}

//FIREBASE
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


//FIREBASE LOGIN
const signIn = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        getToken(idToken);
        check_login_from(true);
        // console.log(idToken)

        window.location.href = redirect_url;
        
      }
      catch(error){
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-in error:", errorCode, errorMessage);
        check_login_from(false)
      };
};

//SEND to SendPulse
function getKey() {
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
        .then(data => setCookie("access_token", data.access_token, 1 / 4))
        .catch(error => console.error(error));
}

const apiUrl = `https://api.sendpulse.com/addressbooks/${sp_addressBookId}/emails`;

const emailData = {
    emails: [],
};

getKey();
let access_token = getCookie("access_token");

//ADD_USER_SENDPULSE
function sendRegForm() {
    setCookie("form_send", true, 1 / 4);

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(emailData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            show_form_send()
        })
        .catch((error) => console.error(error));
}

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
                    if (emailInput && passwordInput) {
                        const data = {
                            email: emailInput.value,

                            variables: {
                                password: passwordInput.value,
                            },
                        };

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

function show_form_send(){

};

if (check_form_send) {
    if (check_form_send === "true") {
        formSend.classList.add('d-block', 'show');

    } else {
        formSend.classList.remove('d-block', 'show');
};
form_send_close.addEventListener('click', function () {
    removeCookie("form_send");
    window.location.replace("/");
});

formSend.addEventListener("click", function (e) {
    removeCookie("form_send");
    window.location.replace("/");
});
};


//USER CLICK ON LINK INSIDE EMAIL
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


//MODAL (FIXME https://getbootstrap.com/docs/5.0/components/modal/#toggle-between-modals)
const modal = document.querySelectorAll(".modal");
const modal_toggle = document.querySelectorAll(
    '.modal [data-bs-toggle="modal"]'
);
const modal_toggle_all = document.querySelectorAll('[data-bs-toggle="modal"]');
const modal_close = document.querySelectorAll(
    '.modal [data-bs-dismiss="modal"]'
);
const modal_content = document.querySelector(".modal-content");
const body = document.body;

modal.forEach(function (ell) {
    ell.addEventListener("click", function (e) {
        if (!e.target.closest(".modal-content")) {
            this.classList.add("d-none");
            this.classList.remove("show");
        }
    });
});

modal_toggle.forEach(function (ell) {
    ell.addEventListener("click", function () {
        const modal = this.closest(".modal");
        modal.classList.remove("show");
        modal.style.display = "none";
        const modal_wrapper = document.querySelector(".modal-backdrop");
        if (modal_wrapper) {
            modal_wrapper.classList.add("d-none");
        }
    });
});

modal_toggle_all.forEach(function (ell) {
    ell.addEventListener("click", function () {
        const modal_target = this.getAttribute("data-bs-target");
        document.querySelector(modal_target).classList.add("show");
        document.querySelector(modal_target).style.display = "block";
    });
});

modal_close.forEach(function (ell) {
    ell.addEventListener("click", function () {
        const modal_current = this.closest(".modal");
        modal_current.classList.remove("show");
        modal_current.classList.remove("d-block");

        if (!body.classList.contains("modal-open")) {
            body.style.overflow = "";
            body.style.paddingRight = "";
        }
    });
});

});