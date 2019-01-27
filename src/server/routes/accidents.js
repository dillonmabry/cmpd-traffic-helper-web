const express = require('express');
const router = express.Router();
const Accident = require('../models/Accident');
const { ensureAuthenticated } = require('../config/auth');
const SEARCH_LIMIT = 100;

// Return all
router.get('/all', (req, res) => {
  Accident.find()
  .then(accidents =>
    res.json(accidents)
  )
  .catch(err => console.log(err));
});

// Pagination
router.get('/', (req, res) => {
  let { page } = req.query;
  page = page ? page : 1;
  page = Math.max(1, page);
  Accident.find()
  .limit(SEARCH_LIMIT)
  .skip(SEARCH_LIMIT * page)
  .sort('-date')
  .then(accidents => Accident.countDocuments()
    .then((count) => {
      res.json({
        accidents: accidents,
        page: page,
        pages: Math.floor(count / SEARCH_LIMIT)
      })
  }))
  .catch(err => console.log(err));
});

// Search
router.get('/search', (req, res) => {
  let { term } = req.query;
  term = term.toUpperCase();
  Accident.find({"address": { $regex: '.*' + term + '.*' }})
  .sort('-datetime_add')
  .then((accidents) => {
    res.json({
      accidents,
      search: term
    })
  })
  .catch(err => console.log(err));
});

// Mapbox API
router.get('/mapbox-token', ensureAuthenticated, (req, res, next) => {
  let token = process.env.MAPBOX_TOKEN;
  res.json({ mapboxtoken: token });
});

module.exports = router;