//import React from "react";
import about from "../assets/forher.png";
import "./About.css"; // Assurez-vous d'importer votre fichier CSS pour le style

const About = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src={about} alt="banner" />
      </div>

      <div className="about-text">
        <h2>About Our STORE </h2>
        <br />
        <p>
        Welcome to FOR HER, where we celebrate the beauty, diversity, and empowerment of voluptuous women through fashion.
        </p>
        <p>
        At FOR HER, we believe that every body deserves to feel confident, stylish, and comfortable in what they wear. We understand the struggle of finding trendy and flattering clothing options for voluptuous figures, which is why we have curated a collection that embraces curves and celebrates individuality.
        </p>
        <p>
        But FOR HER is more than just a clothing store. We are a community—a place where women of all shapes and sizes come together to support and uplift each other. Whether you are seeking fashion advice, sharing style tips, or simply looking for a friendly and inclusive space to connect with like-minded individuals, you will find it here.
        </p>
        <p>
        So, join us on this journey of self-love and self-expression. Discover the joy of shopping for clothes that not only fit well but also make you feel incredible. Because when you look good, you feel good, and there is nothing more beautiful than confidence.
        </p>
        <p>
        Thank you for choosing FOR HER. Here is to embracing your curves and owning your style!


        </p>
      </div>
    </div>
  );
};

export default About;
