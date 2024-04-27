import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import del from "../assets/delete.png";

const ManageReview = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-reviews')
      .then(res => res.json())
      .then(data => setAllReviews(data));
  }, [allReviews]); // Ajoutez allReviews comme dépendance

  const handleDelete = (id, approved) => {
    console.log(id);
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
  if (confirmDelete) {
    fetch(`http://localhost:5000/delete-review/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        alert('Review deleted successfully !');
        console.log(data);
        if (approved) {
          fetch(`http://localhost:5000/update-review/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ approved: true }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json()).then(data => {
            console.log('Review updated:', data);
            setAllReviews(allReviews.map(review => 
              review._id === id ? { ...review, approved: true } : review
            ));
          });
        } else {
          setAllReviews(allReviews.filter(review => review._id !== id));
        }
      });
    }
  };

  const handleCheckboxChange = (id, checked) => {
    const reviewToUpdate = allReviews.find(review => review._id === id);
    if (!reviewToUpdate) return;
  
    fetch(`http://localhost:5000/update-review/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ 
        approved: checked,
        writer: reviewToUpdate.writer, 
        comment: reviewToUpdate.comment 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      console.log('Review updated:', data);
      setAllReviews(allReviews.map(review => 
        review._id === id ? { ...review, approved: checked } : review
      ));
    });
  };
  

  return (
    <div className="px-4 my-12" style={{color:"black"}}>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Review</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
        <Table.HeadCell className="text-center">Approve</Table.HeadCell>
          <Table.HeadCell className="text-center">Writer</Table.HeadCell>
          <Table.HeadCell className="text-center">Comment</Table.HeadCell>
          <Table.HeadCell className="text-center">Action</Table.HeadCell>
          
        </Table.Head>
        {allReviews.map((review,index) => (
          <Table.Body key={review._id} className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
            <Table.Row className="dark:border-gray-700">
            <Table.Cell className="text-center">
                <input
                  type="checkbox"
                  checked={review.approved}
                  onChange={(e) => handleCheckboxChange(review._id, e.target.checked)}
                />
              </Table.Cell>
              <Table.Cell className="text-center">{review.writer}</Table.Cell>
              <Table.Cell className="text-center">{review.comment}</Table.Cell>
              <Table.Cell className="flex justify-center">
                <button onClick={() => handleDelete(review._id, review.approved)}>
                  <img src={del} alt="delete" className="w-6 h-6 mr-3" />
                </button>
              </Table.Cell>
              
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default ManageReview;
