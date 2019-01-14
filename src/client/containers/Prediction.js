import React from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Prediction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            prediction: ''
        }
        this.setField = this.setField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.term) {
            // fetch(`/api/accidents/predict`, {
            //     method: 'post',
            //     body: data,
            // }).then(res => this.setState({ prediction: res }));
        }
    }
    setField(field, e) {
        this.setState({
          [field]: e.target.value
        })
      }
    render() {

        const { term } = this.state;
        return (
            <div>
                <Form className="mb-2" onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-2">
                        <FontAwesomeIcon icon="question-circle" />
                        {/* TODO: Insert input form for prediction analysis and make generic form */}
                        {/* <Input type="text" name="term" id="term"
                            placeholder="Search accidents..."
                            value={term} 
                            onChange={this.setField.bind(null, 'term')} /> */}
                    </FormGroup>
                    <Button>Predict</Button>
                </Form>
            { this.state.prediction ? <small></small> : null }
            </div>
        );
    }
}