# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy the rest of the application code
COPY src/ ./src/

# Build the TypeScript code
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 8080

# Start the server
CMD ["npm", "start"]