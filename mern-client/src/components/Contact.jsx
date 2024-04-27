// Import des modules nécessaires
//import React from 'react';
import "./contact.css";

// Fonction pour gérer la soumission du formulaire
const clientSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const number = form.number.value;
  const email = form.email.value;
  const comment = form.comment.value;

  const clientOBJ = { name, number, email, comment };
  console.log(clientOBJ);

  // Envoi des données du formulaire au serveur
  fetch("http://localhost:5000/upload-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clientOBJ)
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Contact Form submitted successfully");
      form.reset(); // Réinitialisation du formulaire après soumission
    })
    .catch(error => {
      console.error('Erreur:', error);
      // Gestion de l'erreur, afficher une alerte ou un retour à l'utilisateur
    });
};

// Composant Contact
const Contact = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="h2">Contact Form</h2>
        <form onSubmit={clientSubmit}>
          {/* Champs du formulaire */}
          <div className="form-group">
            <label htmlFor="name" className="label">Name:</label><br />
            <input type="text" id="name" name="name" required className="saisie"/>
          </div>

          <div className="form-group">
            <label htmlFor="number" className="label">Phone Number:</label><br />
            <input type="tel" id="number" name="number" required className="saisie"/>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="label">Email Address:</label><br />
            <input type="email" id="email" name="email" required className="saisie" />
          </div>

          <div className="form-group">
            <label htmlFor="comment" className="label">Comment:</label><br />
            <textarea id="comment" name="comment" rows="4" cols="50" required className="saisie te"></textarea>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="submit-button">Contact us</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
