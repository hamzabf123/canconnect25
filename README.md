# CanConnect25 - Documentation du Projet

## Aperçu
CanConnect25 est une application frontend React qui fournit des fonctionnalités d'authentification (connexion et inscription) avec une interface utilisateur moderne et responsive. L'application est conçue pour communiquer avec un backend Java JEE via des API REST.

## Fonctionnalités
- Page de connexion avec validation des formulaires
- Processus d'inscription en plusieurs étapes (informations personnelles, professionnelles et du compte)
- Validation complète des formulaires
- Interface utilisateur moderne et responsive
- Intégration API avec axios pour la communication avec le backend
- Gestion des tokens d'authentification
- Routes protégées nécessitant une authentification

## Technologies Utilisées
- React (JavaScript standard)
- CSS standard (sans frameworks comme Tailwind CSS)
- Axios pour les requêtes API
- React Router pour la navigation

## Structure du Projet
```
canconnect25_js/
├── public/                  # Fichiers statiques
├── src/                     # Code source
│   ├── assets/              # Images et ressources
│   │   └── images/          # Images utilisées dans l'application
│   ├── components/          # Composants React réutilisables
│   │   └── auth/            # Composants d'authentification
│   ├── pages/               # Pages de l'application
│   │   └── auth/            # Pages d'authentification
│   ├── services/            # Services pour l'intégration API
│   ├── styles/              # Fichiers CSS
│   ├── App.js               # Composant principal avec les routes
│   └── index.js             # Point d'entrée de l'application
├── package.json             # Dépendances et scripts
└── README.md                # Documentation du projet
```

## Installation et Démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm

### Installation
1. Clonez le dépôt :
```bash
git clone <url-du-dépôt>
cd canconnect25_js
```

2. Installez les dépendances :
```bash
npm install
```

### Démarrage du serveur de développement
```bash
npm start
```
L'application sera accessible à l'adresse http://localhost:3000

## Configuration de l'API Backend
L'application est configurée pour communiquer avec un backend Java JEE. Par défaut, l'URL de base est définie sur `http://localhost:8080/api`. Vous pouvez modifier cette URL dans le fichier `src/services/api.js` pour correspondre à votre environnement.

## Points d'API
L'application utilise les points d'API suivants pour communiquer avec le backend :

### Authentification
- **POST /auth/login** : Connexion utilisateur
- **POST /auth/register** : Inscription complète
- **POST /auth/register/account** : Inscription - Informations du compte
- **POST /auth/register/personal** : Inscription - Informations personnelles
- **POST /auth/register/professional** : Inscription - Informations professionnelles

### Utilisateur
- **GET /users/profile** : Obtenir le profil de l'utilisateur
- **PUT /users/profile** : Mettre à jour le profil de l'utilisateur
- **POST /users/change-password** : Changer le mot de passe

## Validation des Formulaires
L'application implémente une validation complète des formulaires pour garantir que les données saisies par l'utilisateur sont valides avant d'être envoyées au backend. Les validations incluent :

### Connexion
- Nom d'utilisateur requis
- Mot de passe requis

### Inscription - Informations Personnelles
- Prénom requis
- Nom requis
- Date de naissance requise
- Nationalité requise
- Numéro de téléphone requis
- Adresse requise
- Contact d'urgence requis

### Inscription - Informations Professionnelles
- Niveau d'éducation requis
- Occupation actuelle requise
- Langues parlées requises
- Compétences pertinentes requises
- Disponibilité pendant AFCAN 2025 requise

### Inscription - Informations du Compte
- Nom d'utilisateur requis
- Email requis et format valide
- Confirmation d'email requise et correspondant à l'email
- Mot de passe requis et minimum 8 caractères
- Confirmation de mot de passe requise et correspondant au mot de passe

## Responsive Design
L'application est conçue pour être entièrement responsive et s'adapter à différentes tailles d'écran :
- **Desktop** : Affichage complet avec mise en page horizontale
- **Tablette** : Adaptation de la mise en page pour les écrans moyens
- **Mobile** : Réorganisation verticale pour les petits écrans

## Personnalisation
Vous pouvez personnaliser l'apparence de l'application en modifiant les variables CSS dans le fichier `src/styles/auth.css`. Les principales variables de couleur sont définies au début du fichier.

## Développement Futur
Voici quelques suggestions pour le développement futur de l'application :
- Implémentation de l'authentification sociale (Google, Facebook)
- Ajout d'une fonctionnalité de récupération de mot de passe
- Amélioration de la gestion des erreurs API
- Ajout de tests unitaires et d'intégration
- Implémentation d'un tableau de bord utilisateur complet

## Remarques pour le Développement Backend
Pour les développeurs backend travaillant sur l'intégration avec cette application frontend :
- Assurez-vous que les points d'API correspondent à ceux utilisés dans l'application
- Implémentez l'authentification basée sur les tokens JWT
- Configurez CORS pour permettre les requêtes depuis le frontend
- Validez les données reçues côté serveur pour une sécurité supplémentaire
