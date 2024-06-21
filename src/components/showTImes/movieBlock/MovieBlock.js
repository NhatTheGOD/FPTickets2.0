import { Container, Row, Button, Col } from "react-bootstrap";
import '../../../css/MovieBlock/MovieBlock.css';

const MovieBlock = ({ theater, movie, showTimes }) => {
    return (
        <Container fluid className="bg-dark">
            <Container className="bg-dark">
                {movie.map(m => {
                    const showTimebyMovies = showTimes.filter(s => s.moviesId === m.id);
                    const currentTheater = theater.find(t => t.id === showTimebyMovies[0]?.theaterId);

                    return showTimebyMovies.length > 0 ? (
                        <Row className="custom-block" key={m.id}>
                            <Col md={2}>
                                <img
                                    style={{ width: "100%" }}
                                    alt="movie"
                                    src={m.img}
                                />
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Container>
                                        <h3>{m.title}</h3>
                                        {showTimebyMovies.map((s, index) => (
                                            <Button key={index} variant="secondary">
                                                {s.time}
                                            </Button>
                                        ))}
                                    </Container>
                                </Row>
                                <Button className="transparent-button">
                                    Available in {currentTheater?.name}
                                </Button>
                            </Col>
                        </Row>
                    ) : null;
                })}
            </Container>
        </Container>
    );
};

export default MovieBlock;
