import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [passwordClasses, setPasswordClasses] = useState("input-field password-initial");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/signin/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error.message));
    }, [id]);

    const handleFocus = () => {
        setPasswordClasses("input-field password-typed");
    };

    const handleChange = (e) => {
        if (e.target.value === "") {
            setPasswordClasses("input-field password-initial");
        } else {
            setPasswordClasses("input-field password-typed");
        }
    };

    const Change = (e) => {
        e.preventDefault();
        const form = e.target;
        const OldPassword = form.oldPassword.value;
        const NewPassword = form.newPassword.value;
        const ConfirmPassword = form.confirmPassword.value;

        // Validate if new password matches confirm password
        if (NewPassword !== ConfirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        // Validate if old password matches the one retrieved from the server
        if (OldPassword !== userData.password) {
            alert("Old password is incorrect.");
            return;
        }

        const userOBJ = { username: userData.username, password: NewPassword };

        fetch(`http://localhost:5000/update-signin/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userOBJ)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Password changed successfully");
                form.reset();
                navigate(`/admin/dashboard/change-password/${id}`)
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error changing password');
            });
    }
    const styles = {
        input: {
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
    
        }
      }

    return (
        
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Change Password</h2>
            <form onSubmit={Change} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                <div>
                    <label htmlFor="UserName" className="mb-2">Username</label><br/>
                    <input type="text" name="username" id="UserName" value={userData.username} disabled  style={styles.input} />
                </div>
                <div>
                    <label htmlFor="Password" className="mb-2">Old Password   </label>
                    <input type="password" name="oldPassword" id="Password" className={passwordClasses} onFocus={handleFocus} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="NewPassword" className="mb-2">New Password   </label>
                    <input type="password" name="newPassword" id="NewPassword" className={passwordClasses} onFocus={handleFocus} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ConfirmPassword" className="mb-2">Confirm Password   </label>
                    <input type="password" name="confirmPassword" id="ConfirmPassword" className={passwordClasses} onFocus={handleFocus} onChange={handleChange} />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Change Password</button>
            </form>

            {/* Ajoutez le CSS inline ici */}
            <style>
                {`
                    .input-field {
                        border: 1px solid #ccc;
                        padding: 8px;
                        transition: border-color 0.3s ease;
                    }

                    .input-field:focus {
                        border-color: black;
                    }

                    .password-initial {
                        color: #999;
                    }

                    .password-typed {
                        color: black;
                    }
                `}
            </style>
        </div>
    );
}

export default ChangePassword;
