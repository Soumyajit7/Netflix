import React from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import "../styles/header.css";


const Header = (props) => {
    const navigate = useNavigate()


    return (
        <div className='header_container'>
            <div className='logo'>
                <Logo className='netflix_logo' />
            </div>
            <div className='header_btn'>
                <button onClick={() => navigate(props.signin ? "/signin" : "/signup")} style={{ display: !props.signin ? 'none' : '' }}>
                    {props.signin ? "Sign In" : ""}
                </button>
            </div>
        </div>
    )
}

export default Header