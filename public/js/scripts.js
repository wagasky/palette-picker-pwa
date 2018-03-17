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
    let swatch = generateRandomHex()

    palette.push({ swatch })
  }

  putIntoStorage(palette);
  return palette;
  // let paletteIds = ['swatch-1', 'swatch-2', 'swatch-3', 'swatch-4', 'swatch-5' ]
} 

const renderSwatch = (color) => {
  const swatchSection = document.querySelector(".color-swatch--container")
  const swatchArticle = document.createElement("article");
  swatchArticle.setAttribute("class", "color-swatch");
  swatchArticle.setAttribute("style", `background-color: ${color.swatch}`);

  swatchArticle.innerHTML = `<p>${color.swatch}</p>`

  swatchSection.appendChild(swatchArticle);
}

const clearPalette = () => {
  const swatchSection = document.querySelector(".color-swatch--container")
  while(swatchSection.hasChildNodes()) {
    swatchSection.removeChild(swatchSection.lastChild)
  }
}

const putIntoStorage = (palette) => {
  localStorage.setItem("palette", JSON.stringify(palette))
}

const pullFromStorage = () => {
  return JSON.parse(localStorage.getItem("palette"))
}

