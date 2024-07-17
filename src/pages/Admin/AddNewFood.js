import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
    const [food, setFood] = useState({
        name: '',
        img: '',
        desc: '',
        price: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood((prevFood) => ({
            ...prevFood,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:9999/popCorns', food);
            window.alert('Food added successfully');
            navigate('/admin/food'); // Navigate to the food list or any other page
        } catch (error) {
            console.error('Error adding food:', error);
            window.alert('Error adding food. Please try again.');
        }
    };

    return (
        <Container fluid className="p-4 bg-dark text-white">
            <Container>
                <h3 className="text-center">Add New Food</h3>
                <Form onSubmit={handleSubmit} className="mt-4">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={food.name}
                                    onChange={handleChange}
                                    placeholder="Enter food name"
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
                                    value={food.img}
                                    onChange={handleChange}
                                    placeholder="Enter image URL"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="desc"
                                    value={food.desc}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={food.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="success" type="submit">Add Food</Button>
                </Form>
            </Container>
        </Container>
    );
};

export default AddFood;
