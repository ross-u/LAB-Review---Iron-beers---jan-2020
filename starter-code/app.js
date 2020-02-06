const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersArr => {
      const data = {
        beers: beersArr
      };

      res.render('beers', data);
    })
    .catch(err => {});
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(oneBeerArr => {
      const randomBeer = oneBeerArr[0];
      // { name, description, image_url, tagline }

      const data = {
        category: 'IPA',
        country: 'Spain',
        randomBeer: randomBeer
      };

      res.render('random-beer', data);
    })
    .catch(err => {});
});

app.get('/beers/:beerId', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.params.beerId', req.params.beerId);

  const beerId = req.params.beerId;
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
