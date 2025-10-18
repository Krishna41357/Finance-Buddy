# Use official Node.js 18 image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files including .env
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the app
CMD ["node", "index.js"]
