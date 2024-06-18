import CarouselM from "../components/homepage/carousel/CarouselM";
import MovieCard from "../components/homepage/movieCard/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalMovies from "../components/homepage/movieDetailModal/ModalMovies";
import MemberShip from "../components/homepage/memberShip/MemberShip";
const Homepages = () => {

    const [onShowing, setOnShowing] = useState([]);
    const [Mcards, setMcards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/onTheaterMovies')
                setOnShowing(response.data)
            } catch (error) {
                console.log('error get data movies');
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await axios.get('http://localhost:9999/memberShip')
                setMcards(response.data)
            } catch (error) {
                console.log("error");
            }
        };
        fetchDatas()
    },[])


    return (
        <>
        <ModalMovies/>
        <CarouselM/>
        <MovieCard movies={onShowing.filter(s => (s.onTheater == true))} title={"NOW SHOWING"}/>
        <MovieCard movies={onShowing.filter(s => (s.onTheater == false))} title={"PREPARE FOR"}/>
        <MemberShip memberShip={Mcards}/>
        </>
    );
}

export default Homepages;