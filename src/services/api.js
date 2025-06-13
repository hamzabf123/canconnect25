import axios from 'axios';

// Création d'une instance axios avec une URL de base
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // À remplacer par l'URL de votre backend Java JEE
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs 401 (non autorisé) - rediriger vers la page de connexion
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  // Connexion utilisateur
  login: (username, password) => {
    return api.post('/auth/login', { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
      });
  },
  
  // Déconnexion utilisateur
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Obtenir l'utilisateur connecté
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Inscription utilisateur - Informations du compte
  registerAccount: (userData) => {
    return api.post('/auth/register/account', userData);
  },
  
  // Inscription utilisateur - Informations personnelles
  registerPersonal: (userData) => {
    return api.post('/auth/register/personal', userData);
  },
  
  // Inscription utilisateur - Informations professionnelles
  registerProfessional: (userData) => {
    return api.post('/auth/register/professional', userData);
  },
  
  // Inscription complète (toutes les étapes)
  registerComplete: (userData) => {
    return api.post('/auth/register', userData)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
      });
  }
};

// Service utilisateur
export const userService = {
  // Obtenir le profil de l'utilisateur
  getProfile: () => {
    return api.get('/users/profile');
  },
  
  // Mettre à jour le profil de l'utilisateur
  updateProfile: (userData) => {
    return api.put('/users/profile', userData);
  },
  
  // Changer le mot de passe
  changePassword: (passwordData) => {
    return api.post('/users/change-password', passwordData);
  }
};

export default api;
