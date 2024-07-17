import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

const UpdateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: "",
        ageUnder: "",
        type: "",
        director: "",
        time: "",
        onTheater: false,
        img: ""
    });

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/onTheaterMovies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };
        fetchMovie();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMovie(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9999/onTheaterMovies/${id}`, movie);
            alert("Movie updated successfully");
            navigate('/admin/movies');
        } catch (error) {
            console.log('Error updating movie:', error);
        }
    };

    return (
        <Container>
            <h3>Update Movie</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Age Rate</Form.Label>
                    <Form.Control
                        type="text"
                        name="ageUnder"
                        value={movie.ageUnder}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="type"
                        value={movie.type}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Director</Form.Label>
                    <Form.Control
                        type="text"
                        name="director"
                        value={movie.director}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time (Minutes)</Form.Label>
                    <Form.Control
                        type="text"
                        name="time"
                        value={movie.time}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        name="onTheater"
                        checked={movie.onTheater}
                        label="Now Showing"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="img"
                        value={movie.img}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>
        </Container>
    );
};

export default UpdateMovie;
