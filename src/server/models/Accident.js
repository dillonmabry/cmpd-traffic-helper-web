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