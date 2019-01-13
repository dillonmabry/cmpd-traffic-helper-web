// const Sequelize = require('sequelize');
// const db = require('../config/database');

// const Accident = db.define('accident', {
//   event_no: {
//     type: Sequelize.STRING,
//     primaryKey: true
//   },
//   datetime_add: {
//     type: Sequelize.DATE
//   },
//   division: {
//     type: Sequelize.STRING
//   },
//   address: {
//     type: Sequelize.STRING
//   },
//   event_type: {
//     type: Sequelize.STRING
//   },
//   event_desc: {
//     type: Sequelize.STRING
//   },
//   x_coord: {
//     type: Sequelize.FLOAT
//   },
//   y_coord: {
//     type: Sequelize.FLOAT
//   },
//   latitude: {
//     type: Sequelize.FLOAT
//   },
//   longitude: {
//     type: Sequelize.FLOAT
//   },
//   weatherInfo: {
//     type: Sequelize.JSON
//   }
// },
// {
//   timestamps: false // Disable default Sequelize fields
// })

const mongoose = require('mongoose');

const AccidentSchema = new mongoose.Schema({
  event_no: {
    type: String,
    required: true
  },
  datetime_add: {
    type: Date
  },
  division: {
    type: String
  },
  address: {
    type: String
  },
  event_type: {
    type: String
  },
  event_desc: {
    type: String
  },
  x_coord: {
    type: Number
  },
  y_coord: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  weatherInfo: {
    type: JSON
  }
});

const Accident = mongoose.model('Accident', AccidentSchema);

module.exports = Accident;