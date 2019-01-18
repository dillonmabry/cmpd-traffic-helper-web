import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Section from '../components/Section';
import DateTimePicker from 'react-datetime-picker';
import Container from '../components/Container';

export default class Prediction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            road: '',
            datetime: new Date(),
            prediction: ''
        }
        this.setField = this.setField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.road && this.state.datetime) {
            let data = {
                road_name: this.state.road,
                date_time: this.state.datetime
            };
            // fetch(`/api/accidents/predict`, {
            //     method: 'post',
            //     body: JSON.stringify(data),
            // }).then(res => this.setState({ prediction: res }));
        }
    }
    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }
    dateChange = datetime => this.setState({ datetime })
    render() {
        const { 
            road,
            datetime
        } = this.state;
        return (
        <Container main={
            <div className="container-fluid mt-2">
                <Section title={"Accident Analysis"} body={
                    <div>
                        <Form className="mb-2" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type="select" name="road" id="road" value={road}
                                    onChange={this.setField.bind(null, 'road')} placeholder="Select Road">
                                    <option>N TRYON ST</option>
                                    <option>WT HARRIS</option>
                                    <option>I-77</option>
                                    <option>I-85</option>
                                    <option>I-485</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <DateTimePicker
                                    onChange={this.dateChange} 
                                    value={this.state.datetime}
                                />  
                            </FormGroup>
                            <Button>Predict</Button>
                        </Form>
                        { this.state.prediction ? <small>{this.state.prediction}</small> : null }
                    </div>
                } />
            </div>}
        />
        );
    }
}