import React, { useEffect, useState } from "react";
import Sidebar3 from "../components/auth/Sidebar3";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/canconnect25/api/list_even")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar3 />
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1 style={{ marginBottom: "2rem" }}>Événements à venir</h1>
        {loading ? (
          <div>Chargement...</div>
        ) : events.length === 0 ? (
          <div>Aucun événement trouvé.</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}>
            {events.map(even => (
              <div
                key={even.id_even}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  boxShadow: "0 4px 18px 0 rgba(0,0,0,0.10)",
                  padding: "2rem",
                  borderLeft: "6px solid #00843d",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "120px" // Hauteur minimale réduite
                }}
              >
                <div>
                  <h2 style={{
                    color: "#c8102e",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                    fontSize: "1.5rem" // Titre agrandi et en gras
                  }}>
                    {even.titre_even}
                  </h2>
                  <div style={{ color: "#555", marginBottom: "0.5rem" }}>
                    <span role="img" aria-label="lieu">📍</span> {even.lieu}
                  </div>
                  <div style={{ color: "#00843d", fontWeight: "bold" }}>
                    {even.date_even} &nbsp;|&nbsp; {even.time_even}
                  </div>
                </div>
                {/* Suppression de la partie ID */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
