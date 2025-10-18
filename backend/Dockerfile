# Use Node 18 official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy rest of the code
COPY . .

# Expose the app’s internal port (Render expects 10000 by default)
EXPOSE 10000

# Set environment variable for port
ENV PORT=10000

# Start the app
CMD ["node", "index.js"]
