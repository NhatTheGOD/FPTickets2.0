import { Container, Spinner, Alert } from "react-bootstrap";
import PromoEvent from "../components/promoEvent/PromoEvent";
import { useEffect, useState } from 'react';
import axios from 'axios';

const PromoEventM = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:9999/event");
                setEvents(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container fluid className=" p-4 bg-dark">
            <Container>
                <h1 className="pt-4 text-center text-white"><strong>DISCOVER OUR PROMO/EVENT</strong></h1>
                <PromoEvent className="p-4" events={events.filter(e => e.type === "event")} title={"EVENT"} />
                <PromoEvent className="p-4" events={events.filter(e => e.type === "promo")} title={"PROMO"} />
            </Container>
        </Container>
    );
}

export default PromoEventM;
