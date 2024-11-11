import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container,FormControlLabel, Switch, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';

const MoviesAdmin = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [status, setStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null); // State to hold the selected movie for update

    useEffect(() => {
        const fetchData = async () => {
            try {
                const onTheaterMoviesData = await axios.get("http://localhost:9999/onTheaterMovies");
                setMoviesData(onTheaterMoviesData.data);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, []);

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleChangeStatus = async (id) => {
        let movie = moviesData.find(m => m.id === id);
        const updatedMovie = { ...movie, onTheater: !movie.onTheater };

        try {
            await axios.put(`http://localhost:9999/onTheaterMovies/${id}`, updatedMovie);
            setMoviesData(moviesData.map(m => m.id === id ? updatedMovie : m));
            alert("Status changed successfully");
        } catch (error) {
            console.log('Error updating movie status:', error);
        }
    };

    const handleDelete = (id) => {
        let movie = moviesData.find(m => m.id === id);
        if (window.confirm("Do you want to delete?")) {
            axios.delete(`http://localhost:9999/onTheaterMovies/${id}`)
                .then((response) => {
                    alert("Delete success. Product: " + movie.name);
                    setMoviesData(moviesData.filter(m => m.id !== id));
                })
                .catch(error => console.log(error));
        }
    };

    const openUpdateModal = (movie) => {
        setSelectedMovie(movie);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        setOpenModal(false);
    };

    const handleUpdateMovie = async () => {
        try {
            await axios.put(`http://localhost:9999/onTheaterMovies/${selectedMovie.id}`, selectedMovie);
            setMoviesData(moviesData.map(m => m.id === selectedMovie.id ? selectedMovie : m));
            handleCloseModal();
            alert("Movie updated successfully");
        } catch (error) {
            console.log('Error updating movie:', error);
        }
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const filteredMovies = moviesData.filter(m =>
        (status === "all" || m.onTheater === (status === "true")) &&
        (m.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, bgcolor: 'background.paper', mt: 4 }}>
                <h3>YOUR MOVIES</h3>
                <Button variant="contained" color="secondary" component={Link} to='/admin/movies/addMovies'>
                    Create New Movies
                </Button>
                <TextField
                    sx={{ my: 2, height: '40px' }}
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Movie name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <FormControl sx={{ float: 'right', mb: 1, width: '200px', height: '40px' }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={status}
                        label="Sort by"
                        onChange={handleStatus}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'true'}>Now showing</MenuItem>
                        <MenuItem value={'false'}>Not showing</MenuItem>
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell>Image</StyledTableCell>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Age Rate</StyledTableCell>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Director</StyledTableCell>
                                <StyledTableCell>Time</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMovies.map(m => (
                                <TableRow key={m.id}>
                                    <StyledTableCell>{m.id}</StyledTableCell>
                                    <StyledTableCell>
                                        <img width={"50px"} src={m.img} alt="Movie" />
                                    </StyledTableCell>
                                    <StyledTableCell>{m.title}</StyledTableCell>
                                    <StyledTableCell>{m.ageUnder}</StyledTableCell>
                                    <StyledTableCell>{m.type}</StyledTableCell>
                                    <StyledTableCell>{m.director}</StyledTableCell>
                                    <StyledTableCell>{m.time} Minutes</StyledTableCell>
                                    <StyledTableCell>
                                        <Switch
                                            checked={m.onTheater}
                                            onChange={() => handleChangeStatus(m.id)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            onClick={() => openUpdateModal(m)}
                                            color="primary"
                                            aria-label="edit movie"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Modal for updating movie */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Edit Movie</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        className="mb-3"
                        name="title"
                        value={selectedMovie?.title}
                        onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Age Rating"
                        variant="outlined"
                        className="mb-3"
                        name="ageUnder"
                        value={selectedMovie?.ageUnder}
                        onChange={(e) => setSelectedMovie({ ...selectedMovie, ageUnder: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Director"
                        variant="outlined"
                        className="mb-3"
                        name="director"
                        value={selectedMovie?.director}
                        onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Duration (in minutes)"
                        variant="outlined"
                        className="mb-3"
                        type="number"
                        name="time"
                        value={selectedMovie?.time}
                        onChange={(e) => setSelectedMovie({ ...selectedMovie, time: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Image URL"
                        variant="outlined"
                        className="mb-3"
                        name="img"
                        value={selectedMovie?.img}
                        onChange={(e) => setSelectedMovie({ ...selectedMovie, img: e.target.value })}
                        required
                    />
                    <FormControl fullWidth variant="outlined" className="mb-3">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={selectedMovie?.type}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, type: e.target.value })}
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
                    <FormControlLabel
                        control={
                            <Switch
                                checked={selectedMovie?.onTheater}
                                onChange={(e) => setSelectedMovie({ ...selectedMovie, onTheater: e.target.checked })}
                                name="onTheater"
                                color="primary"
                            />
                        }
                        label="Now Showing"
                        className="mb-3"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateMovie} variant="contained" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default MoviesAdmin;
