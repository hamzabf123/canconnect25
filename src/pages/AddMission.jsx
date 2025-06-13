import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../index.css"
import Sidebar2 from "../components/auth/Sidebar2";

function AddMission() {

    const org = JSON.parse(localStorage.getItem('org'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mockMissions, setMockMissions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState('');
    const [selectedZone, setSelectedZone] = useState('field_pitch_court');
    const [mission, setMission] = useState(null);
    const [lineupModalOpen, setLineupModalOpen] = useState(false);
    const [currentLineupMission, setCurrentLineupMission] = useState(null);

    

    // Charger la mission depuis la base à chaque affichage de la page ou après ajout
    const fetchMission = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8080/canconnect25/api/voir_miss_org',
                org,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Réponse mission backend:", response.data);
            setMission(response.data);
            setLoading(false); // <-- AJOUTE CETTE LIGNE
        } catch (err) {
            setError('Erreur lors de la récupération de la mission');
            setMission(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMission();
        // eslint-disable-next-line
    }, []); // tableau vide = une seule fois au montage

    
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/canconnect25/api/list_even');
                setMockMissions(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des événements');
                console.error(err);
            }
        };
        useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line
    }, []);

    const togglePopup = () => setIsOpen(!isOpen);
    const closePopup = () => setIsOpen(false);

    const handleMissionChange = (e) => setSelectedMission(e.target.value);
    const handleZoneChange = (e) => setSelectedZone(e.target.value);

    const handleSubmit = async () => {
        const missionId = parseInt(selectedMission);
        const missionEvent = mockMissions.find(m => m.id_even === missionId);
        const zone = stadiumZones.find(z => z.value === selectedZone);

        if (!missionEvent || !zone) {
            alert("Veuillez sélectionner un événement et une zone valides.");
            return;
        }

        const [year, month, day] = missionEvent.date_even.split('-').map(num => parseInt(num));
        const [hours, minutes] = missionEvent.time_even.split(':').map(num => parseInt(num));
        const callTime = new Date(year, month - 1, day, hours - 3, minutes);

        const mission2Data = {
            org: org?.login || "",
            etat: "nouveau",
            id_even: missionEvent.id_even,
            call_time: callTime.toISOString().substring(11, 16)
        };

        try {
            await axios.post(
                'http://localhost:8080/canconnect25/api/add_miss',mission2Data,
                { headers: { 'Content-Type': 'application/json' } }
            );
            // Recharge la mission depuis la base après ajout
            await fetchMission();
            setSelectedMission('');
            closePopup();
        } catch (err) {
            console.error('Erreur lors de la création de la mission.', err);
            alert("Erreur lors de la création de la mission.");
        }
    };

    const SuppMiss = async () => {
        try {
            setLoading(true);
            await axios.post(
                'http://localhost:8080/canconnect25/api/supp_miss',
                org,
                { headers: { 'Content-Type': 'application/json' } }
            );
            // Recharge la mission depuis la base après suppression
            await fetchMission();
        } catch (err) {
            setError('Erreur lors de la suppression de la mission');
        } finally {
            setLoading(false);
        }
    };

    const openLineupModal = async () => {
        let volunteers = await fetchVolunteers();
        // Ajoute le champ present si nécessaire
        volunteers = volunteers.map(v => ({ ...v, present: v.present ?? false }));
        setCurrentLineupMission({
            mission: {
                name: mission.titre_miss,
                date: mission.date_even,
                time: mission.time_even,
            },
            zone: { label: "Zone inconnue", value: "" },
            volunteers: volunteers, // <-- chaque volontaire a un champ present
            id: mission.id
        });
        setLineupModalOpen(true);
    };

    const toggleVolunteerPresence = (missionId, volunteerLogin) => {
        setCurrentLineupMission(prev => {
            if (!prev || prev.id !== missionId) return prev;
            return {
                ...prev,
                volunteers: prev.volunteers.map(vol =>
                    vol.login === volunteerLogin ? { ...vol, present: !vol.present } : vol
                )
            };
        });
    };

    const saveLineupData = async () => {
        if (currentLineupMission) {
            const lineupData = {
                missionId: currentLineupMission.id, // Ajoute l'id de la mission
                volunteers: currentLineupMission.volunteers.map(vol => ({
                    login: vol.login,
                    present: vol.present
                }))
            };
            // Envoi au backend
            try {
                await axios.post(
                    'http://localhost:8080/canconnect25/api/marquer_presence',
                    lineupData,
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setLineupModalOpen(false);
            } catch (err) {
                alert("Erreur lors de l'enregistrement de la présence.");
            }
        }
    };

    const fetchVolunteers = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/canconnect25/api/vols_par_org',
                org,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response.data;
        } catch (err) {
            console.error("Erreur lors du chargement des volontaires", err);
            return [];
        }
    };

    const stadiumZones = [
        { value: "field_pitch_court", label: "Terrain/Pelouse" },
        { value: "standing_terraces", label: "Terrasses debout" },
        { value: "seating_bowl", label: "Tribunes assises" },
        { value: "vip_boxes", label: "Loges VIP" },
        { value: "press_box", label: "Tribune de presse" },
        { value: "dugouts_bench", label: "Bancs de touche" },
        { value: "tunnel", label: "Tunnel" },
        { value: "general_admission", label: "Entrée générale" },
        { value: "premium_seating", label: "Places premium" },
        { value: "luxury_suites", label: "Suites de luxe" },
        { value: "family_zone", label: "Zone famille" },
        { value: "supporters_section", label: "Section supporters" },
        { value: "accessible_seating", label: "Places accessibles" },
        { value: "locker_rooms", label: "Vestiaires" },
        { value: "referee_room", label: "Salle des arbitres" },
        { value: "medical_room", label: "Salle médicale" },
        { value: "broadcast_zone", label: "Zone de diffusion" },
        { value: "concourse", label: "Esplanade" },
        { value: "loading_dock", label: "Zone de chargement" },
        { value: "concession_stands", label: "Stands de nourriture" },
        { value: "merch_stores", label: "Boutiques" },
        { value: "bars_lounges", label: "Bars/Salons" },
        { value: "vip_hospitality", label: "Zones d'hospitalité VIP" },
        { value: "command_center", label: "Centre de commandement" },
        { value: "first_aid", label: "Postes de premiers secours" },
        { value: "staff_rooms", label: "Salles du personnel" },
        { value: "restricted_areas", label: "Zones à accès restreint" },
        { value: "stage_area", label: "Zone de scène" },
        { value: "backstage", label: "Coulisses" },
        { value: "vip_viewing", label: "Plateformes VIP" },
    ];

    // Affichage
    return (
        <div className="page-container">
            <div className="sidebar">
                <Sidebar2 />
            </div>
            <div className="min-h-screen bg-white-100 p-6">
                <div className="container mx-auto">
                    <div className="flex items-center mb-8">
                        <button
                            className={`px-4 py-2 ${mission && mission.etat !== "accomplit" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white rounded transition duration-300 shadow-md flex items-center justify-center`}
                            onClick={togglePopup}
                            disabled={mission && mission.etat !== "accomplit"}
                        >
                            +
                        </button>
                        <span className="text-gray-700 text-sm ml-2">
                            Ajouter une mission
                        </span>
                       
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Mission en cours</h2>
                        {loading ? (
                            <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
                                <p className="text-gray-500 italic">Chargement...</p>
                            </div>
                        ) : !mission ? (
                            <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
                                <p className="text-gray-500 italic">Aucune mission en cours.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500 max-w-2xl flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center">
                                            <h3 className="font-bold text-gray-800">{mission.titre_miss}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Lieu: <span className="font-medium">{mission.lieu || "Non défini"}</span>
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                                            <span>
                                                Date du match: {mission.date_even
                                                    ? new Date(mission.date_even).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                      })
                                                    : "Non défini"}
                                            </span>
                                            <span>Heure du match: {mission.time_even || "Non défini"}</span>
                                            <span>
                                                Appel: {mission.call_time
                                                    ? mission.call_time
                                                    : mission.time_even
                                                        ? (() => {
                                                            const [hours, minutes] = mission.time_even.split(':');
                                                            const callHour = parseInt(hours) - 3;
                                                            return `${callHour.toString().padStart(2, '0')}:${minutes}`;
                                                        })()
                                                        : "Non défini"}
                                            </span>
                                            <span>etat: {mission.etat}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {(() => {
    if (!mission.date_even || !mission.call_time) return null;
    const [year, month, day] = mission.date_even.split('-').map(Number);
    const [hours, minutes] = mission.call_time.split(':').map(Number);
    const callDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    const isActive = now >= callDate;
    return (
    <>
        <button
            className={`text-xl p-2 rounded-full ${isActive ? "text-blue-500 hover:bg-blue-100" : "text-gray-400 cursor-not-allowed"}`}
            onClick={isActive ? openLineupModal : undefined}
            disabled={!isActive}
            title="Voir mission"
        >
            <i className='bx bx-show'></i>
        </button><br/>
        <button
            className={`text-xl p-2 rounded-full ${isActive ? "text-red-500 hover:bg-red-100" : "text-gray-400 cursor-not-allowed"}`}
            onClick={isActive ? SuppMiss : undefined}
            disabled={!isActive}
            title="Supprimer mission"
        >
            <i className='bx bx-trash'></i>
        </button>
    </>
    );
})()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {lineupModalOpen && currentLineupMission && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setLineupModalOpen(false)}
                    >
                        <div
                            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-4">
                                <h2 className="text-xl font-bold mb-1">Lineup des Volontaires</h2>
                                <p className="text-gray-600">{currentLineupMission.mission.name} - {currentLineupMission.zone.label}</p>
                            </div>
                            <div className="flex-grow overflow-y-auto mb-4">
                                <ul className="divide-y divide-gray-200">
                                    {currentLineupMission.volunteers.map(volunteer => (
  <li key={volunteer.login} className="py-3 flex items-center justify-between">
    <span className="font-medium">{volunteer.nom} {volunteer.prenom}</span>
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-green-500 rounded"
        checked={volunteer.present}
        onChange={() => toggleVolunteerPresence(currentLineupMission.id, volunteer.login)}
      />
      <span className="ml-2 text-sm text-gray-700">
        {volunteer.present ? 'Présent' : 'Absent'}
      </span>
    </label>
  </li>
))}
                                </ul>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setLineupModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded mr-2 transition"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={saveLineupData}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={closePopup}
                    >
                        <div
                            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-2">Ajouter une mission</h2>
                                <p className="text-gray-700">
                                    Bienvenue de retour pour ajouter une nouvelle mission
                                </p>
                            </div>
                            <div className="flex flex-col space-y-6 flex-grow overflow-y-auto">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 mb-2 font-medium">Sélectionnez un evenement</label>
                                    <select
                                        value={selectedMission}
                                        onChange={handleMissionChange}
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>Sélectionnez un evenement</option>
                                        {mockMissions.map(event => (
                                            <option key={event.id_even} value={event.id_even}>
                                                {event.titre_even} - {event.date_even} à {event.time_even}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 mb-2 font-medium">Sélectionnez votre zone</label>
                                    <select
                                        value={selectedZone}
                                        onChange={handleZoneChange}
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {stadiumZones.map((zone) => (
                                            <option key={zone.value} value={zone.value}>
                                                {zone.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closePopup}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition"
                                    disabled={!selectedMission}
                                >
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddMission;
