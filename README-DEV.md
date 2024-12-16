***Fast test:***
start minikube:

```bash
minikube start
```

To be updates, the images must be build from the minicubs docker:

* windows:

  ```bash
  & minikube -p minikube docker-env --shell powershell | Invoke-Expression
  ```

then build the images:

```bash
docker compose build
```

apply the configmaps:

```bash
kubectl apply -f k8s/configmaps
```
create configmaps for sql files:

```bash
kubectl create configmap movies-init-config --from-file=postgres/movies-init.sql
kubectl create configmap auth-init-config --from-file=postgres/auth-init.sql
```

apply the deployments:

```bash
kubectl apply -f k8s/deployments
```

apply the services:

```bash
kubectl apply -f k8s/services
```

verify the deployments:

```bash
kubectl get pods
```

wee need to see _Running_ appears in the STATUS column for each pod.

to access the frontend, we need to get the external IP of the frontend service:

```bash
minikube service frontend-external 
```

to test the other services, we need to port-forward the services to our local machine:

```bash
kubectl port-forward service/auth-service 8080:5000
```

***Update deployment***
re-build the images:

```bash
docker compose build
```

If you need to reload the deployment:

```bash
kubectl rollout restart deployment
```

