import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import video from "../assets/Lost in Space   Official Trailer   Netflix.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { doDisLike, doLike, addToList, removeFromList } from '../utils/Functions';
import { useDispatch } from "react-redux";
import { getUsersLikedMovies } from '../store/store';



export default React.memo(function Card({ movieData, index, isLiked = false }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setUser(currentUser.email);
            else navigate("/signup");
        });
        // eslint-disable-next-line 
    }, [onAuthStateChanged])

    return (
        <div>
            <Container
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                    alt={`${movieData.name}`}
                    onClick={() => navigate("/player")}
                />
                {
                    isHovered && (
                        <div className='hover'>
                            <div className='image_video_container'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                                    alt="card"
                                    onClick={() => navigate("/player")}
                                />
                                <video
                                    src={video}
                                    autoPlay={true}
                                    loop
                                    muted={true}
                                    onClick={() => navigate("/player")}
                                />
                            </div>
                            <div className='info_container'>
                                <h3 className="name" onClick={() => navigate("/player")}>
                                    {movieData.name}
                                </h3>
                                <div className='icons flex j-between'>
                                    <div className='controls flex'>
                                        <IoPlayCircleSharp
                                            title='play'
                                            onClick={() => navigate("/player")}
                                        />
                                        <RiThumbUpFill title='Like'
                                            onClick={() => doLike(user, movieData.genres, movieData.id, movieData.image, movieData.name)}
                                        />
                                        <RiThumbDownFill title='Dislike'
                                            onClick={() => doDisLike(user, movieData.genres, movieData.id, movieData.image, movieData.name)}
                                        />
                                        {
                                            isLiked ? (
                                                <BsCheck title='Remove From List'
                                                    onClick={() => {
                                                        removeFromList(movieData.id, user);
                                                        dispatch(getUsersLikedMovies(user));
                                                    }}
                                                />
                                            ) : (
                                                <AiOutlinePlus title='Add to My List'
                                                    onClick={() => addToList(user, movieData.genres, movieData.id, movieData.image, movieData.name)}
                                                />
                                            )
                                        }
                                    </div>
                                    <div className='info'>
                                        <BiChevronDown title='More Info' />
                                    </div>
                                </div>
                                <div className='genres flex'>
                                    <ul className='flex'>
                                        {movieData.genres.map((genre) => {
                                            return (
                                                <li key={genre}>{genre}</li>
                                            )
                                        }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Container>
        </div>
    );
});


const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image_video_container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info_container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;