import React, { useState } from 'react';
import { Col, Form, Container, Row, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

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

    const [accountBanned, setAccountBanned] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [requestData, setRequestData] = useState({
        email: '',
        requestType: 2,
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ type: '', message: '' });

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

    const validateRegisterData = () => {
        const newErrors = {};
        if (!registerData.email) newErrors.email = "Email is required";
        if (!registerData.phoneNumber || registerData.phoneNumber.length <= 9) newErrors.phoneNumber = "Phone number must be greater than 9 digits";
        if (registerData.password.length <= 6) newErrors.password = "Password must be greater than 6 characters";
        if (registerData.password !== registerData.reEnterPassword) newErrors.reEnterPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        const { email, password } = loginData;

        try {
            const response = await axios.get('http://localhost:9999/users');
            const users = response.data;

            const loggedInUser = users.find(u => u.email === email && u.password === password);

            if (loggedInUser) {
                if (!loggedInUser.active) {
                    setAccountBanned(true);
                    return;
                }

                localStorage.setItem('role', loggedInUser.role);
                localStorage.setItem('userLogged', JSON.stringify(loggedInUser));
                setAlert({ type: 'success', message: 'Login Successful' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                setAlert({ type: 'error', message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setAlert({ type: 'error', message: 'An error occurred during login. Please try again.' });
        }
    };

    const handleRegister = async () => {
        if (!validateRegisterData()) return;

        const {
            firstName,
            lastName,
            gender,
            email,
            password,
            phoneNumber,
            dateOfBirth
        } = registerData;

        try {
            const response = await axios.get('http://localhost:9999/users');
            const users = response.data;

            if (users.some(user => user.email === email)) {
                setAlert({ type: 'error', message: 'Email already exists' });
                return;
            }

            const registerResponse = await axios.post('http://localhost:9999/users', {
                firstName,
                lastName,
                gender,
                email,
                password,
                phoneNumber,
                dateOfBirth,
                role: 'user',
                active: true,
                totalAmount: 0
            });

            console.log('User registered successfully:', registerResponse.data);
            setAlert({ type: 'success', message: 'Register Success, Welcome to FPTicket' });

            await axios.post('http://localhost:4000/email/send', {
                email: registerData.email,
                subject: 'Welcome to FPTicket',
                content: `Dear ${[registerData.firstName]},\n\nThank you for registering with FPTicket! We are excited to have you on board. Your registration has been successfully received and we will be in touch with you soon.\n\nBest regards,\nThe FPTicket Team`
            });

            console.log('Email sent successfully');

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
            console.error('Error registering user or sending email:', error.response ? error.response.data : error.message);
            setAlert({ type: 'error', message: 'An error occurred during registration. Please try again.' });
        }
    };

    const handleRequestChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prevRequestData => ({
            ...prevRequestData,
            [name]: value
        }));
    };

    const handleRequestSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:9999/userRequest', requestData);
            console.log('Request submitted successfully:', response.data);
            setShowModal(false);
            setAlert({ type: 'success', message: 'Request submitted successfully. We will contact you soon.' });
            setRequestData({ email: '', requestType: 2, description: '' });
        } catch (error) {
            console.error('Error submitting request:', error);
            setAlert({ type: 'error', message: 'An error occurred while submitting the request. Please try again.' });
        }
    };

    return (
        <Container style={{ paddingTop: '50px', paddingBottom: '50px' }} fluid className="bg-dark text-white">
            <Container>
                {alert.message && <Box sx={{ mb: 2 }}><Alert severity={alert.type}>{alert.message}</Alert></Box>}
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
                            <Link style={{ color: '#beea4c' }} className="text-success" onClick={() => setShowModal(true)}>Forgot your password?</Link>
                            <Button className='mt-2 d-block' onClick={handleLogin} variant="success">LOGIN</Button>
                            {accountBanned && <Alert variant="success" className="text-white mt-3">Your account has been banned. Please contact admin to unlock.</Alert>}
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
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
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
                                            isInvalid={!!errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
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
                                            isInvalid={!!errors.gender}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="female"
                                            checked={registerData.gender === 'female'}
                                            onChange={handleRegisterChange}
                                            isInvalid={!!errors.gender}
                                        />
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="text"
                                            placeholder="Enter your phone number"
                                            name="phoneNumber"
                                            value={registerData.phoneNumber}
                                            onChange={handleRegisterChange}
                                            isInvalid={!!errors.phoneNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={registerData.password}
                                            onChange={handleRegisterChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Re-enter Password</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="password"
                                            placeholder="Re-enter your password"
                                            name="reEnterPassword"
                                            value={registerData.reEnterPassword}
                                            onChange={handleRegisterChange}
                                            isInvalid={!!errors.reEnterPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.reEnterPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="text"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={registerData.email}
                                            onChange={handleRegisterChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="p-2">
                                        <Form.Label>Date of birth</Form.Label>
                                        <Form.Control
                                            className="transparent-input"
                                            type="date"
                                            name="dateOfBirth"
                                            value={registerData.dateOfBirth}
                                            onChange={handleRegisterChange}
                                            isInvalid={!!errors.dateOfBirth}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dateOfBirth}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="m-2 d-block" variant="success" onClick={handleRegister}>REGISTER</Button>
                        </Form>
                    </Col>
                </Row>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={requestData.email}
                                    onChange={handleRequestChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Request Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="requestType"
                                    value={requestData.requestType}
                                    onChange={handleRequestChange}
                                >
                                    <option value={1}>Unban Account</option>
                                    <option value={2}>Forgot Password</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={requestData.description}
                                    onChange={handleRequestChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleRequestSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Container>
    );
};

export default Login;
