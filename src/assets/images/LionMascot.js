import React from 'react';
import lionImage from './lion11.png'; // Replace with the actual path to your .png file
import '../../styles/auth.css';









const LionMascot = () => {
  return (
    <div className='cadrelion'>
      <div className='textmascot'>
     <h1>ENTER YOUR </h1>
     <h1>CANCONNECT25</h1> 
      <h1>SPACE</h1>
      </div>
    <img className='lion'
      src={lionImage} 
      alt="Lion Mascot" 
      style={{ width: '100%', height: '100%', zIndex: 7,}} // Adjust size as needed
    />
    </div>
  );
};

export default LionMascot;

