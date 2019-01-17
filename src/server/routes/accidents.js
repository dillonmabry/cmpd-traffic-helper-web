const express = require('express');
const router = express.Router();
const Accident = require('../models/Accident');

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

// router.get('/', (req, res) => 
// Accident.findAll()
//     .then(accidents => res.render('accidents', {
//         accidents
//       }))
//     .catch(err => console.log(err)));

// router.get('/search', (req, res) => {
//   let { term } = req.query;
//   term = term.toUpperCase();
//   Accident.findAll({ where: { address: { [Op.like]: '%' + term + '%' } } })
//     .then(accidents => res.render('accidents', { accidents }))
//     .catch(err => console.log(err));
// });

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

module.exports = router;