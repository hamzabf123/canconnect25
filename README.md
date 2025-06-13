# CanConnect25 - Documentation du Projet

## Aperçu

Bienvenue sur CanConnect25, une plateforme pensée pour faciliter et améliorer la coordination entre les bénévoles, les organisateurs et les fans lors d’événements tels que la CAN 2025.

Ce projet a été réalisé par des étudiants en 3ème année de licence en informatique . Il vise à répondre à des problématiques concrètes liées à l'organisation logistique lors des grands événements sportifs — en mettant un accent particulier sur l’expérience des bénévoles. Cette plateforme propose un point d’accès centralisé aux informations essentielles : plannings, rôles, lieux d’affectation, etc.., à travers une interface simple et intuitive.

## Fonctionnalités

- Page de connexion avec validation des formulaires
- Processus d'inscription en plusieurs étapes (informations personnelles, professionnelles et du compte)
- Validation complète des formulaires
- Interface utilisateur moderne et responsive
- Intégration API avec axios pour la communication avec le backend
- Affectation des rôles pour les bénévoles
- Routes protégées nécessitant une authentification
- Affichage des horaires et événements (matchs, réunions)
- Créer des missions et affecter des volontaires à un organisateur.

## Technologies Utilisées

- React (JavaScript standard)
- CSS standard
- Tailwind CSS
- Axios pour les requêtes API
- React Router pour la navigation
- REST API 
- Java avec Jakarta EE (anciennement Javax)
- MYSQL

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


## Responsive Design

L'application est conçue pour être entièrement responsive et s'adapter à différentes tailles d'écran :
- **Desktop** : Affichage complet avec mise en page horizontale
- **Tablette** : Adaptation de la mise en page pour les écrans moyens
- **Mobile** : Réorganisation verticale pour les petits écrans

## Développement Futur

-Ajout de plusieurs langues africaines pour une meilleure accessibilité et inclusion
-Créer une application mobile pour la plateforme.
-Intégration de nouveaux services utiles aux bénévoles (réservations de transport, hébergement, restauration, etc.)
-Amélioration de l’expérience utilisateur pour qu’un bénévole n’ait besoin que d’une seule application pour accomplir toutes ses missions, sans avoir recours à d'autres outils externes
