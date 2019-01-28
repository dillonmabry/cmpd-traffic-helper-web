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
            accidents: [],
            loading: false
        }
        this.setField = this.setField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.term) {
            this.setState({ loading: true });
            fetch(`/api/accidents/search?term=${this.state.term}`)
                .then(res => res.json())
                .then(res => this.setState({ accidents: res.accidents, loading: false }));
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
        const { term, loading } = this.state;
        return (
            <div>
                <Form className="mb-2" onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-2">
                        <FontAwesomeIcon icon="search" />
                        <Input type="text" name="term" id="term"
                            placeholder="Search accidents..."
                            value={term} 
                            onChange={this.setField.bind(null, 'term')} />
                    </FormGroup>
                    <Button>Search</Button>
                </Form>
            { loading ? <small>Loading...</small> : <Accidents accidentsList={AccidentsList} />}
            </div>
        );
    }
}