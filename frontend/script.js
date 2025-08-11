// URLs da api
const API_URL_BASE = 'http://localhost:3000';
// ---------------------- ------------------------------------- ----------------
const listaFilmesSection = document.getElementById('lista-filmes');
const cadastroFilmesSection = document.getElementById('cadastro-filmes');
const btnFilmes = document.getElementById('btn-filmes');
const btnCadastro = document.getElementById('btn-cadastro');
const formCadastro = document.getElementById('form-cadastro');
const totalPositivosElement = document.getElementById('total-positivos');
const totalNegativosElement = document.getElementById('total-negativos');

// Função para alternar entre as seções de filmes e cadastro
function toggleSections(activeSection) {
    listaFilmesSection.classList.remove('conteudo-ativo');
    cadastroFilmesSection.classList.remove('conteudo-ativo');
    btnFilmes.classList.remove('active');
    btnCadastro.classList.remove('active');

    if (activeSection === 'filmes') {
        listaFilmesSection.classList.add('conteudo-ativo');
        btnFilmes.classList.add('active');
        fetchAndDisplayFilmes();
    } else {
        cadastroFilmesSection.classList.add('conteudo-ativo');
        btnCadastro.classList.add('active');
    }
}

// Event Listeners para os botões de navegação
btnFilmes.addEventListener('click', () => {
    toggleSections('filmes');
});

btnCadastro.addEventListener('click', () => {
    toggleSections('cadastro');
});

// Função para buscar e exibir os filmes e totais
async function fetchAndDisplayFilmes() {
    try {
        const filmesResponse = await fetch(`${API_URL_BASE}/filmes`);
        if (!filmesResponse.ok) {
            throw new Error('Erro ao buscar os filmes');
        }
        const filmes = await filmesResponse.json();
        
        const totaisResponse = await fetch(`${API_URL_BASE}/totais`);
        if (!totaisResponse.ok) {
            throw new Error('Erro ao buscar os totais');
        }
        const totais = await totaisResponse.json();

        totalPositivosElement.textContent = totais.totalGostei;
        totalNegativosElement.textContent = totais.totalNaoGostei;
        listaFilmesSection.innerHTML = '';

        filmes.forEach(filme => {
            const card = document.createElement('div');
            card.className = 'filme-card';
            card.innerHTML = `
                <div class="card-imagem">
                    <img src="${filme.imagem}" alt="${filme.titulo}">
                </div>
                <div class="card-conteudo">
                    <h3>${filme.titulo}</h3>
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p>${filme.descricao}</p>
                    <div class="votacao">
                        <div>
                            <span>👍 <span class="gostei-contador">${filme.gostei}</span></span>
                            <span>👎 <span class="naoGostei-contador">${filme.naoGostei}</span></span>
                        </div>
                        <div>
                            <button onclick="votar(${filme.id}, 'gostei')">Gostei</button>
                            <button onclick="votar(${filme.id}, 'naoGostei')">Não Gostei</button>
                        </div>
                    </div>
                </div>
            `;
            listaFilmesSection.appendChild(card);
        });
    } catch (error) {
        console.error('Erro na requisição da API:', error);
        listaFilmesSection.innerHTML = '<p>Não foi possível carregar os filmes. Por favor, verifique se o servidor está ativo.</p>';
    }
}

// registro de votos
async function votar(id, tipoVoto) {
    try {
        const response = await fetch(`${API_URL_BASE}/filmes/${id}/votar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tipoVoto }),
        });
        if (response.ok) {
            fetchAndDisplayFilmes();
        } else {
            console.error('Falha ao registrar o voto.');
        }
    } catch (error) {
        console.error('Erro ao votar:', error);
    }
}

// Event listener para o formulário de cadastro
formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const novoFilme = {
        titulo: document.getElementById('titulo').value,
        genero: document.getElementById('genero').value,
        descricao: document.getElementById('descricao').value,
        imagem: document.getElementById('imagem').value 
    };
    try {
        const response = await fetch(`${API_URL_BASE}/filmes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoFilme),
        });
        if (response.status === 201) {
            alert('Filme cadastrado com sucesso!');
            formCadastro.reset();
            toggleSections('filmes');
        } else {
            alert('Erro ao cadastrar o filme. Verifique o console para mais detalhes.');
            const errorData = await response.json();
            console.error('Resposta da API:', errorData);
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar o filme. Verifique o console para mais detalhes.');
    }
});


// inicializa a aplicação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    toggleSections('filmes');
});