import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const SignupAccountInfo = ({ formData, setFormData, prevStep, submitForm }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = "La confirmation d'email est requise";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Les emails ne correspondent pas";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
      } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une majuscule";
      } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins un chiffre";
      } 
      
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulation d'appel API - à remplacer par un vrai appel axios
        console.log('Données d\'inscription complètes:', formData);
        
        // Simuler un délai de réponse
        setTimeout(() => {
          console.log('Inscription réussie');
          // Rediriger vers la page de connexion après inscription
          navigate('/login');
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Erreur d\'inscription:', error);
        setErrors({
          ...errors,
          form: "Échec de l'inscription. Veuillez réessayer."
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <div className="input-container">
          <i className="icon-user"></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
        </div>
        {errors.username && <span className="error-message">{errors.username}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-email"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
        </div>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-email"></i>
          <input
            type="email"
            name="confirmEmail"
            placeholder="Confirm Email"
            value={formData.confirmEmail}
            onChange={handleChange}
            className={errors.confirmEmail ? 'error' : ''}
          />
        </div>
        {errors.confirmEmail && <span className="error-message">{errors.confirmEmail}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
        </div>
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-lock"></i>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
        </div>
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      
      {errors.form && <div className="form-error">{errors.form}</div>}
      
      <div className="buttons-container">
        <button type="button" className="back-button" onClick={prevStep}>Back</button>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Inscription...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default SignupAccountInfo;
