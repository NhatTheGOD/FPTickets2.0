import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Calendar from "../components/showTImes/calendar/Calendar";
import ShowtimeDate from "../components/showTImes/showTimebydate/ShowtimeDate";
import axios from "axios";

const ShowTimes = () => {
    const [showtimes, setShowTImes] = useState([])
    const [moviesList, setMovies] = useState([])
    const [theatersList, setTheaters] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log(`Selected Date: ${date}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9999/onTheaterMovies");
                setMovies(response.data);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9999/theater");
                setTheaters(response.data);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9999/showTimes");
                setShowTImes(response.data)
            } catch (error) {
                console.log("error");
            }
        }
        fetchData()
    }, [])

    const setSelectedMonthV = (e) => {
        setSelectedMonth(e.target.value)
    }
    return (
        <Container fluid className="bg-dark text-white">
            <h1 className="text-center">WATCH LIST</h1>
            <Container className="bg-dark ">
                <Container className="d-flex">
                    <h2>Month :</h2>
                    <Form.Select size="xl" style={{ width: "10%" }} onChange={setSelectedMonthV} value={selectedMonth}>
                        {Array.from({ length: 12 }, (_, index) => {
                            const monthNumber = (index + 1).toString().padStart(2, '0'); 
                            return <option key={index + 1} value={monthNumber}>{monthNumber}</option>;
                        })}
                    </Form.Select>
                </Container>
                <Calendar year={2024} month={selectedMonth} onDateSelect={handleDateSelect} />
                {selectedDate && <p>Selected Date: {selectedDate}</p>}
                <ShowtimeDate movies={moviesList} theaters={theatersList} showTimesData={showtimes} selectedDate={selectedDate} selectedMonth={selectedMonth} />
            </Container>
        </Container>
    );
}

export default ShowTimes;