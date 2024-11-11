import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, Box } from "@mui/material";

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
        <Container sx={{ pt: 4 }}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
                <h3>Add New Movie</h3>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        className="mb-3"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                    <FormControl fullWidth variant="outlined" className="mb-3">
                        <InputLabel>Age Rating</InputLabel>
                        <Select
                            value={movie.ageUnder}
                            onChange={handleChange}
                            label="Age Rating"
                            name="ageUnder"
                            required
                        >
                            <MenuItem value="P">P</MenuItem>
                            <MenuItem value="18">18</MenuItem>
                            <MenuItem value="K">K</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className="mb-3">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={movie.type}
                            onChange={handleChange}
                            label="Type"
                            name="type"
                        >
                            <MenuItem value="Action">Action</MenuItem>
                            <MenuItem value="Comedy">Comedy</MenuItem>
                            <MenuItem value="Drama">Drama</MenuItem>
                            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Director"
                        variant="outlined"
                        className="mb-3"
                        name="director"
                        value={movie.director}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Duration (in minutes)"
                        variant="outlined"
                        className="mb-3"
                        type="number"
                        name="time"
                        value={movie.time}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Image URL"
                        variant="outlined"
                        className="mb-3"
                        name="img"
                        value={movie.img}
                        onChange={handleChange}
                        required
                    />
                    <FormGroup className="mb-3">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={movie.onTheater}
                                    onChange={(e) => setMovie({ ...movie, onTheater: e.target.checked })}
                                    name="onTheater"
                                    color="primary"
                                />
                            }
                            label="Now Showing"
                        />
                    </FormGroup>
                    <Button variant="contained" color="primary" type="submit">
                        Add Movie
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default AddMovies;
