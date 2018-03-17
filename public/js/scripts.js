$(window).on('load', () => generatePalette());

const generatePalette = () => {
  console.log('generate palette was called')
  const hex = genRandomHex();
  console.log(hex)
}

const genRandomHex = () => {
  const hex = '#'+Math.random().toString(16).slice(-6)
  return hex
}

