import React, { useState } from "react";
import axios from "axios";
import "../styles/LostitemsAdmin.css";

const SECRET_CODE = "1234";

const LostitemsAdmin = () => {
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);

  // Formulaire ajout objet perdu
  const [title, setTitle] = useState("");
  const [trouveur, setTrouveur] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [addedId, setAddedId] = useState(null);

  // Formulaire marquer trouvé
  const [foundId, setFoundId] = useState("");
  const [infosProprietaire, setInfosProprietaire] = useState("");
  const [loginVolontaire, setLoginVolontaire] = useState("");
  const [foundMsg, setFoundMsg] = useState("");

  const handleSubmitSecret = (e) => {
    e.preventDefault();
    if (input === SECRET_CODE) {
      setAuthorized(true);
    } else {
      alert("Code incorrect !");
    }
  };

  // Ajout objet perdu
  const handleAddLostItem = async (e) => {
    e.preventDefault();
    if (!title || !image || !description || !trouveur) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    // 1. Upload image (simulation: on copie dans public, en vrai il faut un backend)
    const imageName = Date.now() + "_" + image.name;
    // Pour un vrai backend, il faut envoyer l'image avec FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image, imageName);
    formData.append("trouveur",trouveur);

    try {
      // Remplace l'URL par celle de ton backend qui gère l'upload et l'ajout
      const res = await axios.post("http://localhost:8080/canconnect25/api/add_lost_item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAddedId(res.data.id); // L'id retourné par la base
      setTitle("");
      setTrouveur("");
      setImage(null);
      setDescription("");
    } catch (err) {
      alert("Erreur lors de l'ajout !");
    }
  };

  // Marquer objet trouvé
  const handleMarkFound = async (e) => {
    e.preventDefault();
    if (!foundId || !infosProprietaire) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    try {
      // Remplace l'URL par celle de ton backend
      await axios.post("http://localhost:8080/canconnect25/api/mark_found", {
        id: foundId,
        infos_proprietaire: infosProprietaire,
      });
      setFoundMsg("Objet marqué comme trouvé !");
      setFoundId("");
      setInfosProprietaire("");
      setLoginVolontaire("");
    } catch (err) {
      setFoundMsg("Erreur lors de la validation !");
    }
  };

  if (!authorized) {
    return (
      <div className="admin-bg">
        <form onSubmit={handleSubmitSecret} className="admin-form-container">
          <label className="admin-form-label">Entrez le code secret :</label>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="admin-form-input"
            placeholder="Code secret"
          />
          <button type="submit" className="admin-form-btn">
            Valider
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-bg">
      <div style={{ width: "100%" }}>
        <h1 className="admin-main-title">Gestion d'objets perdus</h1>
        <div className="admin-forms-row">
          {/* Formulaire ajout objet perdu */}
          <form className="admin-form-container" onSubmit={handleAddLostItem} encType="multipart/form-data">
            <h2 className="admin-form-label">Ajouter objet perdu</h2>
            <input
              type="text"
              className="admin-form-input"
              placeholder="Titre principal de l'objet"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="text"
              className="admin-form-input"
              placeholder="login du trouveur"
              value={trouveur}
              onChange={e => setTrouveur(e.target.value)}
            />

            <input
              type="file"
              className="admin-form-input"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />
            <textarea
              className="admin-form-input"
              placeholder="Description détaillée"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
            <button type="submit" className="admin-form-btn">Ajouter</button>
          </form>

          {/* Formulaire marquer trouvé */}
          <form className="admin-form-container" onSubmit={handleMarkFound}>
            <h2 className="admin-form-label">Marquer comme trouvé</h2>
            <input
              type="text"
              className="admin-form-input"
              placeholder="ID de l'objet"
              value={foundId}
              onChange={e => setFoundId(e.target.value)}
            />
            <input
              type="text"
              className="admin-form-input"
              placeholder="Infos propriétaire"
              value={infosProprietaire}
              onChange={e => setInfosProprietaire(e.target.value)}
            />
            
            <button type="submit" className="admin-form-btn">Valider</button>
            {foundMsg && (
              <div className="admin-success-msg">
                {foundMsg}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Message de succès ajout objet */}
      {addedId && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "2rem 2.5rem",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
            textAlign: "center",
            minWidth: "280px"
          }}>
            <h2 style={{color: "#00843d", marginBottom: "1rem"}}>Objet ajouté !</h2>
            <div style={{fontSize: "1.2rem", marginBottom: "1.5rem"}}>
              ID : <b style={{color: "#c8102e"}}>{addedId}</b>
            </div>
            <button
              onClick={() => setAddedId(null)}
              style={{
                background: "#c8102e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.6rem 1.5rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostitemsAdmin;