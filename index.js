const characterAPI = "https://rickandmortyapi.com/api/character";
const $characterList = document.querySelector("#characters-container");
const $changeCharacters = document.querySelectorAll(".other-characters");

fetch(characterAPI)
  .then(response => response.json())
  .then(results => populatePage(results));

function populatePage(allResults) {
  let { info, results } = allResults;
  assignCharacters(results);
  assignInfo(info);
}

function assignCharacters(characters) {
  $characterList.innerHTML = "";
  characters.forEach(character => characterInfo(character));
}

function characterInfo(character) {
  const { name, species, location, image, gender, status } = character;

  const $container = createElementEditProperties("li", {
    className: `character-container ${status.toLowerCase()}`
  });
  const $name = createElementEditProperties("li", {textContent: name});
  const $image = createElementEditProperties("img", {
    src: image,
    width: 150,
    alt: `Portrait of ${name}, a ${species} on Rick and Morty`
  });
  const $basicInfo = createElementEditProperties("ul", {
    className: "basic-info"
  });
  const $location = createElementEditProperties("li", {
    textContent: location.name
  });
  const $species = createElementEditProperties("li", {
    textContent: species
  });
  const $gender = createElementEditProperties("li", {
    textContent: gender
  });

  $basicInfo.append($location, $species, $gender);
  $container.append($image, $name, $basicInfo);
  $characterList.append($container);
}

function createElementEditProperties(type, properties) {
  const $element = document.createElement(type);
  for (const [key, value] of Object.entries(properties)) {
    $element[key] = value;
  };
  return $element;
}

function assignInfo(info) {
  const { count, pages, next, prev } = info;
  $changeCharacters.forEach($changeCharacter => {
    $changeCharacter.innerHTML = "";
    $changeCharacter.append(
      renderNavigation("Previous", prev),
      navigationDescription(pages, count, next),
      renderNavigation("Next", next)
    );
  });
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
  const startCount = ((currentPage-1)*20)+1;
  const endCount = startCount+19<count ? startCount+19 : count;
  $description.innerText = `Page ${currentPage} of ${pages}. `
    +`Displaying ${startCount}-${endCount} of ${count}.`;
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
