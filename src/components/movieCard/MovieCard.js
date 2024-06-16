import { Container, Card, Col, Row, Button } from "react-bootstrap"
import '../../css/movieCard/MovieCard.css'
import axios from "axios";
import { FaTicket } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { useState, useEffect } from "react";

const MovieCard = () => {
    const [onShowing, setOnShowing] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/onTheaterMovies')
                setOnShowing(response.data)
            } catch (error) {
                console.log('error get data movies');
            }
        };
        fetchData();
    }, [])


    return (
        <Container style={{borderBottom : "1px solid grey"}} fluid className="p-4 bg-dark">
            <Container>
                <h2 className="p-4 text-white text-center">SHOWING MOVIES</h2>
                <Row>
                    {onShowing.map((o, index) => (
                        <Col sm={3} key={index}>
                            <Card>
                                <Card.Img variant="top" src={o.img} />
                                <Card.Body>
                                    <Card.Title>
                                        <Button size="sm" className="m-1" variant="danger">{o.ageUnder}</Button>
                                        <Button size="sm" className="transparent-button m-1">{o.language}</Button>
                                        <Button size="sm" className="m-1" variant="success">{o.type}</Button>
                                    </Card.Title>
                                    <Card.Text>
                                        <h1>{o.title}</h1>
                                        <p>Type : {o.category}</p>
                                    </Card.Text>
                                    <Button variant="success">
                                        <FaTicket /> Buy ticket</Button> <Button className="transparent-button"><FaInfo /></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default MovieCard;