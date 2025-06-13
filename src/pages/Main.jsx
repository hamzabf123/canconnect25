// CleanDesign.jsx
import '../styles/Main.css';
import sba3 from '../assets/lion1.png';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  const handleClick = (role) => {
    navigate('/login', { state: { userType: role } });
  };

  return (


    <div className="clean-design-container">


      <nav className="navbar">


        <div className="can">
          <span>CanConnect</span>•<span>25</span>

        </div>


        <div className="nav-buttons">
          <button className="nav-button"
            onClick={() => handleClick('fan')} >FAN
          </button>
          <button className="nav-button"
            onClick={() => handleClick('vol')} >VOLONTAIRE   
          </button>
          <button className="nav-button" 
            onClick={() => handleClick('org')} >ORGANISATEURE 
          </button>
        </div>      
      </nav>
     


      <main className="main-content">


        <div className="titre-section">


          <h1 className="titre">
            <div className="titre-line">UNLEASH</div>
            <div className="titre-line titre-indented">THE LION</div>
            <div className="titre-line titre-more-indented">WITHIN</div>
          </h1>
          <p className="description">
            Be a part of the most exciting event of the year! Join us for a day filled with fun, excitement, and unforgettable experiences. Whether you're a fan, volunteer, or organizer, there's something for everyone
          </p>
        </div>
        <div className="image-placeholder">
          <img src={sba3} alt="Logo" className="sba3" />
        </div>    
      </main>
    </div>
  );
}

export default Main;