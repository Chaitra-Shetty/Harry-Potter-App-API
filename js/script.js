const inpSearch = document.getElementById('inp-search');
const output = document.getElementById('output');

window.addEventListener('load',() => {
    loader();
    fetchCharacters();
});

inpSearch.addEventListener('change',() => {
    let searchQuery = inpSearch.value;
    loader();
    fetchCharacters(searchQuery);
});

function loader(){
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.gif"></img></div>'
}

async function fetchCharacters(query){
    let res;

    if(query){
        res = await fetch(`https://hp-api.herokuapp.com/api/characters/house/${query}`);
    }else{
        res = await fetch('https://hp-api.herokuapp.com/api/characters');
    console.log(res)
    }
    let results = await res.json();

    output.innerHTML = "";

    results.map(result => {
        const htmlString = `<img src="${result.image}" class="img">
        <div class="info-display">
        <h5>Name: ${result.name}</h5>
        <hr>
        <h6>Actor Name: <span>${result.actor}</span></h6>
        <h6>Hogwarts Student: <span>${result.hogwartsStudent}</span></h6>
        <h6>Birthday: <span>${result.dateOfBirth}</span></h6>
        <h6>Species: <span>${result.species}</span></h6>
    </div>`;
   

    let outputString = document.createElement('div');
    outputString.classList.add('col-md-3','mb-3','img-info');
    outputString.innerHTML = htmlString;
    output.appendChild(outputString);

});
}