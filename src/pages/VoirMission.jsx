import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/HomePage.css";
import Sidebar2 from "../components/auth/Sidebar2";

// Mock data for demonstration
const mockData = {
  nextMatch: {
    title: "Morocco vs Ghana",
    venue: "Mohammed V Stadium",
    address: "Casablanca, Morocco",
    mapLink: "https://maps.google.com/?q=Mohammed+V+Stadium+Casablanca+Morocco",
    date: "2025-05-15",
    time: "19:00",
    callTime: "17:00"
  },
  dresscode: {
    uniform: "Red and green volunteer t-shirt with official badge",
    essentials: ["Official ID", "Water bottle", "Sun hat", "Comfortable shoes"],
    optional: ["Sunscreen", "Light jacket for evening"]
  },
  role: {
    title: "Fan Guide & Support",
    responsibilities: [
      "Direct visitors to their seats",
      "Provide information about facilities",
      "Assist with special needs requests",
      "Support emergency procedures when required"
    ]
  }
};

function VoirMission() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [miss, setMiss] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [missionData, setMissionData] = useState(mockData);

  // Load mission data from API
  useEffect(() => {
    const vol = JSON.parse(localStorage.getItem('vol'));

   
      axios.post('http://localhost:8080/canconnect25/api/voir_miss', vol, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          // Si la réponse est vide ou n'est pas un objet, considère qu'il n'y a pas de mission
          if (!response.data || typeof response.data !== "object") {
            setMiss(null);
          } else {
            setMiss(response.data);
          }
          setIsLoading(false);
          setIsLoaded(true);
          console.log('Mission data loaded:', response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Oops!', error);
          setErrors({ form: "Une erreur s'est produite. Veuillez réessayer." });
        });
    
  }, []);

  // Countdown timer to call time
  const updateTimer = () => {
    if (!miss) return;

    // Correction pour supporter HH:mm ou HH:mm:ss
    let callTime = miss.call_time;
    if (callTime && callTime.length === 5) callTime += ":00";
    const callDateTime = new Date(`${miss.date_even}T${callTime}`); // ou ajoute 'Z' si besoin

    console.log("date_even:", miss.date_even, "call_time:", miss.call_time, "callDateTime:", callDateTime, "now:", new Date());

    const now = new Date();
    const diff = callDateTime - now;

    if (diff <= 0) {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    if (isLoaded && miss) {
      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isLoaded, miss]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) return <p>Chargement...</p>;
  if (errors.form) return <p>{errors.form}</p>;

  if (
    miss === null
  ) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <div className="w-64 bg-white shadow-lg">
          <Sidebar2 />
        </div>
        <div className="flex-1 flex items-center justify-center h-screen">
          <div className="bg-white rounded-xl shadow-lg px-10 py-12 max-w-xl w-full flex flex-col items-center">
            <svg className="w-16 h-16 text-gray-300 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Aucune mission n'est affectée
            </h2>
            <p className="text-gray-500 text-center mb-2">
              Votre organisateur ne vous a pas encore assigné de mission.<br />
              Revenez plus tard ou contactez-le pour plus d'informations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
        <div className="sidebar">
        <Sidebar2 />
        </div>
        
        <div className={`content-container ${isLoaded ? 'content-loaded' : ''}`}>
        <div className="NextMatch card-animation">
          <div className="card-header">
            <div className="morocco-flag-icon"></div>
            <h1>Next Mission</h1>
          </div>

          <div className="match-details">
            <h2>{miss.titre_miss}</h2>
            <div className="venue-info">
              <i className="location-icon"></i>
              <p>{miss.lieu}</p>
            </div>

            <div className="map-link">
              <a href={missionData.nextMatch.mapLink} target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="Time card-animation">
          <div className="card-header">
            <div className="time-icon"></div>
            <h1>Time Details</h1>
          </div>

          <div className="time-details">
            <div className="date-info">
              <p><strong>Event Date:</strong> {formatDate(miss.date_even)}</p>
              <p><strong>Match Time:</strong> {miss.time_even}</p>
              <p><strong>Call Time:</strong> {miss.call_time} (Please arrive on time)</p>
            </div>

            <div className="countdown-container">
              <h3>Countdown to Call Time</h3>
              <div className="countdown">
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.days}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.hours}</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.minutes}</span>
                  <span className="countdown-label">Minutes</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.seconds}</span>
                  <span className="countdown-label">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="infos card-animation">
          <div className="card-header">
            <div className="info-icon"></div>
            <h1>What to Bring</h1>
          </div>

          <div className="info-content">
            <div className="dress-code">
              <h3>Uniform</h3>
              <p>{missionData.dresscode.uniform}</p>
            </div>

            <div className="essentials">
              <h3>Essential Items</h3>
              <ul className="items-list">
                {missionData.dresscode.essentials.map((item, index) => (
                  <li key={index} className="item-appear">
                    <span className="check-icon"></span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="optional-items">
              <h3>Optional Items</h3>
              <ul className="items-list optional">
                {missionData.dresscode.optional.map((item, index) => (
                  <li key={index} className="item-appear">
                    <span className="plus-icon"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="Role card-animation">
          <div className="card-header">
            <div className="role-icon"></div>
            <h1>{missionData.role.title}</h1>
          </div>

          <div className="role-content">
            <h3>Your Responsibilities</h3>
            <ul className="responsibilities-list">
              {missionData.role.responsibilities.map((responsibility, index) => (
                <li key={index} className="responsibility-item">
                  {responsibility}
                </li>
              ))}
            </ul>

            <div className="importance-note">
              <p>Your role is crucial to ensuring visitors have an amazing experience!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoirMission;
