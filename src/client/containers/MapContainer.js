import React from 'react';
import Section from '../components/Section';
import Plot from 'react-plotly.js';

// Assumes dependencies on Plotly/Mapbox script src
const MAX_LAT = 35.2;
const MAX_LONG = -80.85;

const MapContainer = ({ data, layout }) => (
    <div>
        { data.length > 0 ?
            <Section title={"Charlotte Mecklenburg Accidents"}
                body={
                    <Plot data={data} layout={layout}
                        config={{ mapboxAccessToken: process.env.REACT_APP_MAPBOX_TOKEN }} />
                } /> :
            <Section title={"Charlotte Mecklenburg Accidents"}
                body={<small>Loading...</small>} />
        }
    </div>
)

export default class Accident extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            layout: {}
        }
    }
    componentDidMount() {
        fetch('/api/accidents/all')
            .then(res => res.json())
            .then((res) => {
                var rows = res;
                var classArray = unpack(rows, 'event_type');
                var classes = [...new Set(classArray)];
                function unpack(rows, key) {
                    return rows.map(function (row) { return row[key]; });
                }
                const data = classes.map(function (classes) {
                    var rowsFiltered = rows.filter(function (row) {
                        return (row.event_type === classes);
                    });
                    return {
                        type: 'scattermapbox',
                        name: classes,
                        lat: unpack(rowsFiltered, 'latitude'),
                        lon: unpack(rowsFiltered, 'longitude')
                    };
                });
                var layout = {
                    autosize: true,
                    font: {
                        color: '#212529',
                        family: 'Arial',
                    },
                    mapbox: {
                        center: {
                            lat: MAX_LAT,
                            lon: MAX_LONG
                        },
                        domain: {
                            x: [0, 1],
                            y: [0, 1]
                        },
                        style: 'light',
                        zoom: 10
                    },
                    margin: {
                        r: 20,
                        t: 50,
                        b: 20,
                        l: 20,
                        pad: 0
                    },
                    paper_bgcolor: '#fff',
                    plot_bgcolor: '#fff',
                    showlegend: true
                };
                this.setState({ data: data, layout: layout })
            });
    }
    render() {
        return (
            <div>
                <MapContainer data={this.state.data} layout={this.state.layout} />
            </div>
        )
    }
}