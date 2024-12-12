***Dev images***
To be updates, the images must be build from the minicubs docker:

* windows:

  ```bash
  & minikube -p minikube docker-env --shell powershell | Invoke-Expression
  ```

then build the images:

```bash
docker compose build
```

and reload the deployments:

```bash
kubectl rollout restart deployment
```

***Fast test:***
start minikube:

```bash
minikube start
```

apply the configmaps:

```bash
kubectl apply -f k8s/configmaps
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

