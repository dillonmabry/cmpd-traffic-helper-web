import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Container from '../components/Container';
import Section from '../components/Section';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.setField = this.setField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username && this.state.password) {
            let reqBody = {
                username: this.state.username,
                password: this.state.password
            };
            fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody)
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.token) {
                        localStorage.setItem('JWT', res.token);
                        this.props.history.push({ pathname: '/accidents-view' })
                    }
                });

        }
    }
    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }
    render() {
        const { username, password } = this.state;
        return (
            <Container main={
                <div className="container-fluid mt-2">
                    <Section title={"Login"} body={
                        <div>
                            <Form className="mb-2" onSubmit={this.handleSubmit}>
                                <FormGroup className="mb-2">
                                    <Input type="text" name="username" id="username"
                                        placeholder="Enter username..."
                                        value={username}
                                        onChange={this.setField.bind(null, 'username')} />
                                </FormGroup>
                                <FormGroup className="mb-2">
                                    <Input type="password" name="password" id="password"
                                        placeholder="Enter password..."
                                        value={password}
                                        onChange={this.setField.bind(null, 'password')} />
                                </FormGroup>
                                <Button>Login</Button>
                            </Form>
                        </div>
                    } />
                </div>
            } />
        );
    }
}