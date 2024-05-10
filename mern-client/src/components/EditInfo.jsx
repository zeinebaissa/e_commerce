import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const EditInfo = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rawPassword, setRawPassword] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/client/${id}`)
      .then(response => response.json())
      .then(data => {
        setFormData({ name: data.name, email: data.email, password: data.password });
        setRawPassword(data.password); // Set the raw password as well
      })
      .catch(error => console.error('Error fetching client data:', error));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (name === 'password') {
      setRawPassword(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:5000/update-client/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        alert('Client updated successfully:', data);
        window.location.href = `/information/${id}`;
      })
      .catch(error => console.error('Error updating client:', error));
  };

  const styles = {
    editInfoContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '150px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      color: 'black',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxSizing: 'border-box',
    },
    togglePasswordBtn: {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#007bff',
      textDecoration: 'underline',
    },
    saveBtn: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.editInfoContainer}>
      <h2>Edit Client Information</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={rawPassword}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <FaEye
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </FaEye>
        </div>
        <div style={styles.formGroup}>
          <button type="submit" style={styles.saveBtn}>Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
