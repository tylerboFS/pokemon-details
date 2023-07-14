let pokeListGlobal = null; 

//fetch a list of objects and return that list
const getAllPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokeList = await response.json();
  return pokeList.results;
};

const getSinglePokemon = async (url) => {
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
};

//Create a ul and display it on the page
const renderPokelist = () => {
  const root = document.querySelector("#root");

  root.innerHTML = "";

  const ul = document.createElement("ul");

  for (let i = 0; i < pokeListGlobal.length; i++) {
    const li = document.createElement("li");
    li.innerText = pokeListGlobal[i].name;

    li.setAttribute("data-url", pokeListGlobal[i].url);
    li.setAttribute("data-food", "chimichanga");
    ul.appendChild(li);

    //add event listener
    li.addEventListener("click", pokemonClickHandler);

    //when clicked grab url, fetch data from url, redraw page with what I want to see.
  }

  root.appendChild(ul);
};

const renderSinglePokemon = (pokeObject) => {

  //clear the page
  const root = document.querySelector("#root");
  root.innerHTML = "";

  //create the title
  const h1 = document.createElement('h1');
  h1.innerText = pokeObject.name;

  //create the image
  const img = document.createElement("img");
  img.src = pokeObject.sprites.front_default;
  img.style.height = "200px";
  
  //create the button
  const backButton = document.createElement("button");
  backButton.innerText = "Go Back";

  //add eventlistener to the back button
  backButton.addEventListener("click", backButtonHandler);
  
  //append everything in order
  root.appendChild(h1);
  root.appendChild(img);
  root.appendChild(document.createElement('br'));
  root.appendChild(backButton);
};

const backButtonHandler = () => {
  renderPokelist();
};

const pokemonClickHandler = async (e) => {
  const pokemonLi = e.target;
  const url = pokemonLi.dataset.url;

  //fetch data from url
  const myPokemon = await getSinglePokemon(url);

  renderSinglePokemon(myPokemon);
};

const main = async () => {
  pokeListGlobal = await getAllPokemon();
  
  // Display all the pokemon
  renderPokelist();
};

main();
