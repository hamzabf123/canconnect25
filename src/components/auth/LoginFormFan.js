import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth.css';

const LoginFormFan = () => {
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errors, setErrors] = useState({}); // Missing errors state
  const [isLoading, setIsLoading] = useState(false); // Missing isLoading state
  const navigate = useNavigate();

  
 
  //HANDLE SUBMIT-----------------------------------------------
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    const newErrors = {};
    if (!login.trim()) newErrors.username = "Username is required";
    if (!passwd.trim()) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    const userData = {
      login: login,
      passwrd: passwd // Note: This is misspelled as "passwrd" in the API request
    };

    
    const jsonData = JSON.stringify(userData);
    axios.post('http://localhost:8080/canconnect25/api/auth_fan', jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const fan=response.data;
        if(fan.login!=null){
            localStorage.setItem('fan', JSON.stringify(fan));
            navigate('/homepage');
        }else{
            navigate('/login');
            setMessage("login ou password incorrect!")
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Oops!', error);
        setErrors({ form: "Une erreur s'est produite. Veuillez réessayer." });
      });
  };
  
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    // Clear error when typing
    if (errors.username) {
      setErrors({...errors, username: null});
    }
  };
  
  const handlePasswdChange = (e) => {
    setPasswd(e.target.value);
    // Clear error when typing
    if (errors.password) {
      setErrors({...errors, password: null});
    }
  };
  
  
  
  return (
    <div className="login-form-container">
      <h2>Fan Space</h2>
     
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <div className="input-container">
            <i className="icon-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={login}
              onChange={handleLoginChange}
              className={errors.username ? 'error' : ''}
            />
          </div>
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
       
        <div className="form-group">
          <div className="input-container">
            <i className="icon-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={passwd}
              onChange={handlePasswdChange}
              className={errors.password ? 'error' : ''}
            />
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
       
        {errors.form && <div className="form-error">{errors.form}</div>}
        {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
       
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Connexion...' : 'Login Now'}
        </button>
      </form>
     
      

    </div>
    
  );
};

export default LoginFormFan;