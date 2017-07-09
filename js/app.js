
const buttonEl = document.getElementById('requestResourceButton');

const contentDivEl = document.getElementById('contentContainer');

buttonEl.addEventListener('click', getData);

function createXHR(method, url, cb){
  var newRequest = new XMLHttpRequest ();

  newRequest.addEventListener('load', cb);
  newRequest.open(method, url);
  newRequest.send();
}

function getData(){

  const itemSelector = document.getElementById('resourceType');
  const input = document.getElementById('resourceId');

  var type = itemSelector.value;
  var id = input.value;

  switch(type){
    case 'people':
      var personRequest = createXHR("GET", `http://swapi.co/api/${type}/${id}/`, populatePerson);
      break;

    case 'planets':
      var planetsRequest = createXHR("GET", `http://swapi.co/api/${type}/${id}/`, populatePlanet);
      break;

    case 'starships':
      var starshipRequest = createXHR("GET", `http://swapi.co/api/${type}/${id}/`, populateStarship);
      break;
  }

  function populateFilmList(parentUl){
    return function (){
      var filmObj = JSON.parse(this.responseText);

      var filmLiEl = document.createElement('li');
      filmLiEl.innerHTML = filmObj.title;
      parentUl.appendChild(filmLiEl);
    }
  }

  function populatePerson() {
    contentDivEl.innerHTML = '';

    var personObj = JSON.parse(this.responseText);

    var nameEl = document.createElement('h2');
    nameEl.innerHTML = personObj.name;
    contentDivEl.appendChild(nameEl);

    var genderEl = document.createElement('p');
    genderEl.innerHTML = 'Gender - ' + personObj.gender;
    contentDivEl.appendChild(genderEl);

    var speciesRequest = createXHR("GET", personObj.species[0], populateSpecies);

    function populateSpecies (){
      var speciesObj = JSON.parse(this.responseText);

      var speciesEl = document.createElement('p');
      speciesEl.innerHTML = 'Species - ' + speciesObj.name;

      contentDivEl.appendChild(speciesEl);
    }
  }

  function populatePlanet() {
    contentDivEl.innerHTML = '';

    var planetObj = JSON.parse(this.responseText);

    var nameEl = document.createElement('h2');
    nameEl.innerHTML = planetObj.name;
    contentDivEl.appendChild(nameEl);

    var terrainEl = document.createElement('p');
    terrainEl.innerHTML = 'Terrain - ' + planetObj.terrain;
    contentDivEl.appendChild(terrainEl);

    var populationEl = document.createElement('p');
    populationEl.innerHTML = 'Population - ' + planetObj.population;
    contentDivEl.appendChild(populationEl);

    var filmsArr = planetObj.films;

    var filmsListEl = document.createElement('ul');
    filmsListEl.innerHTML = 'Films this planet appears in:';
    contentDivEl.appendChild(filmsListEl);

    filmsArr.forEach((filmUrl) => {
      var filmRequest = createXHR("GET", filmUrl, populateFilmList(filmsListEl));
    });
  }

  function populateStarship() {
    contentDivEl.innerHTML = '';

    var starshipObj = JSON.parse(this.responseText);

    var nameEl = document.createElement('h2');
    nameEl.innerHTML = starshipObj.name;
    contentDivEl.appendChild(nameEl);

    var manufacturerEl = document.createElement('p');
    manufacturerEl.innerHTML = 'Manufacturer - ' + starshipObj.manufacturer;
    contentDivEl.appendChild(manufacturerEl);

    var starshipClassEl = document.createElement('p');
    starshipClassEl.innerHTML = 'Starship class - ' + starshipObj.starship_class;
    contentDivEl.appendChild(starshipClassEl);

    var filmsArr = starshipObj.films;

    var filmsListEl = document.createElement('ul');
    filmsListEl.innerHTML = "Films this starship appears in:";
    contentDivEl.appendChild(filmsListEl);

    filmsArr.forEach((filmUrl) => {
      var filmRequest = createXHR("GET", filmUrl, populateFilmList(filmsListEl));
    });
  }
}