import Card from './Card.jsx';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Lostitems.css'; // <-- Ajoute cette ligne
import Sidebar2 from '../components/auth/Sidebar2.jsx';

function Lost() {
  const navigate = useNavigate();
  const [Items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    navigate('/moul_golssa');
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/canconnect25/api/list_items');
      setItems(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des événements');
      console.error(err);
    }
  };
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="lost-main-bg">
      <Sidebar2 />
      <div className="lost-content">
        <div className="lost-inner">
          {/* Bouton placé ici */}
          <button
            className="lost-add-btn"
            onClick={handleClick}
          >
            add items
          </button>
          <div className="lost-grid">
            {Items.map(product => (
              <Card
                key={product.id}
                id={product.id}
                date={product.date_enregistrement}
                title={product.title}
                image_url={product.image_url}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lost;