import React from 'react';
import Section from '../components/Section';
import Container from '../components/Container';
import createPlotlyComponent from 'react-plotly.js/factory';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';

// Import custom Plotly component to reduce bundle size
const Plotly = require('../custom-modules/Plotly-ScatterMap');
const Plot = createPlotlyComponent(Plotly);

// Charlotte-Mecklenburg
const MAX_LAT = 35.2;
const MAX_LONG = -80.85;

// N records initial
const MAX_RECORDS = 1000;

export default class MapBoxAccidentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            layout: {},
            mapboxtoken: null,
            maxRecords: MAX_RECORDS
        }
        this.setField = this.setField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getAccidents() {
        let token = localStorage.getItem('JWT');
        if (token) {
            fetch('/api/accidents/mapbox-token', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res.json())
                .then((res) => {
                    this.setState({ mapboxtoken: res.mapboxtoken });
                }).then(
                    fetch(`/api/accidents/top?limit=${this.state.maxRecords}`)
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
    componentDidMount() {
        this.getAccidents();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.getAccidents();
    }
    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }
    render() {
        return (
            <Container main={
                <div className="container-fluid mt-2">
                    {this.state.mapboxtoken ?
                        this.state.data.length > 0 ?
                            <Section title={"Charlotte Mecklenburg Accidents"}
                                body={
                                    <div>
                                        <div>
                                            <Form className="mb-2" onSubmit={this.handleSubmit}>
                                                <FormGroup className="mb-2">
                                                    <Input name="maxRecords" placeholder="Number of Accidents..." min={0} max={100000}
                                                        type="number"
                                                        // step="1000"
                                                        onChange={this.setField.bind(null, 'maxRecords')}
                                                        value={this.state.maxRecords} />
                                                </FormGroup>
                                                <Button>Find</Button>
                                            </Form>
                                        </div>
                                        <Plot data={this.state.data} layout={this.state.layout} useResizeHandler={true}
                                            style={{ width: "100%", height: "100%" }}
                                            config={{ mapboxAccessToken: this.state.mapboxtoken }} />
                                    </div>
                                } /> :
                            <Section title={"Charlotte Mecklenburg Accidents"}
                                body={<small>Loading...</small>} />
                        : <small>Missing mapbox token, not authenticated. Please <Link to={"/register"}>Register</Link> or <Link to={"/login"}>Login</Link></small>
                    }
                </div>}
            />
        )
    }
}