import React, { useState, useEffect } from 'react';
import { Container, Select, Button, Typography, Box, Table, TableHead, TableBody, TableRow, TableCell, FormControl, InputLabel, Input, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import dayjs from 'dayjs';

const CreateShowing = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedTheater, setSelectedTheater] = useState('');
    const [selectedTheaterSeats, setSelectedTheaterSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const onTheaterMoviesData = await axios.get("http://localhost:9999/onTheaterMovies");
                setMoviesData(onTheaterMoviesData.data);
                const response = await axios.get('http://localhost:9999/theater');
                setTheaters(response.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    };

    const handleTheaterChange = async (event) => {
        setSelectedTheater(event.target.value);

        // Fetch seating data for the selected theater
        try {
            const theaterId = theaters.find(theater => theater.name === event.target.value)?.id;
            if (theaterId) {
                const response = await axios.get(`http://localhost:9999/theater/${theaterId}`);
                setSelectedTheaterSeats(response.data.seat);
            }
        } catch (error) {
            console.error('Error fetching theater seats:', error);
        }
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleCreateShowing = async () => {
        // Basic validation
        if (!selectedMovie || !selectedTheater || !selectedDate || !selectedTime || selectedTheaterSeats.length === 0) {
            window.alert('Please fill out all fields.');
            return;
        }

        // Prepare data to be saved
        const showingData = {
            movieId: selectedMovie,
            theater: selectedTheater,
            showDate: selectedDate.format('YYYY-MM-DD'),
            showTime: selectedTime,
            seats: selectedTheaterSeats.map(seat => ({
                class: seat.class,
                totalChairs: seat.chair,
                price: seat.price,
            })),
        };

        try {
            // Send POST request to save the showing information
            const response = await axios.post('http://localhost:9999/showing', showingData);
            console.log('Showing created:', response.data);
            // Optionally reset the form or provide feedback to the user
            setSelectedMovie('');
            setSelectedTheater('');
            setSelectedTime('');
            setSelectedDate(dayjs());
            setSelectedTheaterSeats([]);
            window.alert('Showing created successfully!');
        } catch (error) {
            console.error('Error creating showing:', error);
            window.alert('Error creating showing. Please try again later.');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, bgcolor: 'background.paper', mt: 4 }}>
                    <Typography variant="h2" gutterBottom>CREATE NEW SHOWING</Typography>
                    <Row>
                        {selectedMovie ? <Col md={1}>
                            <img className="p-2" style={{ width: "100px" }} src={moviesData.find(m => parseInt(m.id) === parseInt(selectedMovie))?.img} alt="Movie Poster" />
                        </Col> : null}
                        <Col md={11}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel htmlFor="movie-select">Choose Movie for Showing</InputLabel>
                                <Select
                                    value={selectedMovie}
                                    onChange={handleMovieChange}
                                    fullWidth
                                    label="Choose Movie for Showing"
                                    id="movie-select"
                                >
                                    <MenuItem value="">Select a movie</MenuItem>
                                    {moviesData.map((movie) => (
                                        <MenuItem key={movie.id} value={movie.id}>{movie.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Col>
                    </Row>

                    <FormControl required fullWidth sx={{ mb: 2, mt: 1 }}>
                        <InputLabel htmlFor="theater-select">Choose Theater to Show</InputLabel>
                        <Select
                            value={selectedTheater}
                            onChange={handleTheaterChange}
                            fullWidth
                            label="Choose Theater to Show"
                            id="theater-select"
                        >
                            <MenuItem value="">Select a theater</MenuItem>
                            {theaters.map((theater) => (
                                <MenuItem key={theater.id} value={theater.name}>{theater.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl required fullWidth sx={{ mb: 2, mt: 1 }}>
                        <DatePicker
                            label="Select Show Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <Input {...params} />}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
                        <InputLabel htmlFor="time-input">Enter Show Time</InputLabel>
                        <Input
                            id="time-input"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            fullWidth
                            placeholder="HH:MM AM/PM"
                        />
                    </FormControl>

                    {selectedTheater && (
                        <Box sx={{ boxShadow: 1, mt: 1, p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
                            <Typography variant="h4" mb={2}>Seating Information</Typography>
                            <Table>
                                <TableHead sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                                    <TableRow>
                                        <TableCell className="text-white">Seat Class</TableCell>
                                        <TableCell className="text-white">Total Chairs</TableCell>
                                        <TableCell className="text-white">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedTheaterSeats.map((seat) => (
                                        <TableRow key={seat.id}>
                                            <TableCell>{seat.class}</TableCell>
                                            <TableCell>{seat.chair}</TableCell>
                                            <TableCell>{seat.price.toLocaleString("vi-VN")} vnd</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )}

                    <Button onClick={handleCreateShowing} variant="contained" sx={{ mt: 2 }}>Create</Button>
                </Box>
            </Container>
        </LocalizationProvider>
    );
};

export default CreateShowing;
