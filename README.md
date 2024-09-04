# Zipurl Server Application

This repository is for server application for URL shortener service, built with Node.js and MongoDB for persistance storage. It provides API endpoints for creating new shortened URLs, and looking up specified URL, and redirecting to the specified URL.

This repository works with URL shortener client, built with Next.js. Follow instruction to setup URL shortener client in [this repository](https://github.com/fsoegiono/zipurl-frontend).

## Features

- RESTful API for URL shortening
- MongoDB integration for storage
- In-memory cache for quick access to frequently used URLs
- Containerized with Docker for easy deployment, development, and consistency across environments
- CI/CD pipeline using GitHub Actions
- Deployed on AWS App Runner

## Live Web Application

Zipurl server is available online. You can find it here: https://h5mpnxcp5x.us-west-2.awsapprunner.com.

## Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose
- MongoDB (v5.0.14 or later)
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

## Local Development

1. Clone the repository:

   ```
   git clone https://github.com/fsoegiono/zipurl-server
   cd zipurl-server
   ```

2. Run the container:

   ```
   MONGODB_URI=mongodb://mongodb:27017 PORT=8080 BASE_URL=http://localhost:8080 ALLOWED_ORIGIN=http://localhost:3000 docker-compose up
   ```

The server will start on http://localhost:8080.

## API Endpoints

- `POST /api/v1/shorten`: Create new shortened URL
- `GET /:shortCode`: Redirect to the original URL

## Environments

- `MONGODB_URI`: MongoDB URI connection string (e.g. `mongodb://mongodb:27017`)
- `PORT`: Sever port number 8080
- `ALLOWED_ORIGIN`: Comma-separated list of allowed origins for CORS (e.g. `https://www.example1.com,https://www.exampl2.com`)
- `BASE_URL`: Server base URL

## Available Scripts

- `npm run dev`: Runs the app in development mode
- `npm test`: Runs unit and functional test
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline is configured to:

- Run tests
- Build Docker image
- Push the image to AWS Elastic Container Registry (ECR)
- Finally, deployed the application to AWS App Runner

The workflow is defined in `.github/workflows/deploy-ecr.yml`.
