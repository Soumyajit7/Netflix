import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Slider from '../components/Slider';
import SelectGenre from "../components/SelectGenre"
import NotAvailable from "../components/NotAvailable"
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';


const Movies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])


    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "movie" }));
        }
        // eslint-disable-next-line
    }, [genresLoaded]);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/signup");
        });
        // eslint-disable-next-line 
    }, [onAuthStateChanged])

    return (
        <Container>
            <Navbar />
            <div className="data">
                <SelectGenre genres={genres} type="movie" />
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    )
}

export default Movies

const Container = styled.div`
  .data {
    margin-top: 8rem;
    animation-name: fade;
    animation-duration: 0.5s;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;