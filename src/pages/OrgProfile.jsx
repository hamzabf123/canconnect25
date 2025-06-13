import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar2 from "../components/auth/Sidebar2";

function OrgProfile() {
  const org = JSON.parse(localStorage.getItem('org'));
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/canconnect25/api/vols_par_org',
          org,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setVolunteers(response.data);
      } catch (err) {
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    };
    if (org) fetchVolunteers();
  }, [org]);

  if (!org) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aucun organisateur connecté</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar2 />
      <div className="volunteer-profile" style={{ flex: 1 }}>
        {/* Header section */}
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {org.login ? org.login[0].toUpperCase() : "O"}
            </div>
          </div>
          <div className="profile-name-container">
            <h1 className="profile-name">{org.login}</h1>
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

        {/* Liste des volontaires */}
        <div className="mt-8 flex flex-col items-center">
          <div className="bg-white rounded-xl shadow-lg px-10 py-8 max-w-xl w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Volontaires affectés</h2>
            {loading ? (
              <p className="text-gray-500 italic text-center">Chargement...</p>
            ) : volunteers.length === 0 ? (
              <p className="text-gray-500 italic text-center">Aucun volontaire affecté.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {volunteers.map(vol => (
                  <li
                    key={vol.id || vol.email}
                    className="flex items-center gap-4 py-4 hover:bg-gray-50 transition rounded-lg px-2"
                  >
                    {/* Avatar rond avec initiales */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow">
                      {(vol.nom?.[0] || '') + (vol.prenom?.[0] || '')}
                    </div>
                    {/* Infos */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-lg">{vol.nom} {vol.prenom}</span>
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          Niveau : {vol.niveau}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">{vol.email}</div>
                      <div className="text-gray-400 text-xs mt-1">Tél : {vol.phone}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
                  <div className="info-value">{org.login}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">MOT DE PASSE</div>
                  <div className="info-value">{org.passwrd}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">EMAIL</div>
                  <div className="info-value">{org.email}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">TÉLÉPHONE</div>
                  <div className="info-value">{org.phone}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">DATE DE NAISSANCE</div>
                  <div className="info-value">{org.date_naiss}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgProfile;