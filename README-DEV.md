# Netflix Clone - Kubernetes Deployment Guide  

## 🚀 Fast Test  

### 1️⃣ Démarrer Minikube  

```bash
minikube start -p teleflix-cluster
```

### 2️⃣ Activer l'add-on Ingress  

```bash
minikube -p teleflix-cluster addons enable ingress
```

### 3️⃣ Configurer l'environnement Docker de Minikube  

- **macOS** :  

  ```bash
  eval $(minikube -p teleflix-cluster docker-env)
  ```  

- **Windows** :  

  ```powershell
  & minikube -p teleflix-cluster docker-env --shell powershell | Invoke-Expression
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
kubectl create configmap movies-sql-config --from-file=postgres/movies-init.sql
kubectl create configmap auth-sql-config --from-file=postgres/auth-init.sql
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
kubectl get pods
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
    minikube -p teleflix-cluster addons enable ingress-dns
    minikube -p teleflix-cluster tunnel 
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
