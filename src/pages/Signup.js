import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import "../styles/signup.css";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleClickGetStarted = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error);
        }
        setFormValues({ email: "", password: "" });
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                navigate("/")
            }
        })
        // eslint-disable-next-line
    }, [onAuthStateChanged])

    return (
        <div className='signup_container'>
            <div className='content'>
                <Header signin />
                <div className='body flex column a-center j-center signup_body'>
                    <div className='text flex column'>
                        <h1>Unlimited movies, TV shows and more</h1>
                        <h4>Watch anywhere. Cancle anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <form className='form' onSubmit={handleClickGetStarted}>
                        <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} className='input_field' required />
                        <input type='password' placeholder='Password' name='password' value={formValues.password} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} className='input_field' required />
                        <button className='getstartbtn' type='submit'>Get Started</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup

