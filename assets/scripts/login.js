const playerBtn = document.querySelector('#player-btn');
const developerBtn = document.querySelector('#developer-btn');

const playerForm = document.querySelector('#player-form');
const developerForm = document.querySelector('#developer-form');

if (playerBtn && developerBtn && playerForm && developerForm) {
    playerBtn.addEventListener('click', () => {
        playerForm.classList.remove('d-none');
        developerForm.classList.add('d-none');

        playerBtn.classList.add('active');
        developerBtn.classList.remove('active');
    });

    developerBtn.addEventListener('click', () => {
        developerForm.classList.remove('d-none');
        playerForm.classList.add('d-none');

        developerBtn.classList.add('active');
        playerBtn.classList.remove('active');
    });
}