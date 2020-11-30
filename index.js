const characterAPI = "https://rickandmortyapi.com/api/character";
const $characterList = document.getElementById("characters-container");

fetch(characterAPI)
  .then(response => response.json())
  .then(results => populatePage(results))

function populatePage(allResults) {
  let { info, results } = allResults;
  // assignInfo(info);
  assignCharacters(results);
}

function assignCharacters(characters) {
  characters.forEach(character => characterInfo(character));
}

function characterInfo(character) {
  const { name, species, location, image, gender, status } = character;

  const $container = document.createElement("li");
    $container.className = `character-container ${status.toLowerCase()}`;
  const $name = document.createElement("h3");
    $name.textContent = name;
  const $image = document.createElement("img");
    $image.src = image;
    $image.width = 150;
    $image.alt = `Portrait of ${name}, a ${species} on Rick and Morty`;
  const $basicInfo = document.createElement("ul");
    $basicInfo.className = "basic-info";
  const $location = document.createElement("li");
    $location.textContent = location.name;
  const $species = document.createElement("li");
    $species.textContent = species;
  const $gender = document.createElement("li");
    $gender.textContent = gender;

  $basicInfo.append($location, $species, $gender);
  $container.append($image, $name, $basicInfo);
  $characterList.append($container);
}