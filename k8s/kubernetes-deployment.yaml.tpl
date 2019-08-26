apiVersion: apps/v1
kind: Deployment
metadata:
  name: personal-site-client
spec:
  replicas: 1
  selector:
    matchLabels:
      component: personal-site-client
  template:
    metadata:
      labels:
        component: personal-site-client
    spec:
      containers:
        - name: personal-site-client
          image: gcr.io/_CONTAINER_PROJECT_ID/_REPO_NAME:_SHORT_SHA
          ports:
            - containerPort: 3000
        
