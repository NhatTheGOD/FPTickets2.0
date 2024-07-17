
import Flickity from 'react-flickity-component';
import { useState } from "react";
import 'flickity/css/flickity.css';
import { Button, Card, Container } from 'react-bootstrap';
import ModalEvent from './ModalEvent';

const PromoEvent = ({events, title}) => {

    const [modalShow, setModalShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const flickityOptions = {
        initialIndex: 2,
        autoPlay: 1500,
        wrapAround: true,
    };

    
    const handleSelectevent = (event) => {
        setSelectedEvent(event)
        setModalShow(true)
    }

    return (
        <Container fluid className='p-4 bg-dark'>
                <h2 className='pt-4 text-center text-white'>{title}</h2>
            <Container>
            <Flickity
                    className={'carousel p-4'}
                    elementType={'div'}
                    options={flickityOptions}
                    disableImagesLoaded={false} 
                    reloadOnUpdate 
                    static
                >
                    {events.map((o) => (
                        <Card onClick={() => handleSelectevent(o)} className="custom-card bg-dark border-0">
                            <Card.Img variant="top" src={o.img} />
                            <Card.Body>
                                <Card.Title className='text-success'>
                                        {o.title}
                                </Card.Title>
                                <Card.Text>
                                    <p>Time apply : {o.date}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Flickity> 
                {selectedEvent && (
                    <ModalEvent data={selectedEvent} show={modalShow} onHide={() => setModalShow(false)} />
                )}
            </Container>
        </Container>
    );
}

export default PromoEvent;