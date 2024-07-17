import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddTheater = () => {
    const [theater, setTheater] = useState({
        name: '',
        img: '',
        place: '',
        phoneNumber: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTheater((prevTheater) => ({
            ...prevTheater,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:9999/theater', theater);
            window.alert('Theater added successfully');
            navigate('/admin/theaters'); 
        } catch (error) {
            console.error('Error adding theater:', error);
            window.alert('Error adding theater. Please try again.');
        }
    };

    return (
        <Container fluid className="p-4 bg-dark text-white">
            <Container>
                <h3 className="text-center">Add New Theater</h3>
                <Form onSubmit={handleSubmit} className="mt-4">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={theater.name}
                                    onChange={handleChange}
                                    placeholder="Enter theater name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="img"
                                    value={theater.img}
                                    onChange={handleChange}
                                    placeholder="Enter image URL"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Place</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="place"
                                    value={theater.place}
                                    onChange={handleChange}
                                    placeholder="Enter place"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={theater.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={theater.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="success" type="submit">Add Theater</Button>
                </Form>
            </Container>
        </Container>
    );
};

export default AddTheater;
