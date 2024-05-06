import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import del from "../assets/delete.png";

const ManageOrder = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-orders')
      .then(res => res.json())
      .then(data => setAllOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  // delete an order
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/delete-order/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert('Order deleted successfully!');
        setAllOrders(allOrders.filter(order => order._id !== id));
      })
      .catch(error => console.error('Error deleting order:', error));
    }
  };

  return (
    <div className="px-4 my-12" style={{ color: "black" }}>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Orders</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>Customer Name</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Comments</Table.HeadCell>
          <Table.HeadCell>Products</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {allOrders.map((order, index) => (
          <Table.Body className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={order._id}>
            <Table.Row className="dark:border-gray-700">
              <Table.Cell>{order.customerName}</Table.Cell>
              <Table.Cell>{order.phoneNumber}</Table.Cell>
              <Table.Cell>{order.address}</Table.Cell>
              <Table.Cell>{order.comments}</Table.Cell>
              <Table.Cell>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      Name: {product.name}, Quantity: {product.quantity}, Size: {product.size}
                    </li>
                  ))}
                </ul>
              </Table.Cell>
              <Table.Cell>{order.totalPrice}</Table.Cell>
              <Table.Cell className="flex justify-center">
                <button onClick={() => handleDelete(order._id)}>
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

export default ManageOrder;
