# Netflix Clone - Kubernetes Deployment Guide

## 🚀 Fast Start

### 1️. Démarrer Minikube

```bash
minikube start -p netflix-clone
```

Et ajouter le namespace `production`:

### 2️. Create the production namespace

```bash
kubectl create namespace production
```

### 3. Apply the RBAC roles and bindings

```bash
kubectl apply -f k8s/rbac/production/1-roles
kubectl apply -f k8s/rbac/production/2-role-bindings
```

### 4. Activer l'add-on Ingress

```bash
minikube -p netflix-clone addons enable ingress
```

### 5. Configurer l'environnement Docker de Minikube

- **macOS** :

  ```bash
  eval $(minikube -p netflix-clone docker-env)
  ```

- **Windows** :

  ```powershell
  & minikube -p netflix-clone docker-env --shell powershell | Invoke-Expression
  ```

### 6. Construire les images Docker

```bash
docker compose build
```

### 7. Appliquer les ConfigMaps

```bash
kubectl apply -f k8s/configmaps
```

### 8. Créer les ConfigMaps pour les fichiers SQL

```bash
kubectl -n production create configmap movies-sql-config --from-file=postgres/movies-init.sql
kubectl -n production create configmap auth-sql-config --from-file=postgres/auth-init.sql
```

### 9. Déployer les applications

```bash
kubectl apply -f k8s/deployments
```

### 10. Appliquer les services

```bash
kubectl apply -f k8s/services
```

### 11. Vérifier les déploiements

```bash
kubectl -n production get pods
```

Tous les pods doivent être en **Running** dans la colonne `STATUS`.

### 12. Appliquer Ingress

```bash
kubectl apply -f k8s/ingress
```

---

## 🌐 Configuration des Hosts

Pour accéder à l'application via `http://teleflix.website` (frontend) et `http://teleflix.api` (autres services), ajoute ces entrées dans le fichier **hosts** :

### Windows

1. **Modifier le fichier `C:\Windows\System32\drivers\etc\hosts`** et ajouter :

   ```
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

## 🔐 Test des autorisations avec RBAC

Pour vérifier que les autorisations fonctionnent, nous pouvons respectivement utiliser les paramètres `--as` et `--as-group` pour effectuer une action avec les droits d'un utilisateur spécifique et d'un group spécifique.

Pour vérifier que le groupe readers a bien accès à la lecture, nous pouvons par exemple exécuter :

```bash
kubectl -n production get pods --as=test-user --as-group=random-group # Will fail
kubectl -n production get pods --as=test-user --as-group=readers # Will succeed
kubectl -n production get pods --as=test-user --as-group=admins # Will succeed too
```

Pour tester les autorisations des administrateurs, nous pouvons tenter de supprimer un pod.

```bash
kubectl -n production get pods # Get list of pods and choose one to delete

kubectl -n production delete pod <pod-name> --as=test-user --as-group=random-group # Will fail
kubectl -n production delete pod <pod-name> --as=test-user --as-group=readers # Will fail
kubectl -n production delete pod <pod-name> --as=test-user --as-group=admins # Will succeed
```

Si la commande a fonctionnée pour les administrateurs, la ligne "pod <pod-name> deleted" devrait être affichée.
Remarque : le pod sera automatiquement recréé et s'affichera donc à nouveau dans la liste des pods.

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
