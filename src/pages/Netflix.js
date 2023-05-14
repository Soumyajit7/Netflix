import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import "../styles/netflix_page.css"
import { FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store/store';
import Slider from '../components/Slider';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';



const Netflix = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);


    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])


    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "all" }));
        }
        // eslint-disable-next-line
    }, [genresLoaded]);


    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/signin");
        });
        // eslint-disable-next-line
    }, [onAuthStateChanged])


    return (
        <>
            <div className='netflix_page_container'>
                <Navbar />
                <div className='content_container'>
                    <div className='title_container'>
                        <h1>Lost In Space</h1>
                    </div>
                    <div className='desc_container'>
                        After crash-landing on an alien planet, the Robinson family fights against all odds to survive and escape. But they're surrounded by hidden dangers.
                    </div>
                    <div className='btn_container'>
                        <button className='play_btn' onClick={() => navigate("/player")}><FaPlay /><span className='btn_text'>Watch</span></button>
                        <button className='add_list_btn'><span className='btn_text'>Add To List</span></button>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </>
    )
}

export default Netflix