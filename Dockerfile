# Dockerfile for Railway deployment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY TVMSFB/backend/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy backend source code
COPY TVMSFB/backend/ .

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3002/api/health || exit 1

# Start the application
CMD ["npm", "start"]
