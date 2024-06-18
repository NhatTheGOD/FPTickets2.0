import { Modal } from "react-bootstrap";
import { Row, Col, Button,Badge } from "react-bootstrap";
import { FaTicket } from "react-icons/fa6";

const ModalMovies = (props) => {
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
                                <div className="mt-4 d-flex justify-content-between">
                                    <Button variant="success"><FaTicket /> Buy ticket now</Button>
                                    <Button className="transparent-button" href="https://www.youtube.com/embed/abPmZCZZrFA" >Watch Trailer</Button>
                                </div>
                            </Col>
                            <Col md={8}>
                                <h1 className="text-success">{props.data.title}</h1>
                                <p className="pt-3 text-white">{props.data.description}</p>
                                <p className="pt-3 text-white">Age under: <Badge bg="danger">{props.data.ageUnder}</Badge></p>
                                <p className="pt-3 text-white">Định dạng: <Badge bg="success">{props.data.type}</Badge></p>
                                <p className="pt-3 text-white">Đạo diễn: {props.data.director}</p>
                                <p className="pt-3 text-white">Thể loại: {props.data.category}</p>
                                <p className="pt-3 text-white">Khởi chiếu: {props.data.startDate}</p>
                                <p className="pt-3 text-white">Thời lượng: {props.data.time}</p>
                                <p className="pt-3 text-white">Ngôn ngữ: {props.data.language}</p>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalMovies;