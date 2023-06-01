
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

