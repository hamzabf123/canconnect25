import React, { useState } from 'react';
import '../../styles/auth.css';

const SignupProfessionalInfo = ({ formData, setFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.educationLevel.trim()) {
      newErrors.educationLevel = "Le niveau d'éducation est requis";
    }
    
    if (!formData.currentOccupation.trim()) {
      newErrors.currentOccupation = "L'occupation actuelle est requise";
    }
    
    if (!formData.languagesSpoken.trim()) {
      newErrors.languagesSpoken = "Les langues parlées sont requises";
    }
    
    if (!formData.relevantSkills.trim()) {
      newErrors.relevantSkills = "Les compétences pertinentes sont requises";
    }
    
    if (!formData.availabilityAFCAN.trim()) {
      newErrors.availabilityAFCAN = "La disponibilité pendant AFCAN 2025 est requise";
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
    <i className="icon-education"></i>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className={errors.educationLevel ? 'error' : ''}
          >
            <option value="">Sélectionnez votre niveau</option>
            <option value="high_school">Lycée</option>
            <option value="bachelor">Licence</option>
            <option value="master">Master</option>
            <option value="phd">Doctorat</option>
          </select>
        </div>
        {errors.educationLevel && <span className="errormessage">{errors.educationLevel}</span>}
      </div>

      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-work"></i>
          <input
            type="text"
            name="currentOccupation"
            placeholder="Current Occupation"
            value={formData.currentOccupation}
            onChange={handleChange}
            className={errors.currentOccupation ? 'error' : ''}
          />
        </div>
        {errors.currentOccupation && <span className="error-message">{errors.currentOccupation}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-language"></i>
          <input
            type="text"
            name="languagesSpoken"
            placeholder="Languages Spoken"
            value={formData.languagesSpoken}
            onChange={handleChange}
            className={errors.languagesSpoken ? 'error' : ''}
          />
        </div>
        {errors.languagesSpoken && <span className="error-message">{errors.languagesSpoken}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-skills"></i>
          <input
            type="text"
            name="relevantSkills"
            placeholder="Relevant Skills"
            value={formData.relevantSkills}
            onChange={handleChange}
            className={errors.relevantSkills ? 'error' : ''}
          />
        </div>
        {errors.relevantSkills && <span className="error-message">{errors.relevantSkills}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-calendar"></i>
          <select
            name="availabilityAFCAN"
            value={formData.availabilityAFCAN}
            onChange={handleChange}
            className={errors.availabilityAFCAN ? 'error' : ''}
          >
            <option value="">Select your availability</option>
            <option value="fulltime">Full-time throughout the tournament</option>
            <option value="specific_date">Specific date only</option>
            <option value="weekend_only">Weekend only</option>
            <option value="part_time">Part-time</option>
          </select>
        </div>
        {errors.availabilityAFCAN && <span className="error-message">{errors.availabilityAFCAN}</span>}
      </div>
      
      <div className="buttons-container">
        <button type="button" className="back-button" onClick={prevStep}>Back</button>
        <button type="submit" className="login-button">Next</button>
      </div>
    </form>
  );
};

export default SignupProfessionalInfo;
