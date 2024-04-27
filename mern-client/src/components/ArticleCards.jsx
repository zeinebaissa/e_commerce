/* eslint-disable react/prop-types */
//import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
//import './carcards.css'

//import './styles.css';
// eslint-disable-next-line react/prop-types
const ArticleCards = ({ headline, articles }) => {
  return (
    <div className="car-cards-container">
      <h2 className="text-4xl font-extrabold text-center font-bold my-5">{headline}</h2>
      <div className="car-cards-swiper-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >

          
          {articles.map(article => (
            <SwiperSlide key={article._id}>
              <Link to={`/article/${article._id}`} className="car-card">
                <img src={article.image_url} alt={article.brand} className="car-card-image"  style={{width:"300px",height:"300px"}}/>
                <div className="car-card-content">
                  <h3 className="car-card-brand">{article.name}</h3>
                  <p className="car-card-price">{article.price}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ArticleCards;



