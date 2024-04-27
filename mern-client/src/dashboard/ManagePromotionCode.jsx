import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import del from "../assets/delete.png";
import edit from "../assets/edit.png";

const ManagePromotionCode = () => {
  const [allPromotionCode, setAllPromotionCode] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-promos')
      .then(res => res.json())
      .then(data => setAllPromotionCode(data))
  }, []);

  // delete a PromotionCode
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this promotion code?");
  if (confirmDelete) {
    fetch(`http://localhost:5000/delete-promo/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        alert('PromotionCode deleted successfully!');
        
        setAllPromotionCode(allPromotionCode.filter(PromotionCode => PromotionCode._id !== id));
      })
      .catch(error => console.error('Error deleting PromotionCode:', error));
    }
  };

  return (
    <div className="px-4 my-12" style={{color:"black"}}>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Promotion Code</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>Promotion Code</Table.HeadCell>
          <Table.HeadCell>Percentage</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {allPromotionCode.map((PromotionCode, index) => (
          <Table.Body className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={PromotionCode._id}>
            <Table.Row className="dark:border-gray-700">
              <Table.Cell>{PromotionCode.promotioncode}</Table.Cell>
              <Table.Cell>{PromotionCode.percentage}</Table.Cell>
              <Table.Cell className="flex justify-center">
                <Link to={`/admin/dashboard/edit-promotion-code/${PromotionCode._id}`}>
                  <img src={edit} className="w-6 h-6 mr-3" alt="Edit" />
                </Link>
                <button onClick={() => handleDelete(PromotionCode._id)}>
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

export default ManagePromotionCode;
