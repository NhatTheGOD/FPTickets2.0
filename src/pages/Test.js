import MovieBlock from "../components/showTImes/movieBlock/MovieBlock";
import { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
    const [showtimes, setShowTImes] = useState(["a"])
    const [moviesList, setMovies] = useState([])
    const [theatersList, setTheaters] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9999/onTheaterMovies");
                setMovies(response);
                console.log("st "+ showtimes);
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
                setTheaters(response);
                console.log("tl "+theatersList);
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
                console.log("ml" +moviesList);
            } catch (error) {
                console.log("error");
            }
        }
        fetchData()
    }, []);

    return (
        <>

        </>
    );
}

export default Test;