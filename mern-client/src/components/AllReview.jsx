import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './comment.css';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const reviewSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const writer = form.writer.value;
  const comment = form.comment.value;

  const clientOBJ = { writer, comment, approved: false }; // Ajout de la propriété 'approved'
  console.log(clientOBJ);
  fetch("http://localhost:5000/upload-review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clientOBJ)
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Your review has been sent successfully");
      form.reset(); // Réinitialiser le formulaire après une soumission réussie
    })
    .catch(error => {
      console.error('Error:', error);
      // Gérer l'erreur, afficher une alerte ou un retour à l'utilisateur
    });
};

const AllReview = ({ headline, reviews }) => {
  const [approvedReviews, setApprovedReviews] = useState([]);

  useEffect(() => {
    // Filtrer les critiques approuvées
    const filteredReviews = reviews.filter(review => review.approved === true);
    setApprovedReviews(filteredReviews);
  }, [reviews]);

  return (
    <div>
      <h2 className="text-4xl font-extrabold text-center font-bold my-5" style={{color:"black"}} >{headline}</h2>

      <div className="swiper-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {approvedReviews.map(review => (
            <SwiperSlide key={review._id} className="swiper-slide">
              <Link to={``}>
                <div className="swiper-slide-content">
                  <h3 style={{color:"black"}}>{review.writer}</h3>
                  <p>{review.comment}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="comment-container">
        <h4 style={{color:"black"}}>If you want to leave a review</h4>
        <form onSubmit={reviewSubmit}>
          <input type="text" placeholder="Your name" id='writer' required className="input-field" />
          <textarea placeholder="Your Review" id='comment' required className="textarea-field" />
          <input type="submit" value="Add Your Review" className="submit-button" />
        </form>
      </div>
    </div>
  )
}

export default AllReview;
