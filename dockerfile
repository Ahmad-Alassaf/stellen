# Stage 1: Build frontend
FROM node:18 as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Build backend
FROM node:18 as backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend .

# Copy frontend build into backend
COPY --from=frontend-builder /app/frontend/build /app/backend/build

# Final Stage: Production Image
FROM node:18-slim

WORKDIR /app

# Copy only the backend with build and production deps
COPY --from=backend-builder /app/backend ./

# Set environment variables and ports
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
