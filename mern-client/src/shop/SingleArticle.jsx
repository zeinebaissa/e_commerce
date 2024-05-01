import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

const SingleArticle = () => {
  const { name, price, description, image_url } = useLoaderData();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const addToCart = (article) => {
    const articleWithQuantity = { ...article, quantity: 1 }; // Add quantity property to the article object
    fetch('http://localhost:5000/upload-basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleWithQuantity), // Send article with quantity
    })
    .then(response => {
      if (response.ok) {
        alert('Item added to cart successfully.');
        // Optionally, you can update the local state or UI to reflect the change
      } else {
        console.error('Failed to add item to cart.');
      }
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
    });
  };

  const handleAddToBasket = (event) => {
    event.preventDefault();
    if (!size) {
      alert("Please select a size.");
      return;
    }

    // Call the addToCart function instead of navigating directly
    addToCart({
      name,
      price,
      description,
      image_url,
      size,
      quantity: parseInt(quantity), // Convert quantity to integer
    });
  };

  const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 50px;
    background-color: #f7f7f7;
    min-height: 100vh;
    gap: 30px;
  `;

  const ArticleDetails = styled.div`
    flex: 1;
    color: #333;
  `;

  const ArticleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  `;

  const ArticleDescription = styled.p`
    margin-bottom: 20px;
    line-height: 1.5;
  `;

  const Form = styled.form`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const Label = styled.label`
    font-weight: bold;
  `;

  const Select = styled.select`
    width: 150px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    font-size: 16px;
  `;

  const QuantityInput = styled.input`
    width: 100px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    font-size: 16px;
  `;

  const ContactButton = styled.button`
    padding: 10px 20px;
    background-color: #D20062;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color:#FF204E;
    }
  `;

  const ArticleImage = styled.img`
    max-width: 100%;
    max-height: 400px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;

  return (
    <Container>
      <ArticleImage src={image_url} alt={name} />
      <ArticleDetails>
        <ArticleHeader>
          <div>{name}</div>
          <div>{price}Dt</div>
        </ArticleHeader>
        <ArticleDescription>{description}</ArticleDescription>
        <Form onSubmit={handleAddToBasket}>
          <Label htmlFor="size">Size:</Label>
          <Select id="size" name="size" value={size} onChange={handleSizeChange} required>
            <option value="">Select a size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
          <Label htmlFor="quantity">Quantity:</Label>
          <QuantityInput
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <ContactButton type="submit">Add to Basket</ContactButton>
        </Form>
      </ArticleDetails>
    </Container>
  );
};

export default SingleArticle;
