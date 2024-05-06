import { useState, useEffect } from "react";
import styled from "styled-components";

const Basket = () => {
  const [products, setProducts] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // State to hold the discount amount
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
    comments: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/all-basket")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching basket:", error));
  }, []);

  const removeProduct = (productId) => {
    fetch(`http://localhost:5000/delete-basket/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          const updatedProducts = products.filter(product => product._id !== productId);
          setProducts(updatedProducts);
          console.log('Product removed successfully.');
        } else {
          console.error('Failed to remove product:', res.statusText);
        }
      })
      .catch((error) => console.error('Error removing product:', error));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    const updatedProducts = products.map(product => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const totalPrice = products.reduce((acc, product) => {
    const productPrice = parseFloat(product.price);
    return acc + (isNaN(productPrice) ? 0 : productPrice * product.quantity);
  }, 0);

  // Calculate total price after applying discount
  const totalPriceAfterDiscount = totalPrice - discount;

  const applyPromoCode = (e) => {
    e.preventDefault(); // Prevent form submission
  
    fetch("http://localhost:5000/all-promos")
      .then((res) => res.json())
      .then((promoCodes) => {
        const matchedPromoCode = promoCodes.find((promo) => promo.promotioncode === promoCode);
        if (matchedPromoCode) {
          const discountPercentage = matchedPromoCode.percentage;
          const discountAmount = (totalPrice * discountPercentage) / 100;
          setDiscount(discountAmount);
          console.log(`Promo code "${promoCode}" applied. Discount: ${discountAmount} Dt`);
        } else {
          setDiscount(0);
          console.log("Invalid promo code.");
          alert("Invalid promo code.");
        }
      })
      .catch((error) => console.error("Error applying promo code:", error));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Create order object
    const order = {
      customerName: formData.name,
      phoneNumber: formData.number,
      address: formData.address,
      comments: formData.comments,
      products: products.map(product => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
        size: product.size
      })),
      totalPrice: totalPriceAfterDiscount
    };
  
    // Send order data to the server
    fetch("http://localhost:5000/upload-order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order) // Convert order object to JSON string
    })
    .then((res) => {
      if (res.ok) {
        // Order uploaded successfully
        alert('Order uploaded successfully.');
        

        // Clear the basket on the client side
        setProducts([]);
        // Optionally, you can clear the form here
        setFormData({
          name: "",
          number: "",
          address: "",
          comments: ""
        });
        // Reset the discount
        setDiscount(0);
        // Clear the basket on the server side
        clearBasketOnServer();
        

      } else {
        // If the server responds with an error status, log the error
        console.error('Failed to upload order:', res.statusText);
      }
    })
    .catch((error) => {
      // If an error occurs during the fetch request (e.g., network error), log the error
      console.error('Error uploading order:', error);
    });
  };
  
  const clearBasketOnServer = () => {
    fetch("http://localhost:5000/delete-basket", {
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        console.log('Basket cleared on the server side.');
      } else {
        console.error('Failed to clear basket on the server side:', res.statusText);
      }
    })
    .catch((error) => {
      console.error('Error clearing basket on the server side:', error);
    });
  };
  
  const Container = styled.div`
    max-width: 800px;
    margin: 120px auto; 
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;

  const PromoCodeForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  `;

  const PromoCodeInput = styled.input`
    width: 300px; /* Adjust the width as needed */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 16px;
  `;

  const ApplyPromoCodeButton = styled.button`
    padding: 10px 20px;
    background-color: #D20062;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;

    &:hover {
      background-color:#FF204E;
    }
  `;

  const ProductCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  `;

  const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
  `;

  const ProductInfo = styled.div`
    flex: 1;
  `;

  const ProductName = styled.h3`
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  `;

  const ProductPrice = styled.p`
    font-size: 16px;
    color: #555;
  `;

  const QuantityInput = styled.input`
    width: 60px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  `;

  const RemoveButton = styled.button`
    background-color: transparent;
    border: none;
    color: #ff69b4;
    cursor: pointer;
    font-size: 16px;
  `;

  const BuyButton = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
    margin-top: 20px;

    &:hover {
      background-color:#45a049;
    }
  `;

  const TotalPrice = styled.h2`
    text-align: right;
    margin-top: 20px;
    font-size: 24px;
    color: #333;
  `;

  return (
    <Container style={{color:"black"}}>
      <h1>Your Basket</h1>
      
      {products.map((product) => (
        <ProductCard key={product._id}>
          <ProductImage src={product.image_url} alt={product.name} />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>Price: {isNaN(parseFloat(product.price)) ? 'N/A' : `${parseFloat(product.price).toFixed(2)}Dt`}</ProductPrice>
            <ProductPrice>
              Quantity:{" "}
              <QuantityInput
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => updateQuantity(product._id, parseInt(e.target.value))}
              />
            </ProductPrice>
          </ProductInfo>
          <RemoveButton onClick={() => removeProduct(product._id)}>Remove</RemoveButton>
        </ProductCard>
      ))}
      {products.length === 0 && <p>Your basket is empty.</p>}
      <TotalPrice>Total Price: {totalPriceAfterDiscount.toFixed(2)}Dt</TotalPrice>
      <PromoCodeForm onSubmit={applyPromoCode}>
        <PromoCodeInput
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          autoFocus // Ensure the input field is focused when the component mounts
        />
        <ApplyPromoCodeButton type="submit">Apply</ApplyPromoCodeButton>
      </PromoCodeForm>
      
      {/* New form for buying */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} required />
        <br/>
        <br/>
        <input type="text" name="number" placeholder="Phone Number" value={formData.number} onChange={handleFormChange} required />
        <br/>
        <br/>
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleFormChange} required />
        <br/>
        <br/>
        <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleFormChange}></textarea>
        <br/>
        <br/>
        <BuyButton type="submit">Buy</BuyButton>
      </form>
    </Container>
  );
};

export default Basket;
