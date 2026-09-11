// Ouve o evento de rolagem da página
window.onscroll = function() {
    mostrarEsconderBotao();
};

function mostrarEsconderBotao() {
    var btn = document.getElementById("btnTopo");

  // Se rolou mais de 200px para baixo, exibe o botão
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
    } else {
    btn.style.display = "none";
    }
}

function voltarAoTopo() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
}