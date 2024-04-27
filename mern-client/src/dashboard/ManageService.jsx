import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import del from "../assets/delete.png";
import edit from "../assets/edit.png";

const ManageService = () => {
  const [allService, setAllService] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-promos')
      .then(res => res.json())
      .then(data => setAllService(data))
  }, []);

  // delete a service
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this promotion code?");
  if (confirmDelete) {
    fetch(`http://localhost:5000/delete-promo/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        alert('Service deleted successfully!');
        
        setAllService(allService.filter(service => service._id !== id));
      })
      .catch(error => console.error('Error deleting service:', error));
    }
  };

  return (
    <div className="px-4 my-12" style={{color:"black"}}>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Promotion Code</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {allService.map((service, index) => (
          <Table.Body className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={service._id}>
            <Table.Row className="dark:border-gray-700">
              <Table.Cell>{service.promotioncode}</Table.Cell>
              <Table.Cell>{service.percentage}</Table.Cell>
              <Table.Cell className="flex justify-center">
                <Link to={`/admin/dashboard/edit-service/${service._id}`}>
                  <img src={edit} className="w-6 h-6 mr-3" alt="Edit" />
                </Link>
                <button onClick={() => handleDelete(service._id)}>
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

export default ManageService;
