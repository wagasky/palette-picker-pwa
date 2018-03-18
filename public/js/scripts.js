$(window).on('load', () => generatePalette());
$('#generate-colors-btn').on('click', () => generatePalette());
$('#generate-colors-btn').on('click', () => generatePalette());

const generatePalette = () => {
  localStorage.palette ? updatePalette() : newPalette();
}

const newPalette = () => {
  const newPalette = createPalette();

  clearPalette();
  newPalette.map(color => renderSwatch(color))
}

const updatePalette = () => {
  const currentPalette = pullFromStorage();

  clearPalette();
  currentPalette.map(color => {
    if (color.locked) {
      renderSwatch(color)
    } 

    if(!color.locked) {
      const newColor = generateRandomHex();
      color.swatch = newColor
      renderSwatch(newColor);
    }
  })
  putIntoStorage(currentPalette);
  reRenderPalette();
}

const generateRandomHex = () => {
  const hex = '#'+Math.random().toString(16).slice(-6)
  return hex
}

const reRenderPalette = () => {
  clearPalette();
  const currentPalette = pullFromStorage();
  currentPalette.map(color => renderSwatch(color))
}

const createPalette = () => {
  const palette = [];

  for(let i = 0; i < 5; i++) {
    let swatch = generateRandomHex();
    let locked = false;
    palette.push({ swatch, locked })
  }
  putIntoStorage(palette);
} 

const renderSwatch = (swatch) => {
  const swatchSection = document.querySelector(".color-swatch--container");
  const swatchArticle = document.createElement("article");
  const lockClass = swatch.locked ? "fas fa-lock" : "fas fa-lock-open";
  swatchArticle.setAttribute("class", "color-swatch");
  swatchArticle.setAttribute("style", `background-color: ${swatch.swatch}`);

  swatchArticle.innerHTML = `
    <p>${swatch.swatch}</p>
    <button 
      type="button"
      onClick="toggleSwatchLock(event)"
      class="${lockClass}"
      value="${swatch.swatch}"
    ></button>
  `
  swatchSection.appendChild(swatchArticle);
}

const clearPalette = () => {
  const swatchSection = document.querySelector(".color-swatch--container");

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

const toggleSwatchLock = (event) => {
  const { value } = event.target
  const palette = pullFromStorage();

  palette.map(swatch => {
    if (swatch.swatch === value) {
      swatch.locked = !swatch.locked
    }
  })
  putIntoStorage(palette);
  reRenderPalette();
}

const createProject = () => {
  // if name doesn't exist
  // take a project name (projectId) and put it in object in db
  // if it does, give error
  // rerender projectList
}

const renderProjects = () => {
  // grab projects from the db
  // display projects on page
  // do this on page load 
  // method also used within other methods
}

const renderProjectList = () => {
  // grab project list from the db
  // object.keys
  // render as option tags for the list
}

const addPalette = () => {
  // check if palette name exists
  // object.keys
  // if not, add palette to db
  // if so, give error
  // render projects
}

const removePalette = () => {
  // locate relevant project
  // object.keys and then filter
  // check for palette name within project id
  // remove from palette array from db
  // render projects
}

// Projects table: 

// [ {
//   'id': 1,
//   'title': 'Project 1',
//   'date': ''
// }

// {
//   'id': 2,
//   'title': 'Project 2',
//   'date': ''
// }

// {
//   'id': 3,
//   'title': 'Project 3',
//   'date': ''
// }

// ]

// palettes table:

// [{
//   'projectId': "1",
//   'paletteName': "palette A",
//   'palette': '[hex, hex, hex, hex, hex]'
//  },

// {
//   'projectId': "2",
//   'paletteName': "palette B",
//   'palette': '[hex, hex, hex, hex, hex]'
//  },

//  {
//   'projectId': "2",
//   'paletteName': "palette c",
//   'palette': '[hex, hex, hex, hex, hex]'
//  },
// ]

