const $ = require("jquery");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'))

app.set('port', process.env.PORT || 3000);
app.locals.title = "Palette Picker";
app.use(bodyParser.json());

app.get('/', (request, response) => {

});

app.get('/api/v1/projects', (request, response) => {
  
  database('projects').select()
    .then(project => {
      response.status(200).json(project)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.post('/api/v1/projects', (request, response) => {
  const projects = request.body;
  for(let requiredParameter of ['name']) {
    if(!projects[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}"`})
    }
  }

  database('projects').insert(projects, 'id')
    .then(projects => {
      console.log('id', projects[0])
      response.status(201).json({ id: projects[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/palettes', (request, response) => {
  
  database('palettes').select()
    .then(project => {
      response.status(200).json(project)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;
  for(let requiredParameter of ['name', 'project_id', 'colors']) {
    if(!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}"`})
    }
  }
  database('palettes').insert(palette, 'id')
    .then(palette => {
      console.log('post palettes being called')
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params
  
  database('palettes').where("id", id).del()
    .then( deleted => {
      if (!deleted) {
        return response.status(404).json({error: 'no palette to delete'})
      }
      response.status(204).json(deleted)
    })
    .catch( error => { 
      response.status(500).json({ error })
    });
});

app.delete('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  
  database('projects').where("id", id).del()
    .then( deleted => {
      if (!deleted) {
        return response.status(404).json({error: 'no project to delete'})
      }
      response.status(204).json(deleted)
    })
    .catch( error => { 
      response.status(500).json({ error })
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
});

module.exports = app;