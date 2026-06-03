# Containerization Using Docker and Deployment on AWS EC2

## Overview

This project demonstrates the containerization of a portfolio website using Docker and its deployment on an AWS EC2 virtual machine. The website is served using the Nginx web server inside a Docker container.

## Objective

* Create a Docker image for the portfolio website.
* Run the website inside a Docker container.
* Deploy the container on an AWS EC2 instance.
* Make the website accessible through a public IP address.

---

## Technologies Used

* Docker
* Nginx
* AWS EC2 (Ubuntu Server)
* Git & GitHub
* Linux Terminal

---

## Project Structure

```text
KavishBorse_Portfolio/
│
├── Dockerfile
├── index.html
├── styles.css
├── main.js
├── README.md
└── assets/
```

## Dockerfile

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
```

## Local Deployment Steps

### Build Docker Image

```bash
docker build -t portfolio-website .
```

### Verify Image

```bash
docker images
```

### Run Container Locally

```bash
docker run -d -p 8080:80 portfolio-website
```

### Access Website

```text
http://localhost:8080
```

---

## AWS EC2 Deployment

### Step 1: Launch EC2 Instance

* Ubuntu Server
* t3.micro instance
* Security Group:

  * SSH (Port 22)
  * HTTP (Port 80)

### Step 2: Connect to EC2

```bash
ssh -i portfolio-key.pem ubuntu@<PUBLIC_IP>
```

### Step 3: Install Docker and Git

```bash
sudo apt update
sudo apt install docker.io git -y

sudo systemctl start docker
sudo systemctl enable docker
```

### Step 4: Clone Repository

```bash
git clone https://github.com/KavishBorse/KavishBorse_Portfolio.git
cd KavishBorse_Portfolio
```

### Step 5: Build Docker Image

```bash
sudo docker build -t portfolio-website .
```

### Step 6: Run Docker Container

```bash
sudo docker run -d -p 80:80 portfolio-website
```

### Step 7: Verify Running Container

```bash
sudo docker ps
```

### Step 8: Access Website

```text
http://13.206.110.242
```

---

## Output

The portfolio website was successfully:

* Containerized using Docker
* Served using Nginx
* Deployed on AWS EC2
* Made publicly accessible through the EC2 public IP

---

## Author

**Kavish Sandip Borse**

B.Tech Computer Science Engineering

MIT Art, Design and Technology University (MIT-ADTU), Pune

GitHub: https://github.com/KavishBorse
