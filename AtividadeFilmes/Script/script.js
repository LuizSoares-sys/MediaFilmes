const API_KEY = "8bd5d9b1";

const form = document.getElementById("formBusca");
const input = document.getElementById("inputBusca");
const resultados = document.getElementById("resultados");
const mensagem = document.getElementById("mensagem");

const modal = document.getElementById("modal");
const modalConteudo = document.getElementById("modalConteudo");
const btnFechar = document.getElementById("btnFechar");


// buscar filmes
async function buscarFilmes(nome){

  resultados.innerHTML = "";
  mensagem.innerText = "Carregando...";

  const resp = await fetch(
    `https://www.omdbapi.com/?s=${nome}&apikey=${API_KEY}`
  );

  const dados = await resp.json();

  if(dados.Response === "False"){
    mensagem.innerText = "Filme não encontrado";
    return;
  }

  mensagem.innerText = "";

  dados.Search.forEach(filme => {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
      <img src="${filme.Poster}">
      <h3>${filme.Title}</h3>
      <p>${filme.Year}</p>
    `;

    card.onclick = () => abrirModal(filme.imdbID);

    resultados.appendChild(card);

  });

}


// abrir modal
async function abrirModal(id){

  modal.style.display = "flex";

  const resp = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`
  );

  const filme = await resp.json();

  modalConteudo.innerHTML = `
    <h2>${filme.Title}</h2>
    <img src="${filme.Poster}" width="200">
    <p>${filme.Plot}</p>
  `;

}


// fechar modal
btnFechar.onclick = () => {

  modal.style.display = "none";

};


// submit
form.addEventListener("submit", function(e){

  e.preventDefault();

  const nome = input.value.trim();

  if(nome === ""){
    mensagem.innerText = "Digite um filme";
    return;
  }

  buscarFilmes(nome);

});