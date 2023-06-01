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


