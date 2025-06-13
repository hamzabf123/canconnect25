import React, { useState } from "react";
import Sidebar2 from "../components/auth/Sidebar2";
import qrLogo from "../assets/images/qr.png";

function Dashboard() {
  // Example hotel data
  const hotel = {
    name: "Hotel Atlas Casablanca",
    mapLink: "https://maps.google.com/?q=Hotel+Atlas+Casablanca",
    daysLeft: 30,
    rooms: 64
  };

  // Coupon modal state
  const [showCouponModal, setShowCouponModal] = useState(false);
  const couponCode = "CAN25-VOL-2025";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7fa" }}>
      <Sidebar2 />
      <div style={{ flex: 1, padding: "2.5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Main content in two columns */}
        <div style={{
          display: "flex",
          width: "100%",
          maxWidth: 950,
          gap: "2rem",
          marginBottom: "2.5rem",
          justifyContent: "center"
        }}>
          {/* Hotel Info */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 4px 18px 0 rgba(0,0,0,0.10)",
              padding: "2.2rem 2rem",
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              borderLeft: "6px solid #00843d",
              borderTop: "6px solid #d90429", // rouge vif au lieu de rose
              transition: "box-shadow 0.2s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1.2rem" }}>
              <span style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #00843d 60%,rgb(220, 29, 29) 100%)",
                color: "#fff",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1.7rem",
                marginRight: "1rem",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)"
              }}>
                🏨
              </span>
              <span style={{
                fontWeight: "bold",
                fontSize: "1.35rem",
                color: "#00843d",
                letterSpacing: "1px",
                textTransform: "uppercase"
              }}>
                Hôtel affecté
              </span>
            </div>
            <div style={{
              color: "#1a4b8e",
              fontWeight: "bold",
              fontSize: "1.18rem",
              marginBottom: "0.7rem",
              letterSpacing: "0.5px"
            }}>
              {hotel.name}
            </div>
            <div style={{ marginBottom: "0.7rem" }}>
              <a
                href={hotel.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#e94e77",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  fontSize: "1.08rem"
                }}
              >
                <span role="img" aria-label="map">📍</span> Voir sur la carte
              </a>
            </div>
            <div style={{
              display: "flex",
              gap: "1.2rem",
              marginBottom: "0.7rem"
            }}>
              <div style={{
                background: "linear-gradient(90deg, #f7f7fa 60%, #e94e7722 100%)",
                borderRadius: "8px",
                padding: "0.5rem 1.1rem",
                color: "#c8102e",
                fontWeight: "bold",
                fontSize: "1.08rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 1px 4px 0 rgba(233,78,119,0.07)"
              }}>
                <span role="img" aria-label="calendar">📅</span>
                {hotel.daysLeft} jours restants
              </div>
              <div style={{
                background: "linear-gradient(90deg, #f7f7fa 60%, #00843d22 100%)",
                borderRadius: "8px",
                padding: "0.5rem 1.1rem",
                color: "#00843d",
                fontWeight: "bold",
                fontSize: "1.08rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 1px 4px 0 rgba(0,132,61,0.07)"
              }}>
                <span role="img" aria-label="room">🛏️</span>
                {hotel.rooms} chambres
              </div>
            </div>
            <div style={{
              marginTop: "1rem",
              color: "#888",
              fontSize: "0.98rem",
              fontStyle: "italic",
              borderTop: "1px dashed #e94e77",
              paddingTop: "0.7rem"
            }}>
              Merci pour votre engagement volontaire !
            </div>
          </div>

          {/* Coupon Card */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 4px 18px 0 rgba(0,0,0,0.10)",
              padding: "2.2rem 2rem",
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              borderRight: "6px solid #d90429", // rouge vif
              borderTop: "6px solid #00843d",
              position: "relative"
            }}
            onClick={() => setShowCouponModal(true)}
          >
            <span style={{
              background: "linear-gradient(135deg, #f59e42 60%, #d90429 100%)", // orange -> rouge
              color: "#fff",
              borderRadius: "50%",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.8rem",
              marginBottom: "1rem",
              boxShadow: "0 2px 8px 0 rgba(245,158,66,0.10)"
            }}>
              🎟️
            </span>
            <span style={{
              fontWeight: "bold",
              fontSize: "1.28rem",
              color: "#d90429", // rouge vif
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}>
              Voir mon coupon
            </span>
            <span style={{
              color: "#888",
              fontSize: "1rem",
              marginTop: "0.7rem",
              fontStyle: "italic"
            }}>
              Cliquez pour afficher votre code coupon
            </span>
            <span style={{
              position: "absolute",
              right: "1.5rem",
              top: "1.5rem",
              fontSize: "1.2rem",
              color: "#d90429" // rouge vif
            }}>
              {showCouponModal ? "▲" : "▼"}
            </span>
          </div>
        </div>

        {/* QR Code Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 4px 18px 0 rgba(0,0,0,0.10)",
            padding: "2rem",
            minWidth: 320,
            maxWidth: 400,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1.5rem",
            borderBottom: "6px solid #00843d",
            borderTop: "6px solid #d90429" // rouge vif
          }}
        >
          <img
            src={qrLogo}
            alt="QR Code"
            style={{
              width: "110px",
              marginBottom: "1rem",
              borderRadius: "16px",
              border: "2px solid #d90429", // rouge vif
              boxShadow: "0 2px 8px 0 rgba(0,132,61,0.10)"
            }}
          />
          <div
            style={{
              marginTop: "0.5rem",
              color: "#00843d",
              fontWeight: "bold",
              fontSize: "1.15rem",
              textDecoration: "underline",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            Générer votre QR code volontaire
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.example.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "1rem",
              color: "#d90429", // rouge vif
              fontWeight: "bold",
              fontSize: "1rem",
              textDecoration: "none"
            }}
          >
            Télécharger l'application
          </a>
        </div>

        {/* Coupon Modal */}
        {showCouponModal && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 4px 18px 0 rgba(0,0,0,0.15)",
              padding: "2.5rem 2rem",
              minWidth: 320,
              maxWidth: 350,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <span style={{
                fontSize: "2.2rem",
                marginBottom: "1rem",
                color: "#00843d"
              }}>🎟️</span>
              <div style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "#1a4b8e",
                marginBottom: "1rem"
              }}>
                Votre code coupon :
              </div>
              <div style={{
                background: "#f7f7fa",
                border: "1px dashed #00843d",
                borderRadius: "10px",
                padding: "1rem 2rem",
                fontSize: "1.3rem",
                color: "#d90429", // rouge vif
                fontWeight: "bold",
                letterSpacing: "2px",
                marginBottom: "1.5rem"
              }}>
                {couponCode}
              </div>
              <button
                onClick={() => setShowCouponModal(false)}
                style={{
                  background: "#d90429", // rouge vif
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1.5rem",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "0.5rem"
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;