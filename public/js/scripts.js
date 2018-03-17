$(window).on('load', () => generatePalette());
$('#generate-colors-btn').on('click', () => generatePalette());

const generatePalette = () => {
  console.log('generate palette was called')
  const palette = colorPalette();
  console.log(palette)
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

  console.log(palette);
  // let paletteIds = ['swatch-1', 'swatch-2', 'swatch-3', 'swatch-4', 'swatch-5' ]
}

