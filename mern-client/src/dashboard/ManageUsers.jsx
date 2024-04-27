import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import del from "../assets/delete.png";
import edit from "../assets/edit.png";

const ManageUsers = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-clients')
      .then(res => res.json())
      .then(data => setAllUser(data))
  }, []);

  // delete a User
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this User?");
  if (confirmDelete) {
    fetch(`http://localhost:5000/delete-client/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        alert('User deleted successfully!');
        
        setAllUser(allUser.filter(User => User._id !== id));
      })
      .catch(error => console.error('Error deleting User:', error));
    }
  };

  return (
    <div className="px-4 my-12" style={{color:"black"}}>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Users</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>UserName</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {allUser.map((User, index) => (
          <Table.Body className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={User._id}>
            <Table.Row className="dark:border-gray-700">
              <Table.Cell>{User.name}</Table.Cell>
              <Table.Cell>{User.email}</Table.Cell>
                <Table.Cell>{User.password}</Table.Cell>
              <Table.Cell className="flex justify-center">
                <Link to={`/admin/dashboard/edit-user/${User._id}`}>
                  <img src={edit} className="w-6 h-6 mr-3" alt="Edit" />
                </Link>
                <button onClick={() => handleDelete(User._id)}>
                  <img src={del} className="w-6 h-6" alt="Delete" />
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default ManageUsers;
