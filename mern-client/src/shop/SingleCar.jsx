import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SingleCar = () => {
  // Call useLoaderData to get the data
  const { brand, model, price, year, mileage, color, description, image_url } = useLoaderData();

  // Styled components for styling
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #eaf6ff;
    height: 100vh;
  `;

  const CarDetails = styled.div`
    flex: 1;
    padding-right: 20px;
  `;

  const CarHeader = styled.div`
    margin-bottom: 20px;
    font-size: 24px;
  `;

  const CarDescription = styled.div`
    margin-bottom: 20px;
  `;

  const CarDetailsTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }

    td:first-child {
      font-weight: bold;
    }
  `;

  const CarImager = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const CarImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: 400px; /* Ajustez la largeur de l'image selon vos besoins */
    height: auto; /* Gardez la hauteur proportionnelle */
  `;
  const ContactButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background-color: green; /* Couleur de fond verte par défaut */
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s; /* Ajout de transition pour une animation en douceur */

    &:hover {
      background-color: darkgreen; /* Couleur de fond plus foncée au survol */
    }
  `;

  return (
    <Container>
      <CarDetails>
        <CarHeader>
          <h2>{brand}</h2>
          <div>{model} - {year}</div>
          <div>${price}</div>
        </CarHeader>
        <CarDescription>{description}</CarDescription>
        <ContactButton to={'/contact'}>Contact Us</ContactButton>
        <CarDetailsTable>
          <tbody>
            <tr>
              <td>Brand:</td>
              <td>{brand}</td>
            </tr>
            <tr>
              <td>Model:</td>
              <td>{model}</td>
            </tr>
            <tr>
              <td>Year:</td>
              <td>{year}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>${price}</td>
            </tr>
            <tr>
              <td>Mileage:</td>
              <td>{mileage}</td>
            </tr>
            <tr>
              <td>Color:</td>
              <td>{color}</td>
            </tr>
          </tbody>
        </CarDetailsTable>
      </CarDetails>
      <CarImager>
        <CarImage src={image_url} alt="" />
      </CarImager>
    </Container>
  );
};

export default SingleCar;
