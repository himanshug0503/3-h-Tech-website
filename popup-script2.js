const popup = document.getElementById('popup');
const getInTouchButton = document.getElementById('get-in-touch');
const crossBtn = document.getElementById('popup-close');

function openPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
}

getInTouchButton.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup();
});

crossBtn.addEventListener('click', closePopup);

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});
