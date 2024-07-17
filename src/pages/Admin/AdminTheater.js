import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminTheater = () => {
    const [theaters, setTheaters] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:9999/theater')
                setTheaters(response.data)
            } catch (error) {

            }
        }
        fetchdata()
    }, [])

    return (
        <Container fluid className="p-4">
            <Container>
                <h1 className="p-4 text-center">OUR THEATER</h1>
                <Link to='/admin/theaters/addTheater' className="btn btn-secondary mb-4">Add New Theater</Link>
                <Row>
                    {theaters.map(t => (
                        <Col>
                            <Card md={3}>
                                <Card.Img src={t.img}/>
                                <Card.Body>
                                    <Card.Title>{t.name}</Card.Title>
                                    <Card.Text>Email: {t.email}</Card.Text>
                                    <Card.Text>Place: {t.place}</Card.Text>
                                    <Card.Text>PhoneNumber:{t.phoneNumber}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default AdminTheater;