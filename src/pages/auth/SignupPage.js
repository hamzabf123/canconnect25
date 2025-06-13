import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPersonalInfo from '../../components/auth/SignupPersonalInfo';
import SignupProfessionalInfo from '../../components/auth/SignupProfessionalInfo';
import SignupAccountInfo from '../../components/auth/SignupAccountInfo';
import LionMascot from '../../assets/images/LionMascot';
import '../../styles/auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    phoneNumber: '',
    address: '',
    emergencyContact: '',

    // Informations professionnelles
    educationLevel: '',
    currentOccupation: '',
    languagesSpoken: '',
    relevantSkills: '',
    availabilityAFCAN: '',

    // Informations du compte
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  // Passer à l'étape suivante
  const nextStep = () => {
    setStep(step + 1);
  };

  // Revenir à l'étape précédente
  const prevStep = () => {
    setStep(step - 1);
  };

  // Afficher le composant correspondant à l'étape actuelle
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SignupPersonalInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <SignupProfessionalInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <SignupAccountInfo
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="signup-header">
            <h2>SIGN UP</h2>
            <div className="signup-steps">
              <div
                className={`step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
                onClick={() => step > 1 && setStep(1)}
              >
                Personal Info
              </div>
              <div
                className={`step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}
                onClick={() => step > 2 && setStep(2)}
              >
                Professional Info
              </div>
              <div
                className={`step ${step === 3 ? 'active' : ''}`}
              >
                Account Info
              </div>
            </div>
          </div>
          {renderStep()}
          <div className="login-link">
            Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
          </div>
        </div>
        <div className='auth-image-section-signup'>
          <LionMascot />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
