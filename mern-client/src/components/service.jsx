import { useEffect, useState } from "react";
import { Card } from 'flowbite-react';
import './service.css';

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-services')
      .then(res => res.json())
      .then(data => setServices(data))
  }, []);

  return (
    <div className="service-container">
      <h2 className="service-title">Discover Our Services</h2>
      <div className="service-list">
        {services.map(service => (
          <div key={service.id} className="service-item">
            <h3 className="service-item-title">{service.name}</h3>
            <Card>
              <p>{service.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
