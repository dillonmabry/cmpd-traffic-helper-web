const Plotly = require('plotly.js/lib/core');

Plotly.register([
    require('plotly.js/lib/scattermapbox'),
]);

module.exports = Plotly;