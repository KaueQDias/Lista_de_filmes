document.addEventListener("DOMContentLoaded", function () {
    const escolherFilmeButton = document.getElementById("escolherFilme");
    const filmeEscolhidoElement = document.getElementById("filmeEscolhido");
    const listaFilmes = document.getElementById("lista-filmes");
    const imagemFilmeElement = document.getElementById("imagemFilme");
    const botaoFilmeAssistido = document.getElementById("filmeAssistido");

    // Recupere a lista de filmes assistidos do localStorage
    let filmesAssistidos = JSON.parse(localStorage.getItem("filmesAssistidos")) || [];

    // Função para atualizar a lista de filmes
    function atualizarLista() {
        listaFilmes.innerHTML = "";
        filmesAssistidos.forEach(filme => {
            const listItem = document.createElement("li");
            listItem.textContent = filme;
            listaFilmes.appendChild(listItem);
        });
    }

    // Atualize a lista ao carregar a página
    atualizarLista();

    escolherFilmeButton.addEventListener("click", function () {
        fetch("assets/filmes.txt")
            .then(response => response.text())
            .then(data => {
                const filmes = data.split('\n');
                let filmeAleatorio;

                do {
                    filmeAleatorio = filmes[Math.floor(Math.random() * filmes.length)];
                } while (filmesAssistidos.includes(filmeAleatorio));

                filmeEscolhidoElement.textContent = `Filme escolhido: ${filmeAleatorio}`;

                // Exibir a imagem correspondente ao filme
                const imagemFilme = `assets/img/${filmeAleatorio}.jpg`;
                imagemFilmeElement.src = imagemFilme;
            })
            .catch(error => console.error("Erro ao buscar a lista de filmes: " + error));
    });

    botaoFilmeAssistido.addEventListener("click", function () {
        const filmeEscolhido = filmeEscolhidoElement.textContent.replace("Filme escolhido: ", "");

        if (filmeEscolhido && !filmesAssistidos.includes(filmeEscolhido)) {
            filmesAssistidos.push(filmeEscolhido);
            localStorage.setItem("filmesAssistidos", JSON.stringify(filmesAssistidos));
            atualizarLista();
        }
    });

    document.getElementById("limpar-lista").addEventListener("click", function () {
        // Limpa a lista local
        filmesAssistidos = [];
        localStorage.removeItem("filmesAssistidos");
        atualizarLista();
    });
});
