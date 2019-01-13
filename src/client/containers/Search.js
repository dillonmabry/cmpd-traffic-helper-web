import React from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import Accident from '../components/Accident';
import Accidents from '../components/Accidents';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            accidents: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
            accidents: []
        });
    }
    submitForm(e) {
        e.preventDefault();
        fetch(`/api/accidents/search?term=${this.state.term}`)
            .then(res => res.json())
            .then(res => this.setState({ accidents: res.accidents }));
    }
    render() {
        const AccidentsList = this.state.accidents.map((accident, i) => {
            return (
                <Accident key={i} accident={accident} />
            )
        })
        return (
            <div>
            <Form onSubmit={ (e) => this.submitForm(e) }>
                <FormGroup className="mb-2">
                <Input type="text" name="term" id="term"
                        placeholder="Search accidents..." 
                        value={this.state.term}
                        onChange={ (e) => this.handleChange(e) }/>
                </FormGroup>
                <Button>Search</Button>
            </Form>
            { <Accidents accidentsList={AccidentsList} /> }
            </div>
        );
    }
}