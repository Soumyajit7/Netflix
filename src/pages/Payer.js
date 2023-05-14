import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../styles/player.css"
import video from "../assets/Lost in Space   Official Trailer   Netflix.mp4";


const Payer = () => {
    const navigate = useNavigate();

    return (
        <div className='player_container'>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <video src={video} autoPlay loop controls />
            </div>
        </div>
    )
}

export default Payer