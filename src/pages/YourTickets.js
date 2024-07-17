import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { format, isBefore } from "date-fns";

const YourTickets = () => {
    const user = JSON.parse(localStorage.getItem('userLogged'));
    const [tickets, setTickets] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:9999/tickets');
                const resM = await axios.get('http://localhost:9999/onTheaterMovies');
                setTickets(res.data);
                setMovies(resM.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getMembershipImage = (amount) => {
        if (amount >= 10000000) {
            return "/images/memberShip/pla.png";
        } else if (amount >= 5000000) {
            return "/images/memberShip/gold.png";
        } else {
            return "/images/memberShip/nor.png";
        }
    };

    const userTicket = tickets.filter(t => t.userId === user.id);
    const totalAmountPay = userTicket.reduce((acc, item) => {
        const amountString = String(item.totalAmount);
        const amount = parseInt(amountString.replace(/\D/g, ''), 10);
        return acc + amount;
    }, 0);
    

    return (
        <Container fluid className="p-4 text-white bg-dark">
            <Container>
                <h2 onClick={() => {console.log(movies);}}>Welcome back <span className="text-success">{user.firstName.toUpperCase()}</span>, how are you today?</h2>
                <Row>
                    <Col md={3}>
                        <Card className="bg-dark">
                            <Card.Img className="rounded-circle" src="/images/avatar_25.jpg" />
                            <Card.Body>
                                <Card.Title>
                                    <p>You have paid: <strong>{totalAmountPay.toLocaleString('vi-VN')} VND</strong></p>
                                </Card.Title>
                                <Card.Text>
                                    <p>Your membership is:</p>
                                    <Card.Img src={getMembershipImage(totalAmountPay)} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={9}>
                        <h4 className="text-center">Your tickets</h4>
                        <Table striped hover bordered className="table-dark text-white">
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Quantity</th>
                                    <th>Theater</th>
                                    <th>Times</th>
                                    <th>Food</th>
                                    <th>Total</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userTicket?.map(u => (
                                        <tr key={u.id}>
                                            <td>
                                                <img style={{ width: '80px' }} src={`${movies.find(m => parseInt(m.id) === parseInt(u.movieID))?.img}`} alt="Movie" />
                                            </td>
                                            <td>{u.quantity} Tickets</td>
                                            <td>{u.cinema}</td>
                                            <td>{format(new Date(u.showDate), 'dd/MM/yy')}</td>
                                            <td>Food</td>
                                            <td>{u.totalAmount} VND</td>
                                            <td
                                                className= {
                                                    isBefore(new Date(u.showDate), new Date()) ? 'text-danger' : 'text-success'
                                                }
                                            >{isBefore(new Date(u.showDate), new Date()) ? 'No' : 'Yes'}</td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default YourTickets;
