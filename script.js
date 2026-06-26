const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`).then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data;
    })
    console.log(result)
    return result;
}

const keys = ['name','status','species','gender','origin','episode'];

const buildResult = (result) => {
    const newObject = {};
    keys.map((key) => document.getElementById(key))
    .map((elem) => {
        if(elem.checked && typeof(result[elem.name]) !== 'object'){
            const newElem = document.createElement('p');
            newElem.innerHTML = `${elem.name} : ${result[elem.name]}`;
            content.appendChild(newElem);
        }

    });

    return newObject;
}

// Chama os  JSON da API do rik and morty 

btnGo.addEventListener('click', async (event) => {
    event.preventDefault();

    if(characterId.value == ''){
        return content.innerHTML = 'É nescessario fazer um filtro.'
    }

    const result = await fetchApi(characterId.value);
    if(content.firstChild === null){
        conteinerResult.className = 'result-style'
        buildResult(result);
        image.src = `${result.image}`;
    } else {
        content.innerHTML = '';
        conteinerResult.className = 'result-style'
        image.src = `${result.image}`;
        buildResult(result);
    }

})
