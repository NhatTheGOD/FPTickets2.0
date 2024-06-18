import { Container, Row, Col,Image, Button } from "react-bootstrap";

const MemberShip = ({ memberShip }) => {
    return (
        <Container style={{borderBottom : '1px solid grey'}}  fluid className="pt-4 bg-secondary">
            <Container className="p-4 text-center">
            <h1 >JOIN OUR MEMBERSHIP</h1>
            <Row className="p-4">
                {memberShip.map(m => (
                    <Col md={4}>
                        <Image src={m.img} rounded/>
                    </Col>
                ))}
            </Row>
            <Button className="transparent-button">ASIGN NOW</Button>
            </Container>
        </Container>
    );
}

export default MemberShip;