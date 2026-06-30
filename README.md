# Port de Plaisance Russell — API de gestion des catways

Application web de gestion des réservations de catways pour la capitainerie du Port de Plaisance Russell.

## 🔗 Liens

- **Application en ligne** : https://devoir-6-port-plaisance-russell.onrender.com
- **Documentation API (Swagger)** : https://devoir-6-port-plaisance-russell.onrender.com/api-docs
- **Dépôt GitHub** : https://github.com/ad-pgn/devoir-6-port-plaisance-russell

## 🔑 Compte de test

- **Email** : admin@port-plaisance.fr
- **Mot de passe** : Admin1234

## 🛠 Stack technique

- Node.js / Express
- MongoDB Atlas / Mongoose
- EJS / Bootstrap 5
- JWT (authentification)
- Swagger (documentation API)

## 🚀 Installation en local

1. Cloner le dépôt
```bash
git clone https://github.com/ad-pgn/devoir-6-port-plaisance-russell.git
cd devoir-6-port-plaisance-russell
```

2. Installer les dépendances
```bash
npm install
```

3. Créer un fichier `.env` à la racine (voir `.env.example`)
```env
PORT=3000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

4. Importer les données d'exemple
```bash
npm run import
```

5. Lancer le serveur en développement
```bash
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

## 📋 Fonctionnalités

- Authentification JWT (login/logout)
- Gestion CRUD des catways
- Gestion CRUD des réservations (sous-ressource des catways)
- Gestion CRUD des utilisateurs
- Tableau de bord avec réservations en cours
- Documentation API interactive (Swagger)