import { Modal } from "react-bootstrap";
import { Row, Col, Button,Badge } from "react-bootstrap";

const ModalEvent = (props) => {
    return (
        <>
            <Modal
                size="xl"
                show={props.show}
                onHide={props.onHide}
                centered
            >
                <Modal.Body className="bg-dark">
                    {props.data && (
                        <Row>
                            <Col md={4}>
                                <img  style={{ width: '100%' }} src={props.data.img} alt={props.data.title} />
                            </Col>
                            <Col md={8}>
                                <h2 className="text-success">{props.data.title}</h2>
                                <p className="pt-3 text-white">Time apply event: {props.data.date}</p>
                                <p className="pt-3 text-white">{props.data.desc}</p>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalEvent;