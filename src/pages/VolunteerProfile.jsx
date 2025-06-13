import React, { useState } from 'react';
import '../styles/VolunteerProfile.css';
import Sidebar2 from '../components/auth/Sidebar2';

const VolunteerProfile = () => {
  const vol = JSON.parse(localStorage.getItem('vol'));
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showMoreMissions, setShowMoreMissions] = useState(false);

  // Mock volunteer data - replace with your API data
  const volunteer = {
    name: "Youssef Nafae",
    isFavorite: true,
    nationality: "MAR",
    age: 21,
    level: 7,
    username: "youssef_nafae",
    contractType: "Volontaire jusqu'au 30 juin 2025",
    experience: {
      current: 785,
      max: 1000
    },
    experiencePoints: 450,
    badge: "Junior",
    attributes: {
      missions: 80,
      coordination: 59,
      urgence: 80,
      support: 70,
      items: 90
    },
    missions: [
      {
        id: 1,
        name: "Accueil des spectateurs",
        location: "Stade Mohammed V, Casablanca",
        date: "10/06/2025",
        role: "Agent d’accueil",
        status: "Complété",
        rating: 8.2
      },
      {
        id: 2,
        name: "Gestion des équipements",
        location: "Stade Prince Moulay Abdellah, Rabat",
        date: "12/06/2025",
        role: "Responsable matériel",
        status: "Complété",
        rating: 7.8
      },
      {
        id: 3,
        name: "Support billetterie",
        location: "Stade de Tanger, Tanger",
        date: "14/06/2025",
        role: "Assistant billetterie",
        status: "Complété",
        rating: 7.2
      },
      {
        id: 4,
        name: "Coordination zone VIP",
        location: "Stade de Marrakech, Marrakech",
        date: "16/06/2025",
        role: "Assistant VIP",
        status: "Complété",
        rating: 7.5
      },
      {
        id: 5,
        name: "Aide à la logistique des joueurs",
        location: "Stade d’Agadir, Agadir",
        date: "18/06/2025",
        role: "Coordinateur logistique",
        status: "Complété",
        rating: 8.2
      }
    ],
    strengths: [
      "Coordination d'équipe",
      "Recherche et sauvetage",
      "Premiers secours"
    ],
    average: 7.55
  };

  // Helper for attribute positions
  const getAttributePosition = (index, total) => {
    const radius = 120;
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2;
    const x = radius * Math.cos(angle) + radius;
    const y = radius * Math.sin(angle) + radius;
    return { x, y };
  };

  const visibleMissions = showMoreMissions ? volunteer.missions : volunteer.missions.slice(0, 3);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar2 />
      <div className="volunteer-profile" style={{ flex: 1 }}>
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {vol.nom.split(' ').map(word => word[0]).join('')}
            </div>
            {volunteer.isFavorite && <span className="profile-favorite">★</span>}
          </div>
          <div className="profile-name-container">
            <h1 className="profile-name">{vol.nom} {vol.prenom}</h1>
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

        {/* Main content area - two columns */}
        <div className="profile-content">
          {/* Left column - Personal information */}
          <div className="profile-personal-info">
            <div className="info-section">
              <div className="info-row">
                <div className="info-label">NATIONALITÉ</div>
                <div className="info-value nationality">
                  <div className="flag-container">
                    <div className="flag flag-MAR"></div>
                  </div>
                  <span>{volunteer.nationality}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">DATE NAISSANCE &nbsp;</div>
                <div className="info-value">{vol.date_naiss}</div>
              </div>
              <div className="info-row">
                <div className="info-label">NIVEAU</div>
                <div className="">Niveau {vol.niveau}</div>
              </div>
              <div className="info-row">
                <div className="info-label">NOMBRE DE MISSIONS</div>
                <div className="">{vol.nb_missions}</div>
              </div>
              <div className="info-row">
                <div className="info-label">NOMBRE D'URGENCES RESOLU</div>
                <div className="">{vol.nb_urgences}</div>
              </div>
              <div className="info-row">
                <div className="info-label">EXP: {vol.points}/{volunteer.experience.max}</div>
                <div className="info-value right-aligned">Niveau {vol.niveau}</div>
              </div>
              <div className="experience-bar">
                <div
                  className="experience-progress"
                  style={{ width: `${(vol.points / volunteer.experience.max) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="info-section">
              <div className="info-row">
                <div className="info-label">VALEUR D'EXPÉRIENCE</div>
                <span className="expand-icon">▼</span>
              </div>
              <div className="info-value experience-points highlight">{vol.points} pts</div>
            </div>
          </div>

          {/* Right column - Attributes and missions */}
          <div className="profile-performance">
            {/* Attributes visualization */}
            <div className="attributes-section">
              <div className="section-header">
                <h2>Aperçu des attributs</h2>
                <div className="overall-score">{Math.round(Object.values(volunteer.attributes).reduce((sum, val) => sum + val, 0) / Object.keys(volunteer.attributes).length)}</div>
              </div>
              <div className="attributes-visual">
                <div className="attributes-container">
                  {Object.entries(volunteer.attributes).map(([key, value], index) => {
                    const position = getAttributePosition(index, Object.keys(volunteer.attributes).length);
                    return (
                      <div
                        key={key}
                        className="attribute-bubble"
                        style={{
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                          backgroundColor: getAttributeColor(value)
                        }}
                      >
                        <span className="attribute-value">{value}</span>
                        <span className="attribute-name">{key.toUpperCase()}</span>
                      </div>
                    );
                  })}
                  <div className="attributes-center-point"></div>
                </div>
                <div className="attributes-info">
                  <i className="info-icon">ℹ</i> Cliquez sur l'aperçu pour plus de détails
                </div>
              </div>
            </div>

            {/* Missions history */}
            <div className="missions-section">
              <div className="section-header">
                <h2>Historique des missions</h2>
                <div className="overall-score">{volunteer.average}</div>
              </div>
              <div className="missions-count">{volunteer.missions.length} Participations</div>
              <div className="missions-table">
                <div className="missions-header">
                  <div className="mission-col mission-name">Mission</div>
                  <div className="mission-col mission-date">Date</div>
                  <div className="mission-col mission-role">Rôle</div>
                  <div className="mission-col mission-status">Statut</div>
                  <div className="mission-col mission-rating">Note</div>
                </div>
                {visibleMissions.map(mission => (
                  <div key={mission.id} className="mission-row">
                    <div className="mission-col mission-name">
                      <div className="mission-icon">P</div>
                      <div className="mission-details">
                        <div>{mission.name}</div>
                        <div className="mission-location">{mission.location}</div>
                      </div>
                    </div>
                    <div className="mission-col mission-date">
                      <div className="date-icon">📅</div> {mission.date}
                    </div>
                    <div className="mission-col mission-role">{mission.role}</div>
                    <div className="mission-col mission-status">
                      <span className={`status-badge ${mission.status.toLowerCase()}`}>{mission.status}</span>
                    </div>
                    <div className="mission-col mission-rating">
                      <span className="rating-badge">{mission.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
              {volunteer.missions.length > 3 && (
                <div className="show-more" onClick={() => setShowMoreMissions(!showMoreMissions)}>
                  {showMoreMissions ? 'Voir moins ▲' : 'Voir plus ▼'}
                </div>
              )}
            </div>
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
                  <div className="info-label">USERNAME</div>
                  <div className="info-value">{vol.login}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">PASSWORD</div>
                  <div className="info-value">{vol.passwrd}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Email:</div>
                  <div className="info-value">{vol.email}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Téléphone:</div>
                  <div className="info-value">{vol.phone}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Adresse:</div>
                  <div className="info-value">Rue de la Paix, Casablanca</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Date d'inscription:</div>
                  <div className="info-value">15/01/2023</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Compétences:</div>
                  <div className="info-value">Premiers secours, Communication, Logistique</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Langues:</div>
                  <div className="info-value">Français, Arabe, Anglais</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get color based on attribute value
function getAttributeColor(value) {
  if (value >= 90) return '#16a34a'; // Green
  if (value >= 80) return '#2563eb'; // Blue
  if (value >= 70) return '#7c3aed'; // Purple
  if (value >= 60) return '#ea580c'; // Orange
  if (value >= 50) return '#dc2626'; // Red
  return '#71717a'; // Gray
}

export default VolunteerProfile;