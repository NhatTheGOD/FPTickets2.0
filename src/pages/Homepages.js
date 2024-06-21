import CarouselM from "../components/homepage/carousel/CarouselM";
import MovieCard from "../components/homepage/movieCard/MovieCard";
import { useState, useEffect } from "react";
import ModalMovies from "../components/homepage/movieDetailModal/ModalMovies";
import MemberShip from "../components/homepage/memberShip/MemberShip";
import { getMoviesData } from "../services/movieService";
import { getMemberShip } from "../services/membershipService";
import axios from "axios";

const Homepages = () => {

    const [moviesData, setMoviesData] = useState([]);
    const [memberShip, setMemberShip] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const onTheaterMoviesData = await getMoviesData();
                setMoviesData(onTheaterMoviesData);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchMemberShip = async () => {
            try {
                const membershipData = await getMemberShip();
                setMemberShip(membershipData);
            } catch (error) {
                console.log('Error fetching membership data:', error);
            }
        };
        fetchMemberShip();
    }, []);

    return (
        <>
        <ModalMovies/>
        <CarouselM/>
        <MovieCard movies={moviesData.filter(s => (s.onTheater == true))} title={"NOW SHOWING"} />
        <MovieCard movies={moviesData.filter(s => (s.onTheater == false))} title={"UP COMMING"} />
        <MemberShip memberShip={memberShip} />
        </>
    );
}

export default Homepages;