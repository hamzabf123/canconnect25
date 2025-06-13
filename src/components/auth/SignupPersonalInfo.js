import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const SignupPersonalInfo = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "La date de naissance est requise";
    }
    
    if (!formData.nationality.trim()) {
      newErrors.nationality = "La nationalité est requise";
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Le numéro de téléphone est requis";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Le contact d'urgence est requis";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <div className="input-container">
          <i className="icon-user"></i>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
        </div>
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-user"></i>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
        </div>
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-calendar"></i>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="dd/mm/year"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'error' : ''}
          />
        </div>
        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
      </div>
      <div className="form-group">
  <div className="input-container">
    <i className="icon-globe"></i>
    <select
      name="nationality"  
      value={formData.nationality}
      onChange={handleChange}
      className={errors.nationality ? 'error nationality-select' : 'nationality-select'}
    >
       <option value="" disabled>Select your City</option>
      <option value="casablanca">Casablanca</option>
  <option value="rabat">Rabat</option>
  <option value="marrakech">Marrakech</option>
  <option value="fes">Fès</option>
  <option value="tangier">Tanger</option>
  <option value="agadir">Agadir</option>
  <option value="meknes">Meknès</option>
  <option value="oujda">Oujda</option>
  <option value="nador">Nador</option>
  <option value="tetouan">Tétouan</option>
  <option value="kenitra">Kénitra</option>
  <option value="safi">Safi</option>
  <option value="eljadida">El Jadida</option>
  <option value="laayoune">Laâyoune</option>
  <option value="dakhla">Dakhla</option>
    </select>
  </div>
  {errors.nationality && <span className="error-message">{errors.nationality}</span>}
</div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-phone"></i>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? 'error' : ''}
             pattern="[+]{0,1}[0-9]{10,15}"
          />
        </div>
        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-home"></i>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
          />
        </div>
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-emergency"></i>
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency number"
            value={formData.emergencyContact}
            onChange={handleChange}
            className={errors.emergencyContact ? 'error' : ''}
          />
        </div>
        {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
      </div>
      
      <button type="submit" className="login-button">Next</button>
    </form>
  );
};

export default SignupPersonalInfo;
