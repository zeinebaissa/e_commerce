import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import back from '../assets/img.png'

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const valid = async (e) => {
        e.preventDefault(); // prevent the default form submission behavior

        try {
            // Send a request to your backend to validate the credentials
            const response = await fetch('http://localhost:5000/all-signin');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // Check if the username and password match the data fetched
            const user = data.find(user => user.username === username && user.password === password);

            if (user) {
                // If credentials are valid, navigate to the dashboard
                navigate('/admin/dashboard');
            } else {
                // If credentials are invalid, display an error message
                setError('Invalid username or password');
            }
        } catch (error) {
            // Handle fetch errors or other errors that occur during the process
            console.error('Error:', error);
            setError('An error occurred while processing your request');
        }
    };

    const styles = {
        signinContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            backgroundImage: `url(${back})`,
            backgroundSize: 'contain',
        },
        signinFormContainer: {
            width: '400px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#B8CBD0',
            //borderColor : 'black'
            border: '3px solid #93aeb5',
        },
        signinHeading: {
            marginBottom: '20px',
            color: '#333',
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
        },
        signinForm: {
            display: 'flex',
            flexDirection: 'column',
        },
        inputContainer: {
            marginBottom: '20px',
        },
        label: {
            color: '#000',
            marginBottom: '5px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        input: {
            width: '350px',
            padding: '10px',
            border: '2px solid #000',
            borderRadius: '5px',
        },
        homeLink: {
            color: 'blue',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'red 0.3s ease',
        },
        errorMessage: {
            color: 'red',
            marginTop: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.signinContainer}>
            <div style={styles.signinFormContainer}>
                <h2 style={styles.signinHeading}>Admin</h2>
                <form style={styles.signinForm} onSubmit={valid}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label} htmlFor="username">Username:</label><br />
                        <input style={styles.input} type="text" id="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label} htmlFor="password">Password:</label><br />
                        <input style={styles.input} type="password" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit">Sign In</button>
                </form>
                {error && <div style={styles.errorMessage}>{error}</div>}
                <br />
                <Link className="text-blue-800 hover:text-green-700 font-bold" to={"/home"}>Return to Home Page</Link>
            </div>
        </div>
    );
};

export default Signin;
