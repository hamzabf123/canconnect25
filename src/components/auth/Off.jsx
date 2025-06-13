import React from 'react';

import '../../styles/mainpage.css';


    function  Off (){
    return (
      <div className="deconnecte">
        <h1>Déconnexion</h1>
        <p>Vous êtes déconnecté.</p>
        <button 
          onClick={() => {
            // Simuler une déconnexion
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
        >
          Se déconnecter
        </button>
      </div>
    );
  }
export default Off;