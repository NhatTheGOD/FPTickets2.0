import { Container, Card, Col, Row, Button } from "react-bootstrap";
import '../../../css/movieCard/MovieCard.css'
import { FaTicket } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { useState } from "react";
import ModalMovies from "../movieDetailModal/ModalMovies";

const MovieCard = ({ movies, title }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState(null);

    const shortenTitle = (title) => {
        if (title.length > 11) {
            return title.substring(0, 7) + '...';
        }
        return title;
    };

    const typefilter = (type) => {
        switch (type) {
            case "T16":
                return 'danger';
            case "P":
                return 'primary';
            case "K":
                return 'warning';
            default:
                return 'success';
        }
    }

    const handleSelectmovie = (movie) =>{
       setSelectedMovies(movie)
       setModalShow(true) 
    }

    return (
        <Container style={{ borderBottom: "1px solid grey" }} fluid className="p-4 bg-dark">
            <Container>
                <h2 className="p-4 text-white text-center">{title}</h2>
                <Row>
                    {movies.map((o, index) => (
                        <Col xl={3} md={6} sm={12} key={index} className="p-4">
                            <Card>
                                <Card.Img variant="top" src={o.img} />
                                <Card.Body>
                                    <Card.Title>
                                        <Button size="sm" className="m-1" variant={typefilter(o.ageUnder)}>{o.ageUnder}</Button>
                                        <Button size="sm" className="transparent-button m-1">{o.language}</Button>
                                        <Button size="sm" className="m-1" variant="success">{o.type}</Button>
                                    </Card.Title>
                                    <Card.Text>
                                        <h3>{shortenTitle(o.title)}</h3>
                                        <p>Type : {o.category}</p>
                                    </Card.Text>
                                    <Button onClick={() => handleSelectmovie(o)} variant="success">
                                        <FaTicket /> Buy ticket
                                    </Button>
                                    <Button className="transparent-button">
                                        <FaInfo />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {selectedMovies && (
                <ModalMovies data={selectedMovies} show={modalShow} onHide={() => setModalShow(false)} />
                )}
            </Container>
        </Container>
    );
}

export default MovieCard;
