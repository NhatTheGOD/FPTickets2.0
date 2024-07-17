import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const AddMovies = () => {
    const [movie, setMovie] = useState({
        title: '',
        ageUnder: '',
        type: '',
        director: '',
        time: '',
        img: '',
        onTheater: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMovie({
            ...movie,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9999/onTheaterMovies', movie)
            .then(response => {
                alert('Movie added successfully');
                navigate('/admin/movies');
            })
            .catch(error => console.log(error));
    };

    return (
        <Container fluid className="pt-4">
            <h3>Add New Movie</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter movie title" 
                        name="title" 
                        value={movie.title} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAgeUnder">
                    <Form.Label>Age Rating</Form.Label>
                    <Form.Select 
                        type="text" 
                        placeholder="Enter age rating" 
                        name="ageUnder" 
                        value={movie.ageUnder} 
                        onChange={handleChange} 
                        required 
                    >
                        <option>P</option>
                        <option>18</option>
                        <option>K</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter movie type" 
                        name="type" 
                        value={movie.type} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDirector">
                    <Form.Label>Director</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter director's name" 
                        name="director" 
                        value={movie.director} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTime">
                    <Form.Label>Duration (in minutes)</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter duration" 
                        name="time" 
                        value={movie.time} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImg">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter image URL" 
                        name="img" 
                        value={movie.img} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formOnTheater">
                    <Form.Check 
                        type="checkbox" 
                        label="Now Showing" 
                        name="onTheater" 
                        checked={movie.onTheater} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Movie
                </Button>
            </Form>
        </Container>
    );
}

export default AddMovies;
