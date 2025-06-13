import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar3 from "../components/auth/Sidebar3"; // Ajout de l'import

function FanProfile() {
  const fan = JSON.parse(localStorage.getItem('fan'));
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!fan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aucun fan connecté</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar3 />
      <div style={{ flex: 1 }}>
        <div className="volunteer-profile">
          {/* Header section */}
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {fan.login ? fan.login[0].toUpperCase() : "F"}
              </div>
            </div>
            <div className="profile-name-container">
              <h1 className="profile-name">{fan.login}</h1>
            </div>
            <div className="profile-actions">
              <button
                className="profile-info-button"
                onClick={() => setShowInfoModal(true)}
              >
                <i className="info-icon">ℹ</i> Plus d'info
              </button>
            </div>
          </div>

          {/* Account Info Modal */}
          {showInfoModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Informations du compte</h2>
                  <button className="modal-close" onClick={() => setShowInfoModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="info-row">
                    <div className="info-label">LOGIN</div>
                    <div className="info-value">{fan.login}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">MOT DE PASSE</div>
                    <div className="info-value">{fan.passwrd}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">EMAIL</div>
                    <div className="info-value">{fan.email}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">TÉLÉPHONE</div>
                    <div className="info-value">{fan.phone}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">DATE DE NAISSANCE</div>
                    <div className="info-value">{fan.date_naiss}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FanProfile;