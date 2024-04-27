import loginBg from './assets/img/login-bg.jpg';
import './assets/css/styles.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();

            if (data.success) {
                // Navigate to the '/info' route upon successful login
                window.location.href = '/information';
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to authenticate');
        }
    };

    return (
        <div className="login">
            <img src={loginBg} alt="login image" className="login__img" />
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Login</h1>

                <div className="login__content">
                    <div className="login__box">
                        <i className="ri-user-3-line login__icon"></i>

                        <div className="login__box-input">
                            <input type="email" required className="login__input" id="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " />
                            <label htmlFor="login-email" className="login__label">Email</label>
                        </div>
                    </div>

                    <div className="login__box">
                        <i className="ri-lock-2-line login__icon"></i>

                        <div className="login__box-input">
                            <input type="password" required className="login__input" id="password" name="password" value={formData.password} onChange={handleChange} placeholder=" " />
                            <label htmlFor="login-pass" className="login__label">Password</label>
                            <i className="ri-eye-off-line login__eye" id="login-eye"></i>
                        </div>
                    </div>
                </div>

                <button type="submit" className="login__button" style={{color:"black"}}>Login</button>

                <p className="login__register">
                    Don t have an account? <Link to="/signup">Register</Link>
                    <br />
                    <Link to="/home">Return to Home Page</Link>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
