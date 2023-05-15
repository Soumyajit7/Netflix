import React, { useEffect, useState } from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "../styles/navbar.css"
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';


const Navbar = ({ navItem }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [endPoint, setEndPoint] = useState("");

    const handleLogOut = async () => {
        await signOut(firebaseAuth);
        navigate("/signin");
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) {
                navigate("/signin");
            }
        })
        // eslint-disable-next-line
    }, [onAuthStateChanged])

    useEffect(() => {
        let parts = location.pathname.split("/");
        let firstString = parts[1];
        setEndPoint(firstString);
    }, [location.pathname])

    return (
        <div className='navbar_container'>
            <div className='logo_container'>
                <Logo className='netflix_logo netflix_nav_logo' />
            </div>
            <div className='nav_items'>
                <Link className={`nav_item ${endPoint === '' ? 'active' : ''}`} to="/">Home</Link>
                <Link to="/tvshows" className={`nav_item ${endPoint === 'tvshows' ? 'active' : ''}`}>TV Shows</Link>
                <Link to="/movies" className={`nav_item ${endPoint === 'movies' ? 'active' : ''}`}>Movies</Link>
                <Link to="/mylist" className={`nav_item ${endPoint === 'mylist' ? 'active' : ''}`}>My List</Link>
            </div>
            <div className='nav_user'>
                <FaSearch className='icon' />
                <FaPowerOff className='icon logout' onClick={() => handleLogOut()} />
            </div>
        </div>
    )
}

export default Navbar;