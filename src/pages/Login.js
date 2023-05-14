import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate, Link } from 'react-router-dom';
import "../styles/login.css"
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';


const Login = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = formValues;
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error);
        }
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
        <div className='login_container'>
            <div className='content'>
                <Header />
                <div className='login_body'>
                    {/* Login Form */}
                    <div className='login_form'>
                        <div className='login_form_main'>
                            <h1 className='signin_title'>Sign In</h1>
                            <form className='loginForm' onSubmit={handleLogin}>
                                <div className='form_in'>
                                    <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} className='input_field' required autoComplete="off" />
                                </div>
                                <div className='form_in'>
                                    <input type="password" placeholder='Password' name='password' value={formValues.password} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} className='input_field' required autoComplete="off" />
                                </div>
                                <button className='login_btn' type='submit'>Sign In</button>
                                <div className='form_footer_container'>
                                    <div className='checkbox'>
                                        <Checkbox
                                            label="Remember me"
                                            value={checked}
                                            onChange={() => setChecked(!checked)}
                                        />
                                    </div>
                                    <div className='help'>
                                        <Link>Need help?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='login_form_other'>
                            <span>New to Netflix? </span>
                            <Link to="/signup">Sign up now</Link>
                        </div>
                        <div className='google_btn_container'>
                            <button type="button" className="login-with-google-btn" >
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login


const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <span className='checkbox_input'>
                <input type="checkbox" checked={value} onChange={onChange} className='checkbox_input' />
            </span>
            <span className='checkbox_lebel'>{label}</span>
        </label>
    );
};