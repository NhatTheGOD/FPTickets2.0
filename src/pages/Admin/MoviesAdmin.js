import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MoviesAdmin = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [status, setStatus] = useState("all"); 
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const onTheaterMoviesData = await axios.get("http://localhost:9999/onTheaterMovies")
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
    }

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

    const filteredMovies = moviesData.filter(m =>
        (status === "all" || m.onTheater === (status === "true")) &&
        (m.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Container fluid className="pt-4">
            <h3>YOUR MOVIES</h3>
            <Link to='/admin/movies/addMovies' className="btn btn-secondary">Create New Movies</Link>
            <input
                className="m-4"
                type="text"
                placeholder="Enter Movie name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="float-end">
                Sort by:
                <Form.Select onChange={handleStatus} style={{ width: '100%' }}>
                    <option value={'all'}>All</option>
                    <option value={'true'}>Now showing</option>
                    <option value={'false'}>Not showing</option>
                </Form.Select>
            </div>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Age Rate</th>
                        <th>Type</th>
                        <th>Director</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovies.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>
                                <img width={"50px"} src={m.img} alt="Movie" />
                            </td>
                            <td>{m.title}</td>
                            <td>{m.ageUnder}</td>
                            <td>{m.type}</td>
                            <td>{m.director}</td>
                            <td>{m.time} Minutes</td>
                            <td className={m.onTheater ? 'text-success' : 'text-danger'}>
                                {m.onTheater ? 'Now Showing' : 'Not Showing'}
                            </td>
                            <td>
                                <Button onClick={() => handleChangeStatus(m.id)} className="m-2" variant="success">Change</Button>
                                <Link to={`/admin/movies/updateMovies/${m.id}`} className="btn btn-warning m-2">Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default MoviesAdmin;
