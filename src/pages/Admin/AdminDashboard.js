import { Container, Table } from "react-bootstrap";
import TicketSalesChart from "../../components/admin/chart/TicketSalesChart";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const AdminDashboard = () => {
    const [movie, setMovies] = useState([])
    const [showings, setShowings] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const onTheaterMoviesData = await axios.get("http://localhost:9999/onTheaterMovies");
                setMovies(onTheaterMoviesData.data);
                const response = await axios.get('http://localhost:9999/showing');
                setShowings(response.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <TicketSalesChart />
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h4">Showing available</Typography>
            <Link className="btn btn-secondary" to={"/createShowing"}>Create Showing</Link>
                <Table>
                    <thead>
                        <tr>
                            <th>MovieName</th>
                            <th>Img</th>
                            <th>Theater</th>
                            <th>Showtime</th>
                            <th>ShowDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showings.map(s => (
                            <tr>
                                <td>{movie.find(m => parseInt(m.id) === parseInt(s.movieId))?.title}</td>
                                <td>
                                    <img style={{ width: '50px' }} src={movie.find(m => parseInt(m.id) === parseInt(s.movieId))?.img} />
                                </td>
                                <td>{s.theater}</td>
                                <td>{s.showTime}</td>
                                <td>{s.showDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Box>

        </>
    );
}

export default AdminDashboard;