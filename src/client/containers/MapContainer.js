import React from 'react';
import Section from '../components/Section';
import Container from '../components/Container';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Link } from 'react-router-dom';

// Import custom Plotly component to reduce bundle size
const Plotly = require('../custom-modules/Plotly-ScatterMap');
const Plot = createPlotlyComponent(Plotly);

// Charlotte-Mecklenburg
const MAX_LAT = 35.2;
const MAX_LONG = -80.85;

// N records
const MAX_RECORDS = 1000;

const MapComponent = ({ data, layout, mapboxtoken, n_records }) => (
    <Container main={
        <div className="container-fluid mt-2">
            <div>
                {mapboxtoken ?
                    data.length > 0 ?
                        <Section title={"Charlotte Mecklenburg Accidents"}
                            body={
                                <div>
                                <small>Returning {n_records} recent accidents</small>
                                <Plot data={data} layout={layout} useResizeHandler={true}
                                    style={{ width: "100%", height: "100%" }}
                                    config={{ mapboxAccessToken: mapboxtoken }} />
                                </div>
                            } /> :
                        <Section title={"Charlotte Mecklenburg Accidents"}
                            body={<small>Loading...</small>} />
                    : <small>Missing mapbox token, not authenticated. Please <Link to={"/register"}>Register</Link> or <Link to={"/login"}>Login</Link></small>
                }
            </div>
        </div>}
    />
)

export default class MapBoxAccidentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            layout: {},
            mapboxtoken: null,
            maxRecords: MAX_RECORDS
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('JWT');
        if (token) {
            fetch('/api/accidents/mapbox-token', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res.json())
                .then((res) => {
                    this.setState({ mapboxtoken: res.mapboxtoken });
                }).then(
                    fetch('/api/accidents/top', { limit: MAX_RECORDS })
                        .then(res => res.json())
                        .then((res) => {
                            // Manipulate for mapbox/plotlyJS
                            var rows = res.accidents;
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
                                showlegend: true,
                                autosize: true
                            };
                            this.setState({ data: data, layout: layout });
                        })
                );
        }
    }
    render() {
        return (
            <div>
                <MapComponent
                    data={this.state.data}
                    layout={this.state.layout}
                    mapboxtoken={this.state.mapboxtoken}
                    n_records={this.state.maxRecords} />
            </div>
        )
    }
}