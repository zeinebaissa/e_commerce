import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import del from "../assets/delete.png";
import edit from "../assets/edit.png";

const ManageArticles = () => {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-articles')
      .then(res => res.json())
      .then(data => setAllArticles(data))
  }, []);

  //delete a car
  const handleDelete = (id) => {

    console.log(id);
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (confirmDelete) {
    fetch(`http://localhost:5000/delete-article/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        alert('Article deleted successfully !');
        console.log(data);
        //setAllCars(data);
        setAllArticles(allArticles.filter(car => car._id !== id));
      });
    }
  };

  return (
    <div className="px-4 my-12" style={{color:"black"}}>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Articles</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Gategory</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>
            Action
          </Table.HeadCell>
        </Table.Head>
        {allArticles.map((article, index) => (
          <Table.Body className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={article._id}>
            <Table.Row className="dark:border-gray-700">
              <Table.Cell>{article.name}</Table.Cell>
              <Table.Cell>{article.category}</Table.Cell>
              <Table.Cell>{article.price}</Table.Cell>
              <Table.Cell>{article.color}</Table.Cell>
              <Table.Cell>{article.description}</Table.Cell>
              <Table.Cell><img src={article.image_url} alt="" className="" style={{width:"100px",height:"100px"}}/></Table.Cell>
              <Table.Cell className="flex justify-center items-center space-x-1">
                <Link to={`/admin/dashboard/edit-cars/${article._id}`} ><img src={edit} className="w-6 h-6 mr-3"  /> </Link>
                <button onClick={() => handleDelete(article._id)} ><img src={del} className="w-6 h-6 mr-3" /></button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default ManageArticles;
