const $ = require("jquery");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'))
// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.set('port', process.env.PORT || 3000);
app.locals.title = "Palette Picker";
app.use(bodyParser.json());

app.get('/', (request, response) => {

});

// app.get('/', (request, response) => {
//   database('projects')
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})