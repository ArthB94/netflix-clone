# Netflix Clone Simulation

Ce projet est une simulation d'un clone de Netflix. Il est conçu pour apprendre et pratiquer les concepts de microservices, de conteneurisation, et d'orchestration à l'aide de Kubernetes, Istio et NGINX. Le projet inclut deux microservices (auth-service et films-service), chacun avec sa propre base de données PostgreSQL, ainsi qu'une interface frontale développée avec Next.js.

---

## **Fonctionnalités principales**

- **Microservices** :
  - `auth-service` : Gère l'authentification des utilisateurs.
  - `films-service` : Gère les informations sur les films.
- **Frontend** : Une interface utilisateur Next.js qui consomme les API des microservices.
- **API Mesh** : Intégration d'Istio pour gérer le routage des requêtes et sécuriser les communications entre les services.
- **Kubernetes** : Orchestration des conteneurs pour chaque composant.

---

## **Architecture du projet**

```plaintext
netflix-clone/
├── auth-service/          # Microservice pour l'authentification
├── films-service/         # Microservice pour les films
├── frontend/              # Application Next.js
├── k8s/                   # Configurations Kubernetes
│   ├── deployments/       # Fichiers de déploiement pour les services
│   ├── services/          # Configurations des services Kubernetes
│   └── istio/             # Configurations Istio (gateway, virtual-services, etc.)
├── postgres/              # Scripts d'initialisation des bases de données
└── README.md              # Documentation
```

---

## **Prérequis**

1. **Outils nécessaires :**

   - Docker
   - Kubernetes (Minikube ou Kind recommandé pour un environnement local)
   - Kubectl
   - Istio (installé sur le cluster Kubernetes)
   - Node.js (pour les tests locaux du front-end et des microservices)
2. **Clonage du projet** :

   ```bash
   git clone https://github.com/votre-repo/netflix-clone.git
   cd netflix-clone
   ```

---

## **Instructions de déploiement**

### **1. Configuration des environnements**

- Assurez-vous d'avoir configuré les variables d'environnement pour chaque service dans un fichier `.env`.
- Exemple pour `auth-service` :

  ```env
  DATABASE_URL=postgres://user:password@auth-db:5432/auth
  JWT_SECRET=your_jwt_secret
  ```

### **2. Construction des conteneurs Docker**

Construisez les images Docker pour chaque service :

```bash
cd auth-service && docker build -t auth-service .
cd ../films-service && docker build -t films-service .
cd ../frontend && docker build -t frontend .
```

### **3. Déploiement Kubernetes**

- Créez les variables d'environnement :

  ```bash
  kubectl apply -f k8s/configmaps
  ```
- Déployez les bases de données PostgreSQL :

  ```bash
  kubectl apply -f k8s/deployments/auth-db-deployment.yaml
  kubectl apply -f k8s/deployments/films-db-deployment.yaml
  ```
- Déployez les microservices et le front-end :

  ```bash
  kubectl apply -f k8s/deployments/auth-deployment.yaml
  kubectl apply -f k8s/deployments/films-deployment.yaml
  kubectl apply -f k8s/deployments/frontend-deployment.yaml
  ```
- Configurez les services Kubernetes :

  ```bash
  kubectl apply -f k8s/services/auth-service.yaml
  kubectl apply -f k8s/services/films-service.yaml
  kubectl apply -f k8s/services/frontend-service.yaml
  ```
- Ajoutez Istio pour le routage et le mesh API :

  ```bash
  kubectl apply -f k8s/istio/gateway.yaml
  kubectl apply -f k8s/istio/virtual-services.yaml
  ```

### **4. Accès à l'application**

- Une fois le déploiement terminé, obtenez l'URL publique :

  ```bash
  kubectl get svc -n istio-system
  ```
- Accédez à l'application via cette URL.

---

## **Tests locaux**

### **1. Démarrage avec Docker Compose**

Pour tester rapidement les microservices et le front-end localement :

```bash
docker-compose up
```

Accédez ensuite à l'application via `http://localhost:3000`.

### **2. Tests des API**

Utilisez Postman ou un autre outil pour tester les endpoints des microservices.

---

## **Outils utilisés**

- **Docker** : Conteneurisation des services.
- **Kubernetes** : Orchestration et déploiement des conteneurs.
- **Istio** : Gestion du maillage de services (API mesh).
- **NGINX** : Reverse proxy pour le front-end.
- **PostgreSQL** : Bases de données pour les microservices.
- **Node.js & Express** : Back-end des microservices.
- **Next.js** : Front-end pour l'application.

---

## **Auteurs**

- **Arthur BILLEBAUT** - Étudiant à EFREI Paris
- **Hugo Panel** - Étudiant à EFREI Paris

---
