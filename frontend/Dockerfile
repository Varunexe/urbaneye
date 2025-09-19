FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for node-gyp and native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Clear npm cache and install with specific flags
RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json
RUN npm install --no-optional

# Copy source code
COPY . .

EXPOSE 5173