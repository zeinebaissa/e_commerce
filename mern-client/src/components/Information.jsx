import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Information() {
  const [client, setClient] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/client/${id}`)
      .then(response => response.json())
      .then(data => setClient(data))
      .catch(error => console.error('Error fetching client data:', error));
  }, [id]);

  const handleEdit = () => {
    window.location.href = `/edit-info/${id}`;
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/delete-client/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Account deleted successfully');
        // Redirect to home page or any other page after deletion
        window.location.href = '/home';
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Client Information</h1>
      </div>
      <div style={styles.details}>
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
      </div>
      <div style={styles.actions}>
        <button style={styles.buttonEdit} onClick={handleEdit}>Edit</button>
        <button style={styles.buttonDelete} onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    color:'black'
  },
  header: {
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
  },
  details: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonEdit: {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonDelete: {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Information;
