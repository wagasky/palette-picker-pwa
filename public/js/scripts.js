$(window).on('load', () => generatePalette());
$('#generate-colors-btn').on('click', () => generatePalette());

const generatePalette = () => {
  renderPalette();
}

const generateRandomHex = () => {
  const hex = '#'+Math.random().toString(16).slice(-6)
  return hex
}

const renderPalette = () => {
  clearPalette();
  const newPalette = createPalette();

  newPalette.map(color => renderSwatch(color))
  return newPalette;
}

const createPalette = () => {
  const palette = [];

  for(let i = 0; i < 5; i++) {
    let swatch = generateRandomHex();
    let locked = false;

    palette.push({ swatch, locked })
  }

  putIntoStorage(palette);
  return palette;
  // let paletteIds = ['swatch-1', 'swatch-2', 'swatch-3', 'swatch-4', 'swatch-5' ]
} 

const renderSwatch = (swatch) => {
  const swatchSection = document.querySelector(".color-swatch--container")
  const swatchArticle = document.createElement("article");
  const lockClass = swatch.locked ? "fas fa-lock" : "fas fa-lock-open";
  swatchArticle.setAttribute("class", "color-swatch");
  swatchArticle.setAttribute("style", `background-color: ${swatch.swatch}`);

  swatchArticle.innerHTML = `
    <p>${swatch.swatch}</p>
    <button type="button" class="${lockClass}"></button>
  `
  swatchSection.appendChild(swatchArticle);
}

const clearPalette = () => {
  const swatchSection = document.querySelector(".color-swatch--container")
  while(swatchSection.hasChildNodes()) {
    swatchSection.removeChild(swatchSection.lastChild);
  }
}

const putIntoStorage = (palette) => {
  localStorage.setItem("palette", JSON.stringify(palette));
}

const pullFromStorage = () => {
  return JSON.parse(localStorage.getItem("palette"))
}

