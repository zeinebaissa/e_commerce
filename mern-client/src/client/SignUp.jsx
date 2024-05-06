import React from 'react';
import { Link } from 'react-router-dom';
import loginBg from './assets/img/login-bg.jpg';
import './assets/css/styles.css';

function SignUp() {
    const clientSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
    
        // Fetch all clients from the server
        try {
            const response = await fetch("http://localhost:5000/all-clients");
            if (!response.ok) {
                throw new Error('Failed to fetch client data');
            }
    
            const clients = await response.json();
    
            // Check if the email already exists
            const emailExists = clients.some(client => client.email === email);
            if (emailExists) {
                alert("Email already exists. Please use a different email.");
                return;
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
            return;
        }
    
        // If email doesn't exist, proceed to create the client
        const clientOBJ = { name, email, password };
        console.log(clientOBJ);
    
        try {
            const response = await fetch("http://localhost:5000/upload-client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clientOBJ)
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload client data');
            }
    
            const responseData = await response.json();
            console.log(responseData);
            alert("Welcome to our store !");
            
            // Redirect to information page with the client ID
            window.location.href = `/information/${responseData._id}`;
    
            form.reset();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="login">
            <img src={loginBg} alt="login image" className="login__img" />

            <form method="POST" className="login__form" onSubmit={clientSubmit}>
                <h1 className="login__title">Signup</h1>

                <div className="login__content">
                    <div className="login__box">
                        <i className="ri-user-3-line login__icon"></i>

                        <div className="login__box-input">
                            <input type="text" required className="login__input" id="name" name="name" placeholder=" " />
                            <label htmlFor="signup-name" className="login__label">Name</label>
                        </div>
                    </div>

                    <div className="login__box">
                        <i className="ri-mail-line login__icon"></i>

                        <div className="login__box-input">
                            <input type="email" required className="login__input" id="email" name="email" placeholder=" " />
                            <label htmlFor="signup-email" className="login__label">Email</label>
                        </div>
                    </div>

                    <div className="login__box">
                        <i className="ri-lock-2-line login__icon"></i>

                        <div className="login__box-input">
                            <input type="password" required className="login__input" id="password" name="password" placeholder=" " />
                            <label htmlFor="signup-pass" className="login__label">Password</label>
                            <i className="ri-eye-off-line login__eye" id="signup-eye"></i>
                        </div>
                    </div>
                </div>

                <button type="submit" className="login__button" style={{color:"black"}}>Signup</button>

                <p className="login__register">
                    Already have an account? <Link to="/signin">Sign In</Link>
                    <br />
                    <Link to="/home">Return to Home Page</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
