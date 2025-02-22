# Netflix Clone - Kubernetes Deployment Guide

## 🚀 Fast Start

### 1️⃣ Démarrer Minikube

```bash
minikube start -p netflix-clone
```

Et ajouter le namespace `production`:

```bash
kubectl create namespace production
```

### 2️⃣ Activer l'add-on Ingress

```bash
minikube -p netflix-clone addons enable ingress
```

### 3️⃣ Configurer l'environnement Docker de Minikube

- **macOS** :

  ```bash
  eval $(minikube -p netflix-clone docker-env)
  ```

- **Windows** :

  ```powershell
  & minikube -p netflix-clone docker-env --shell powershell | Invoke-Expression
  ```

### 4️⃣ Construire les images Docker

```bash
docker compose build
```

### 5️⃣ Appliquer les ConfigMaps

```bash
kubectl apply -f k8s/configmaps
```

### 6️⃣ Créer les ConfigMaps pour les fichiers SQL

```bash
kubectl -n production create configmap movies-sql-config --from-file=postgres/movies-init.sql
kubectl -n production create configmap auth-sql-config --from-file=postgres/auth-init.sql
```

### 7️⃣ Déployer les applications

```bash
kubectl apply -f k8s/deployments
```

### 8️⃣ Appliquer les services

```bash
kubectl apply -f k8s/services
```

### 9️⃣ Vérifier les déploiements

```bash
kubectl -n production get pods
```

Tous les pods doivent être en **Running** dans la colonne `STATUS`.

### 🔟 Appliquer Ingress

```bash
kubectl apply -f k8s/ingress
```

## 🌐 Configuration des Hosts

Pour accéder à l'application via `http://teleflix.website` (frontend) et `http://teleflix.api` (autres services), ajoute ces entrées dans le fichier **hosts** :

### Windows

1. **Modifier le fichier `C:\Windows\System32\drivers\etc\hosts`** et ajouter :

   ```bash
   127.0.0.1 teleflix.website
   127.0.0.1 teleflix.api
   ```

   Ensuite, enregistrer le fichier.

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

### Mettre à jour les images

#### 1️⃣ Rebuild des images

```bash
docker compose build
```

#### 2️⃣ Redémarrer le déploiement

```bash
kubectl rollout restart deployment
```

### Mettre à jour les bases de données (exemple pour la base de données `movies-db`)

#### 1️⃣ Renouveler les ConfigMaps

```bash
kubectl delete configmap movies-sql-config
kubectl create configmap movies-sql-config --from-file=postgres/movies-init.sql
```

#### 2️⃣ Supprimer le pod de la base de données

```bash
kubectl delete -f k8s/deployments/movies-db-deployment.yaml
```

#### 3️⃣ Supprimer le Persistent Volume Claim de la base de données

```bash
kubectl delete pvc movies-data-movies-db-0
```

#### 4️⃣ Redémarrer le déploiement de la base de données

```bash
kubectl apply -f k8s/deployments/movies-db-deployment.yaml
```

---

## 🧪 Commandes de Test

### Récuperer les pods

```bash
kubectl get pods
```

### Afficher les logs d'un pod

```bash
kubectl logs <pod_name>
```

### Décrire un pod

```bash
kubectl describe pod <pod_name>
```

### Executer des commandes sur un pod

```bash
kubectl exec -it <pod_name> -- /bin/bash
```
