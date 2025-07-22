# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy root package.json and install concurrently
COPY package.json package-lock.json ./
RUN npm install

# Copy and build frontend
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Copy backend files
COPY backend ./backend
RUN cd backend && npm install 

# Copy build folder into backend (to serve React via Express)
RUN cp -r frontend/build backend/

# Set working directory to backend
WORKDIR /app/backend

# Expose port required by Google Cloud Run
EXPOSE 8080

# Set environment variable PORT to 8080 (Cloud Run will override it)
ENV PORT=8080

# Start the server (make sure server.js uses process.env.PORT)
CMD [ "npm","run","start" ]
