const characterAPI = "https://rickandmortyapi.com/api/character";
const $characterList = document.getElementById("characters-container");
const $changeCharacters = document.getElementsByClassName("other-characters");

fetch(characterAPI)
  .then(response => response.json())
  .then(results => populatePage(results))

function populatePage(allResults) {
  let { info, results } = allResults;
  console.log(info, results)
  assignCharacters(results);
  assignInfo(info);
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

function assignInfo(info) {
  const { count, pages, next, prev } = info;
  const $previousRotation1 = document.createElement("button");
  const $nextRotation1 = document.createElement("button");
  const $previousRotation2 = document.createElement("button");
  const $nextRotation2 = document.createElement("button");
  $previousRotation1.textContent = "Previous";
  $nextRotation1.textContent = "Next";
  $previousRotation2.textContent = "Previous";
  $nextRotation2.textContent = "Next";
  const $description1 = document.createElement("p");
  const $description2 = document.createElement("p");
  const currentPage = next ? calculatePage(next) : pages;
  const currentCount = ((currentPage-1)*20)+1;
  $description1.innerText = `Page ${currentPage} of ${pages}. Displaying ${currentCount}-${currentCount+19} of ${count}.`
  $description2.innerText = `Page ${currentPage} of ${pages}. Displaying ${currentCount}-${currentCount+19} of ${count}.`
  $changeCharacters[0].append($previousRotation1, $description1, $nextRotation1);
  $changeCharacters[1].append($previousRotation2, $description2, $nextRotation2);
}

function calculatePage(pageAddress) {
  const nextPage = parseInt(pageAddress.split("page=")[1]);
  return nextPage-1;
}