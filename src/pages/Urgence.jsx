// Page d'accueil temporaire pour tester la navigation
import React, { useState } from "react";
import Sidebar2 from "../components/auth/Sidebar2";
import Sidebar3 from "../components/auth/Sidebar3";

// Exemples d'urgences fictives
const initialUrgences = [
  {
    id: 1,
    titre: "Incident sanitaire",
    description: "Un fan a fait un malaise dans la tribune centrale. Il a besoin d'une assistance médicale urgente.",
    lieu: "Tribune Centrale, Stade Mohammed V",
    heure: "Aujourd'hui, 16:20",
    statut: "En attente d'aide"
  },
  {
    id: 2,
    titre: "Blessure légère",
    description: "Un fan s'est blessé à la cheville en descendant les escaliers. Il a besoin d'une assistance médicale.",
    lieu: "Entrée principale, Stade Mohammed V",
    heure: "Aujourd'hui, 17:05",
    statut: "En attente d'aide"
  },
  {
    id: 3,
    titre: "Fan égaré",
    description: "Un enfant s'est perdu et recherche ses parents. Il est actuellement avec le staff de sécurité.",
    lieu: "Zone restauration, Stade Mohammed V",
    heure: "Aujourd'hui, 17:30",
    statut: "En attente d'aide"
  }
];

function Urgence() {
  const userType = localStorage.getItem('userType');
  const [urgences, setUrgences] = useState(initialUrgences);
  const [showModal, setShowModal] = useState(false);
  const [newUrgence, setNewUrgence] = useState({
    titre: "",
    description: "",
    lieu: ""
  });

  let sidebar = null;
  if (userType === 'org') sidebar = <Sidebar2 />;
  else if (userType === 'vol') sidebar = <Sidebar2 />;
  else if (userType === 'fan') sidebar = <Sidebar3 />;

  // Ajout d'une urgence par le fan
  const handleAddUrgence = (e) => {
    e.preventDefault();
    if (!newUrgence.titre || !newUrgence.description || !newUrgence.lieu) return;
    setUrgences([
      ...urgences,
      {
        id: urgences.length + 1,
        titre: newUrgence.titre,
        description: newUrgence.description,
        lieu: newUrgence.lieu,
        heure: "Maintenant",
        statut: "En attente d'aide"
      }
    ]);
    setShowModal(false);
    setNewUrgence({ titre: "", description: "", lieu: "" });
  };

  // Action volontaire/org pour aider
  const handleAide = (urgenceId) => {
    setUrgences(urgences.map(u =>
      u.id === urgenceId
        ? { ...u, statut: "Aide en cours" }
        : u
    ));
    alert("Merci pour votre aide ! Un responsable vous contactera.");
  };

  return (
    <div className="page-container" style={{ display: "flex", minHeight: "100vh", background: "#f7f7fa" }}>
      {sidebar}
      <div style={{ flex: 1, padding: "2.5rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            color: "#c8102e",
            letterSpacing: "1px"
          }}>
            Urgences des fans
          </h1>
          {userType === "fan" && (
            <button
              style={{
                background: "#00843d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 1.5rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)"
              }}
              onClick={() => setShowModal(true)}
            >
              Ajouter une urgence
            </button>
          )}
        </div>
        {/* Modal ajout urgence */}
        {showModal && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <form
              onSubmit={handleAddUrgence}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "2rem",
                minWidth: "340px",
                boxShadow: "0 4px 18px 0 rgba(0,0,0,0.13)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <h2 style={{ color: "#c8102e", marginBottom: "1rem" }}>Nouvelle urgence</h2>
              <input
                type="text"
                placeholder="Titre"
                value={newUrgence.titre}
                onChange={e => setNewUrgence({ ...newUrgence, titre: e.target.value })}
                required
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd" }}
              />
              <textarea
                placeholder="Description"
                value={newUrgence.description}
                onChange={e => setNewUrgence({ ...newUrgence, description: e.target.value })}
                required
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd", minHeight: "70px" }}
              />
              <input
                type="text"
                placeholder="Lieu"
                value={newUrgence.lieu}
                onChange={e => setNewUrgence({ ...newUrgence, lieu: e.target.value })}
                required
                style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#eee",
                    color: "#333",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#00843d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        )}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "2rem"
        }}>
          {urgences.map(urg => (
            <div
              key={urg.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 4px 18px 0 rgba(0,0,0,0.10)",
                padding: "2rem 1.5rem 1.5rem 2rem",
                borderLeft: "6px solid #c8102e",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "220px",
                position: "relative"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
                  <span style={{
                    display: "inline-block",
                    background: "#c8102e",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    marginRight: "1rem"
                  }}>
                    !
                  </span>
                  <span style={{ fontWeight: "bold", fontSize: "1.25rem", color: "#c8102e" }}>
                    {urg.titre}
                  </span>
                </div>
                <div style={{ color: "#444", marginBottom: "0.7rem", fontSize: "1.05rem" }}>
                  {urg.description}
                </div>
                <div style={{ color: "#00843d", fontWeight: "bold", marginBottom: "0.3rem" }}>
                  <span role="img" aria-label="lieu">📍</span> {urg.lieu}
                </div>
                <div style={{ color: "#888", fontSize: "0.98rem", marginBottom: "0.2rem" }}>
                  <span role="img" aria-label="heure">⏰</span> {urg.heure}
                </div>
                <div style={{
                  color: "#fff",
                  background: urg.statut === "Aide en cours" ? "#00843d" : "#f59e42",
                  borderRadius: "8px",
                  display: "inline-block",
                  padding: "0.2rem 0.8rem",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginTop: "0.2rem"
                }}>
                  {urg.statut}
                </div>
              </div>
              {/* Action volontaire/org pour aider */}
              {(userType === "vol" || userType === "org") && urg.statut !== "Aide en cours" && (
                <button
                  style={{
                    marginTop: "1.2rem",
                    background: "#00843d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.7rem 1.5rem",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    alignSelf: "flex-end",
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)"
                  }}
                  onClick={() => handleAide(urg.id)}
                >
                  Donner de l'aide
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Urgence;