$(window).on('load', () => generatePalette());
$(window).on('load', () => renderProjectList());
$(window).on('load', () => renderProjects());
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

const createProject = (event) => {
  event.preventDefault();
  const name = $('.saveProjectForm input').val();

  postData('/api/v1/projects', { name });
  renderProjects();
  renderProjectList();
}

const renderProjects = async () => {
  const projects = await getData('/api/v1/projects');
  const palettes = await getData('/api/v1/palettes');
  const projectsToDisplay = createProjectDisplay(projects, palettes);

  $('.projects-display').empty();
  $('.projects-display').prepend(`${projectsToDisplay}`)
}

const createProjectDisplay = (projects, palettes) => {
  return projects.map( project => {
    const relevantPalettes = palettes.filter( palette => palette.project_id === project.id);
    const projectPalettes = relevantPalettes ?
      createPaletteDisplay(relevantPalettes).join('') : 
      '<article>This project is empty</article>';

      return (`
        <article class="project">
          <div class="project-title-styling">
            <h2 class="project-name">${project.name}</h2>
              <button class="fas fa-trash-alt delete"
                name=${project.id}
                onclick=removeProject(event)
              ></button>
          </div>
          <div class="project-palette">
            ${projectPalettes}
          </div>
        </article>
      `)
  }).join('')
}

const createPaletteDisplay = (palettes) => {

  return palettes.map( palette => {
    return (`
      <div class="palette-container">
        <h2>${palette.name}</h2>
        ${createColorDisplay(palette).join('')}
        <button class="fas fa-trash-alt delete"
                name=${palette.id}
                onclick=removePalette(event)
        ></button>
      </div>
    `)

  })
}

const createColorDisplay = (palette) => {
  return palette.colors.map(color => {
      return (`
        <div 
          class="small-color-swatch"
          style="background-color:${color};">
        </div>
      `)
    })
}

const renderProjectList = async () => {
  const projects = await getData('/api/v1/projects');

  projects.map(project => {
    addOption(project)
  })
}

const addOption = async (project) => {
  const projectDropDown = document.querySelector("#projectDropDown");
  const projectOption = document.createElement("option");

  projectOption.setAttribute("value", project.id);
  projectOption.innerHTML = `
    ${project.name}
  `
  projectDropDown.appendChild(projectOption);
}

const addPalette = async (event) => {
  event.preventDefault();
  const selectedProjectId = document.querySelector("#projectDropDown").value
  const paletteName = document.querySelector('#paletteName').value;
  const currentPalette = pullFromStorage()
  const colors = currentPalette.map(swatch => swatch.swatch)
  const newPalette = {
    name: paletteName,
    project_id: selectedProjectId,
    colors
  }

  await postData('/api/v1/palettes', newPalette)
  renderProjects();
}

const removePalette = async (event) => {
  const paletteId = event.target.name;
  await fetch(`/api/v1/palettes/${paletteId}`, {
    method: 'DELETE'
  })
  renderProjects();
}

const removeProject = async (event) => {
  const projectId = event.target.name;
  await fetch(`/api/v1/projects/${projectId}`, {
    method: 'DELETE'
  })
  renderProjects();
  renderProjectList();
}

const postData = (url, body) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body), 
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

const getData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js')
      .then(registration => {
        console.log('Service worker registration successful');

      })
      .catch(error => {
        console.log('Service worker failed', error);

      })
  })
} 

