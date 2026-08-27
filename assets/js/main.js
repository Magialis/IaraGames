document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
    menu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});