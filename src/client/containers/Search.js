import React from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import Accident from './Accident';
import Accidents from '../components/AccidentsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            accidents: []
        }
        this.setField = this.setField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.term) {
            fetch(`/api/accidents/search?term=${this.state.term}`)
                .then(res => res.json())
                .then(res => this.setState({ accidents: res.accidents }));
        }
    }
    setField(field, e) {
        this.setState({
          [field]: e.target.value
        })
      }
    render() {
        const AccidentsList = this.state.accidents.map((accident, i) => {
            return (
                <Accident key={i} accident={accident} />
            )
        })
        const { term } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-2">
                        <FontAwesomeIcon icon="search" />
                        <Input type="text" name="term" id="term"
                            placeholder="Search accidents..."
                            value={term} 
                            onChange={this.setField.bind(null, 'term')} />
                    </FormGroup>
                    <Button>Search</Button>
                </Form>
            { <Accidents accidentsList={AccidentsList} /> }
            </div>
        );
    }
}