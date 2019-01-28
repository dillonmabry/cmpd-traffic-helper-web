import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Container from '../components/Container';
import Section from '../components/Section';

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: ''
        }
        this.setField = this.setField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username && this.state.email && this.state.password && this.state.password2) {
            if (this.state.password !== this.state.password2) {
                console.log("Passwords do not match")
            } else {
                let reqBody = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                };
                fetch("/api/users/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody)
                })
                    .then(res => res.json())
                    .then((res) => {
                        this.props.history.push({ pathname: '/' })
                    });
            }
        }
    }
    setField(field, e) {
        this.setState({
          [field]: e.target.value
        })
      }
    render() {
        const { username, email, password, password2 } = this.state;
        return (
            <Container main={
                <div className="container-fluid mt-2">
                    <Section title={"Register"} body={
                        <div>
                            <Form className="mb-2" onSubmit={this.handleSubmit}>
                                <FormGroup className="mb-2">
                                    <Input type="text" name="username" id="username"
                                            placeholder="Enter username..."
                                            value={username}
                                            onChange={this.setField.bind(null, 'username')} />
                                </FormGroup>
                                <FormGroup className="mb-2">
                                    <Input type="text" name="email" id="email"
                                        placeholder="Enter email..."
                                        value={email}
                                        onChange={this.setField.bind(null, 'email')} />
                                </FormGroup>
                                <FormGroup className="mb-2">
                                    <Input type="password" name="password" id="password"
                                        placeholder="Enter password..."
                                        value={password}
                                        onChange={this.setField.bind(null, 'password')} />
                                </FormGroup>
                                <FormGroup className="mb-2">
                                    <Input type="password" name="password2" id="password2"
                                        placeholder="Confirm password.."
                                        value={password2}
                                        onChange={this.setField.bind(null, 'password2')} />
                                </FormGroup>
                                <Button>Register</Button>
                            </Form>
                        </div>
                    } />
                </div>
            } />
        );
    }
}