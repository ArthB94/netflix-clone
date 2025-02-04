# 📺 Netflix Clone Simulation  

Ce projet est une simulation d'un clone de **Netflix**, conçu pour explorer les concepts de **microservices, conteneurisation et orchestration** à l'aide de **Kubernetes, NGINX Ingress et Docker**.  
Le projet inclut :  
- Deux **microservices** (`auth-service` et `movies-service`), chacun avec sa propre base de données **PostgreSQL**  
- Une **interface frontale** développée avec **Next.js**  
- Une **API Gateway** utilisant **NGINX Ingress** pour le routage  

---

## 🚀 Fonctionnalités principales  

- **Microservices** :  
  - `auth-service` : Gère l'authentification des utilisateurs.  
  - `movies-service` : Gère les informations des films.  
- **Frontend** : Une interface utilisateur **Next.js** qui consomme les API des microservices.  
- **API Gateway** : Utilisation de **Ingress NGINX** pour le routage des services.  
- **Kubernetes** : Orchestration des conteneurs pour chaque composant.  

---

## 📁 Architecture du projet  

```plaintext
netflix-clone/
├── auth-service/         # Microservice pour l'authentification
├── movies-service/       # Microservice pour les films
├── frontend/             # Application Next.js
├── k8s/                  # Configurations Kubernetes
│   ├── configmaps/       # Configuration des variables d'environnement
│   ├── deployments/      # Déploiement des services
│   ├── services/         # Configuration des services Kubernetes
│   └── ingress/          # Configuration Ingress pour le routage
├── postgres/             # Scripts d'initialisation des bases de données
└── README.md             # Documentation
```

---

## 🔧 Prérequis  

### 🛠 Outils nécessaires  

- **Docker**  
- **Kubernetes** (Minikube recommandé pour un environnement local)  
- **Kubectl**  
- **Ingress NGINX**  
- **Node.js** (pour tester le frontend et les microservices localement)  

### 📥 Clonage du projet  

```bash
git clone https://github.com/votre-repo/netflix-clone.git
cd netflix-clone
```

---

## 📦 Déploiement  

### **1️⃣ Démarrer Minikube**  

```bash
minikube start -p netflix-clone
```

Activer l'add-on **Ingress** :  

```bash
minikube -p netflix-clone addons enable ingress
```

---

### **2️⃣ Configurer l'environnement Docker**  

Utiliser Docker de Minikube pour construire les images :  

- **macOS / Linux** :  

  ```bash
  eval $(minikube -p netflix-clone docker-env)
  ```  

- **Windows (PowerShell)** :  

  ```powershell
  & minikube -p netflix-clone docker-env --shell powershell | Invoke-Expression
  ```  

---

### **3️⃣ Construire les images Docker**  

```bash
docker compose build
```

---

### **4️⃣ Appliquer les ConfigMaps**  

```bash
kubectl apply -f k8s/configmaps
```

Créer des **ConfigMaps** pour les fichiers SQL :  

```bash
kubectl create configmap movies-sql-config --from-file=postgres/movies-init.sql
kubectl create configmap auth-sql-config --from-file=postgres/auth-init.sql
```

---

### **5️⃣ Déployer les services**  

Déployer les **microservices et le frontend** :  

```bash
kubectl apply -f k8s/deployments
```

Configurer les **services Kubernetes** :  

```bash
kubectl apply -f k8s/services
```

---

### **6️⃣ Vérifier le bon déploiement**  

```bash
kubectl get pods
```

Les pods doivent être en **Running** dans la colonne `STATUS`.

---

### **7️⃣ Appliquer Ingress**  

```bash
kubectl apply -f k8s/ingress
```

---

## 🌍 Accès à l'application  

Configurer le fichier `hosts` pour accéder aux services via des noms de domaine :  

### **Windows**  

1. **Modifier le fichier `C:\Windows\System32\drivers\etc\hosts`** et ajouter :  

   ```bash
   127.0.0.1 teleflix.website
   127.0.0.1 teleflix.api
   ```
   
2. **Activer un tunnel vers le cluster Minikube** :  

   ```bash
   minikube -p netflix-clone addons enable ingress-dns
   minikube -p netflix-clone tunnel 
   ```

3. **Accéder aux services** :  
   - **Frontend** : [http://teleflix.website](http://teleflix.website)  
   - **API** : [http://teleflix.api](http://teleflix.api)  

---

## 🔄 Mise à jour d'un déploiement  

### 1️⃣ Rebuild des images  

```bash
docker compose build
```

### 2️⃣ Redémarrer le déploiement  

```bash
kubectl rollout restart deployment
```

---

## 🔬 Tests locaux  

### 🏗 Démarrage avec Docker Compose  

Pour tester les **microservices et le frontend localement** :  

```bash
docker-compose up
```

Accéder à l'application via **`http://localhost:3000`**.

---

### 📡 Tests des API  

Utiliser **Postman** ou un autre outil pour tester les endpoints des microservices.

---

## 🛠 Outils utilisés  

- **Docker** : Conteneurisation des services.  
- **Kubernetes** : Orchestration et déploiement des conteneurs.  
- **NGINX Ingress** : Reverse proxy pour le front-end et les microservices.  
- **PostgreSQL** : Bases de données pour les microservices.  
- **Node.js & Express** : Back-end des microservices.  
- **Next.js** : Front-end pour l'application.  

---

## ✨ Auteurs  

- **Arthur BILLEBAUT** - Étudiant à **EFREI Paris**  
- **Hugo Panel** - Étudiant à **EFREI Paris**  
