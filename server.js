const $ = require("jquery");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'))

app.set('port', process.env.PORT || 3000);
app.locals.title = "Palette Picker";
app.use(bodyParser.json());

app.get('/', (request, response) => {

});

app.get('/api/v1/projects', (request, response) => {
  
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})

module.exports = app;