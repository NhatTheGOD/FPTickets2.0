import { Container,Row,Col } from "react-bootstrap";

const Footer = () => {
    return (
        <Container fluid className="bg-dark p-4">
            <Container style={{color:'white'}}>
            <Row>
                <Col sm={1}>
                    <img alt="pic" style={{width : '100%'}} src="/images/logo2.png"/>
                </Col>
                <Col sm={11}>
                <p><strong>FPT University - HoaLac -Fer202</strong></p>
                <p>Project-202Fer-FPTICKETS</p>
                <p>Hotline: 19002099</p>
                <p>COPYRIGHT Group1-Fer202. ALL RIGHTS RESERVED</p>
                </Col>
            </Row>
            </Container>
        </Container>
    );
}

export default Footer;