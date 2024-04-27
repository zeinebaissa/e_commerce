import { Link } from 'react-router-dom';
import loginBg from './assets/img/login-bg.jpg';
import './assets/css/styles.css'

const clientSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const clientOBJ = { name, email, password };
    console.log(clientOBJ);

    fetch("http://localhost:5000/upload-client", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clientOBJ)
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            alert("Welcome to our store !");
            window.location.href = '/information';
            form.reset();

        })
        .catch(error => {
            console.error('Erreur:', error);

        });
};


function SignUp() {
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
                    Already have an account? <Link to="/signin">Register</Link>
                    <br />
                    <Link to="/home">Return to Home Page</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
