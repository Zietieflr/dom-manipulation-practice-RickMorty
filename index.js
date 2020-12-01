const characterAPI = "https://rickandmortyapi.com/api/character";
const $characterList = document.getElementById("characters-container");
const $changeCharacters = document.getElementsByClassName("other-characters");

fetch(characterAPI)
  .then(response => response.json())
  .then(results => populatePage(results));

function populatePage(allResults) {
  let { info, results } = allResults;
  console.log(info, results)
  assignCharacters(results);
  assignInfo(info);
}

function assignCharacters(characters) {
  $characterList.innerHTML = "";
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
  $changeCharacters[0].innerHTML = "";
  $changeCharacters[1].innerHTML = "";
  $changeCharacters[0].append(
    renderNavigation("Previous", prev),
    navigationDescription(pages, count, next),
    renderNavigation("Next", next)
  );
  $changeCharacters[1].append(
    renderNavigation("Previous", prev),
    navigationDescription(pages, count, next),
    renderNavigation("Next", next)
  );
}

function renderNavigation(text, address) {
  return address ? pageNavigation(text, address) : navigationPlaceHolder(text);
}

function pageNavigation(text, address) {
  const $rotation = document.createElement("button");
  $rotation.textContent = text;
  onClickGET($rotation, address);
  return $rotation;
}

function navigationPlaceHolder(text) {
  const $placeHolder = document.createElement("p");
  $placeHolder.innerText = text;
  $placeHolder.className = "nav-placeholder";
  return $placeHolder;
}

function navigationDescription(pages, count, nextAddress) {
  const $description = document.createElement("p");
  const currentPage = nextAddress ? calculatePage(nextAddress) : pages;
  const currentCount = ((currentPage-1)*20)+1;
  $description.innerText = `Page ${currentPage} of ${pages}. `
    +`Displaying ${currentCount}-${currentCount+19} of ${count}.`;
  return $description;
}

function calculatePage(pageAddress) {
  const nextPage = parseInt(pageAddress.split("page=")[1]);
  return nextPage-1;
}

function onClickGET($trigger, address) {
  $trigger.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(address)
      .then(response => response.json())
      .then(results => populatePage(results));
  })
}
