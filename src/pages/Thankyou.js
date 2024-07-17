import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Thankyou = () => {

    const { pay } = useParams();
    return (
        <Container fluid className="text-center text-white bg-dark">
            <Container className="p-4">
                <img src="/images/thankyou.png" />
                <Container className="p-4">
                    <h3 >THANKYOU FOR YOUR ORDER</h3>
                    <h4 >See you in theater</h4>
                    <Link to='/' className="text-success">Click here to see your ticket</Link>
                </Container>
            </Container>
        </Container>
    );
}

export default Thankyou;