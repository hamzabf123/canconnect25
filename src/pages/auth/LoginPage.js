import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import LoginFormOrg from '../../components/auth/LoginFormOrg';
import LionMascot from '../../assets/images/LionMascot';
import '../../styles/auth.css';
import { useLocation } from 'react-router-dom';
import LoginFormFan from '../../components/auth/LoginFormFan';

const LoginPage = () => {
  const location = useLocation();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const stateUserType = location.state?.userType;

    if (stateUserType) {
      localStorage.setItem('userType', stateUserType);
      setUserType(stateUserType);
    } else {
      const storedUserType = localStorage.getItem('userType');
      if (storedUserType && storedUserType !== 'undefined') {
        setUserType(storedUserType);
      }
    }
  }, [location.state]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-section">
          {userType === 'vol' && <LoginForm />}
          {userType === 'org' && <LoginFormOrg />}
          {userType === 'fan' && <LoginFormFan/>}
          {!userType && <p style={{ color: 'red' }}>Type d'utilisateur non spécifié.</p>}
        </div>
        <div className="auth-image-section-login">
          <LionMascot />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
