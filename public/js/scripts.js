$(window).on('load', () => generatePalette());
$('#generate-colors-btn').on('click', () => generatePalette());

const generatePalette = () => {
  const palette = colorPalette();
}

const generateRandomHex = () => {
  const hex = '#'+Math.random().toString(16).slice(-6)
  return hex
}

const colorPalette = () => {
  const palette = [];

  for(let i = 0; i < 5; i++) {
    let swatch = generateRandomHex()

    palette.push({
      swatch: swatch
    })
  }

  putIntoStorage(palette);
  // let paletteIds = ['swatch-1', 'swatch-2', 'swatch-3', 'swatch-4', 'swatch-5' ]
}

const putIntoStorage = (palette) => {
  localStorage.setItem("palette", JSON.stringify(palette))
}

const pullFromStorage = () => {
  return JSON.parse(localStorage.getItem("palette"))
}


// const renderPalette
// call generate palette
// append the colors to the HTML elements
// 
