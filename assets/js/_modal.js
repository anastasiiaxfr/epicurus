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
            form_reset();
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
        form_reset();
        if (!body.classList.contains("modal-open")) {
            body.style.overflow = "";
            body.style.paddingRight = "";
        }
    });
});


