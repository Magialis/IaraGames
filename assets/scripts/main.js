/* Botão voltar ao topo */
window.onscroll = function () {
    mostrarEsconderBotao();
};

function mostrarEsconderBotao() {
    var btn = document.getElementById("btnTopo");

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

/* Evita que clique dentro do dropdown feche o dropdown */
document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
    menu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});

/* Filtro da aba Novidades */
document.addEventListener("DOMContentLoaded", () => {
    const newsSection = document.querySelector(".news");

    if (!newsSection) return;

    // Escopado dentro de .news para não pegar os inputs
    // de mesmo id que existem no filtro da searchbar do topo
    const ordenarInputs = newsSection.querySelectorAll('input[name="ordenar"]');

    const generoInputs = newsSection.querySelectorAll(
        "#acao, #aventura, #corrida, #rpg"
    );

    const desktopContainer = document.querySelector(
        ".news-cards.d-none.d-md-block"
    );

    const mobileContainer = document.querySelector(
        ".news-cards.d-block.d-md-none"
    );

    if (!desktopContainer || !mobileContainer) return;

    const desktopCards = Array.from(
        desktopContainer.querySelectorAll(".card.card--horizontal")
    );

    const mobileCarousel = mobileContainer.querySelector(
        "#news-carousel-mobile"
    );

    const mobileInner = mobileCarousel.querySelector(".carousel-inner");

    const mobileItems = Array.from(
        mobileInner.querySelectorAll(".carousel-item")
    );

    let mobileCarouselInstance = null;

    function getGenerosSelecionados() {
        return Array.from(generoInputs)
            .filter(input => input.checked)
            .map(input => input.value);
    }

    function getOrdenacao() {
        const selecionado = newsSection.querySelector(
            'input[name="ordenar"]:checked'
        );

        return selecionado ? selecionado.value : "relevante";
    }

    function filtrar(cards) {
        const generos = getGenerosSelecionados();

        if (generos.length === 0) {
            return [...cards];
        }

        return cards.filter(card =>
            generos.includes(card.dataset.genero)
        );
    }

    function ordenar(cards) {
        const ordem = getOrdenacao();

        const resultado = [...cards];

        if (ordem === "maior-preco") {
            resultado.sort(
                (a, b) => Number(b.dataset.preco) - Number(a.dataset.preco)
            );
        }

        if (ordem === "menor-preco") {
            resultado.sort(
                (a, b) => Number(a.dataset.preco) - Number(b.dataset.preco)
            );
        }

        if (ordem === "relevante") {
            resultado.sort(
                (a, b) => Number(a.dataset.originalIndex) - Number(b.dataset.originalIndex)
            );
        }

        return resultado;
    }

    function atualizarDesktop() {
        const filtrados = filtrar(desktopCards);
        const resultado = ordenar(filtrados);

        desktopCards.forEach(card => card.remove());
        resultado.forEach(card => desktopContainer.appendChild(card));

        desktopCards.forEach(card => {
            card.style.display = "none";
        });

        resultado.forEach(card => {
            card.style.display = "";
        });
    }

    function destruirCarousel() {
        if (mobileCarouselInstance) {
            mobileCarouselInstance.dispose();
            mobileCarouselInstance = null;
        }
    }

    function criarCarousel() {
        if (typeof bootstrap === "undefined") return;

        mobileCarouselInstance = new bootstrap.Carousel(mobileCarousel, {
            interval: false,
            ride: false,
            wrap: true
        });
    }

    function atualizarIndicadores(quantidade) {
        const indicadores = mobileCarousel.querySelector(".carousel-indicators");

        indicadores.innerHTML = "";

        for (let i = 0; i < quantidade; i++) {
            const button = document.createElement("button");

            button.type = "button";
            button.dataset.bsTarget = "#news-carousel-mobile";
            button.dataset.bsSlideTo = i;

            if (i === 0) {
                button.classList.add("active");
                button.setAttribute("aria-current", "true");
            }

            button.setAttribute("aria-label", `Slide ${i + 1}`);

            indicadores.appendChild(button);
        }
    }

    function atualizarMobile() {
        const filtrados = filtrar(mobileItems);
        const resultado = ordenar(filtrados);

        destruirCarousel();

        mobileItems.forEach(item => {
            item.classList.remove(
                "active", "carousel-item-next", "carousel-item-prev",
                "carousel-item-start", "carousel-item-end"
            );
            item.remove();
        });

        resultado.forEach((item, index) => {
            item.classList.remove(
                "active", "carousel-item-next", "carousel-item-prev",
                "carousel-item-start", "carousel-item-end"
            );

            if (index === 0) {
                item.classList.add("active");
            }

            mobileInner.appendChild(item);
        });

        atualizarIndicadores(resultado.length);
        criarCarousel();
    }

    function atualizarFiltros() {
        atualizarDesktop();
        atualizarMobile();
    }

    ordenarInputs.forEach(input => {
        input.addEventListener("change", atualizarFiltros);
    });

    generoInputs.forEach(input => {
        input.addEventListener("change", atualizarFiltros);
    });

    atualizarDesktop();

    mobileItems.forEach(item => item.classList.remove("active"));

    const primeiroItem = mobileItems[0];

    if (primeiroItem) {
        primeiroItem.classList.add("active");
    }

    atualizarIndicadores(mobileItems.length);
    criarCarousel();
});