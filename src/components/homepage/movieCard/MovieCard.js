import { Container, Card, Col, Row, Button } from "react-bootstrap";
import '../../../css/movieCard/MovieCard.css'
import { FaTicket } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { useState } from "react";
import ModalMovies from "../movieDetailModal/ModalMovies";
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';


const MovieCard = ({ movies, title }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState(null);

    const shortenTitle = (title) => {
        if (title.length > 11) {
            return title.substring(0, 7) + '...';
        }
        return title;
    };

    const flickityOptions = {
        initialIndex: 2,
        autoPlay: 1500,
        wrapAround: true,
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

    const handleSelectmovie = (movie) => {
        setSelectedMovies(movie)
        setModalShow(true)
    }

    return (
        <Container fluid className="border-bottom-custom p-4 bg-dark">
            <Container>
                <h2 className="p-4 text-white text-center">{title}</h2>
                <Flickity
                    className={'carousel'}
                    elementType={'div'}
                    options={flickityOptions}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static
                >
                    {movies.map((o) => (
                        <Card className="custom-card bg-dark border-0">
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
                                {o.onTheater ? (
                                    <div>
                                        <Button onClick={() => handleSelectmovie(o)} variant="success" className="m-1">
                                            <FaTicket /> Buy ticket
                                        </Button>
                                        <Button onClick={() => handleSelectmovie(o)} className="transparent-button m-1">
                                            <FaInfo /> Info
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={() => handleSelectmovie(o)} className="transparent-button m-1">
                                        <FaInfo /> Detail Infomation
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </Flickity>
                {selectedMovies && (
                    <ModalMovies data={selectedMovies} show={modalShow} onHide={() => setModalShow(false)} />
                )}
            </Container>
        </Container >
    );
}

export default MovieCard;
