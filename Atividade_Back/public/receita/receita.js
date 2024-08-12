import { checkLogin } from "../login/login.js";
import { urlBaseAPI, urlBaseFront } from "../url/base.js";

let dados = [];

function desenhaTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < dados.length; i++) {
        const tr = document.createElement('tr');
        const btEx = document.createElement('button');
        const btEd = document.createElement('button');

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        const td7 = document.createElement('td');

        btEx.innerText = '-';
        btEx.setAttribute('data-id', dados[i].id);
        btEx.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            alternaModal();
            enviaDadosParaDelecao(id);
        });

        btEd.innerText = '.';
        btEd.setAttribute('data-index', i);
        btEd.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            alternaModal();
            preencheFormParaEdicao(index);
        });

        td1.innerText = dados[i].id;
        td2.innerText = dados[i].pizza.nome;
        td3.innerText = dados[i].ingrediente;
        td4.innerText = dados[i].modoPreparo;
        td5.innerText = dados[i].tempoPreparo;
        td6.innerText = dados[i].temperaturaForno;
        td7.append(btEd, btEx);

        tr.append(td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);
    }
}

function carregaPizzas() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/pizzas`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            //alert(json);
            const select = document.getElementById('PizzaId');
            select.innerHTML = '';
            for (let i = 0; i < json.length; i++) {
                const option = document.createElement('option');
                option.innerText = json[i].nome;
                option.value = json[i].id;
                select.append(option);                
            }            
        })
}

function carregaDados() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/receitas`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            //alert(json);
            dados = json;
            desenhaTabela();
        })
}

function enviaDadosParaCadastro() {
    const dados = new FormData(document.querySelector('form'));
    const opcoes = {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/receitas`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            alert('Receita cadastrada!');
            carregaDados();
        })
    alternaModal();
}

function enviaDadosParaDelecao(id) {
    const dados = new FormData();
    dados.append('id', id);
    const opcoes = {
        method: 'delete',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/receitas`, opcoes)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            alert('Receita deletada!');
            carregaDados();
        })
    alternaModal();
}

function preencheFormParaEdicao(index) {
    document.querySelector('#id').value = dados[index].id;
    document.querySelector('#PizzaId').value = dados[index].PizzaId;
    document.querySelector('#ingrediente').value = dados[index].ingrediente;
    document.querySelector('#modoPreparo').value = dados[index].modoPreparo;
    document.querySelector('#tempoPreparo').value = dados[index].tempoPreparo;
    document.querySelector('#temperaturaForno').value = dados[index].temperaturaForno;
    
}

function enviaDadosParaEdicao() {
    const dados = new FormData(document.querySelector('form'));
    const opcoes = {
        method: 'put',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/receitas`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            alert('Receita alterada!');
            carregaDados();
        })
    alternaModal();
}

function alternaModal() {
    document.querySelector('#modal').classList.toggle('mostrarModal');
}

document.querySelector('form button').addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelector('#id').value) {
        enviaDadosParaEdicao();
    } else {
        enviaDadosParaCadastro();
    }
    document.querySelector('#id').value = '';
    e.target.parentNode.reset();
});

document.querySelector('#btNovo').addEventListener('click', alternaModal);

window.addEventListener('load', () => {
    checkLogin()
    .then((res)=>{
        if(res){
            carregaPizzas();
            carregaDados();
        } else {
            window.location = `${urlBaseFront}/login/login.html`;
        }
    })    
});

