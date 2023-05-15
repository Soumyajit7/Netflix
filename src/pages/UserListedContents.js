import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLikedMovies } from "../store/store";
import NotAvailable from "../components/NotAvailable";


const UserListedContents = () => {
    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setEmail(currentUser.email);
            else navigate("/signup");
        });
        // eslint-disable-next-line
    }, [onAuthStateChanged])


    useEffect(() => {
        if (email) {
            dispatch(getUsersLikedMovies(email));
        }
        // eslint-disable-next-line
    }, [email]);


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };


    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {
                        movies.length ?
                            movies.map((movie, index) => {
                                return (
                                    <Card
                                        key={movie.id}
                                        movieData={movie}
                                        index={index}
                                        isLiked={true}
                                    />
                                );
                            })
                            : <NotAvailable />
                    }
                </div>
            </div>
        </Container>
    );
}

export default UserListedContents;

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    animation-name: fade;
    animation-duration: 0.5s;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
      height : 2rem
    }
  }
`;
