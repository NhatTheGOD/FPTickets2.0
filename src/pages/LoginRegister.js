import React, { useState } from 'react';
import { Col, Form, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
        reEnterPassword: '',
        phoneNumber: '',
        dateOfBirth: '',
        role: 'user',
        active: true,
        totalAmount: 0
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevLoginData => ({
            ...prevLoginData,
            [name]: value
        }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevRegisterData => ({
            ...prevRegisterData,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        const { email, password } = loginData;
    
        try {
            const response = await axios.get('http://localhost:9999/users');
            const users = response.data;
    
            const loggedInUser = users.find(u => u.email === email && u.password === password);
            console.log(loggedInUser);
            
            if (loggedInUser) {
                localStorage.setItem('role', loggedInUser.role);
                localStorage.setItem('userLogged', JSON.stringify(loggedInUser));
                window.alert('Login Successful');
                window.location.href = '/';
            } else {
                window.alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            window.alert('An error occurred during login. Please try again.');
        }
    };

    const handleRegister = async () => {
        if (registerData.password !== registerData.reEnterPassword) {
            window.alert('Passwords do not match');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:9999/users', registerData);
            console.log('User registered successfully:', response.data);
            window.alert('Register Success, Welcome to FPTicket');
            setRegisterData({
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                password: '',
                reEnterPassword: '',
                phoneNumber: '',
                dateOfBirth: '',
                role: 'user',
                active: true,
                totalAmount: 0
            });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Container style={{ paddingTop: '50px', paddingBottom: '50px' }} fluid className="bg-dark text-white">
            <Container>
                <Row>
                    <Col md={4}>
                        <h3 className="p-2">LOGIN</h3>
                        <Form>
                            <Form.Group className="p-2">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control 
                                    className="transparent-input" 
                                    type="text" 
                                    placeholder="Enter your Email" 
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                />
                            </Form.Group>
                            <Form.Group className="p-2">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control 
                                    className="transparent-input" 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                />
                            </Form.Group>
                            <Link style={{ color: '#beea4c' }} className="text-success" to='/forgot'>Forgot your password?</Link>
                            <Button className='mt-2 d-block' onClick={handleLogin} variant="success">LOGIN</Button>
                        </Form>
                    </Col>
                    <Col md={8}>
                        <h3 className="p-2">SIGNUP</h3>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="text"
                                            placeholder="Enter your first name"
                                            name="firstName"
                                            value={registerData.firstName}
                                            onChange={handleRegisterChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="text"
                                            placeholder="Enter your last name"
                                            name="lastName"
                                            value={registerData.lastName}
                                            onChange={handleRegisterChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form className="p-2">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value="male"
                                            checked={registerData.gender === 'male'}
                                            onChange={handleRegisterChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="female"
                                            checked={registerData.gender === 'female'}
                                            onChange={handleRegisterChange}
                                        />
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="text"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={registerData.email}
                                            onChange={handleRegisterChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Password *</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={registerData.password}
                                            onChange={handleRegisterChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Re-enter Password *</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="password"
                                            placeholder="Re-enter your password"
                                            name="reEnterPassword"
                                            value={registerData.reEnterPassword}
                                            onChange={handleRegisterChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Form.Group>
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control
                                        className="transparent-input"
                                        type="text"
                                        placeholder="Enter your phone number"
                                        name="phoneNumber"
                                        value={registerData.phoneNumber}
                                        onChange={handleRegisterChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="p-2">
                                <Form.Group>
                                    <Form.Label>Date Of Birth</Form.Label>
                                    <Form.Control
                                        className="transparent-input"
                                        type="date"
                                        name="dateOfBirth"
                                        value={registerData.dateOfBirth}
                                        onChange={handleRegisterChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Button onClick={handleRegister} variant="success">REGISTER</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Login;
