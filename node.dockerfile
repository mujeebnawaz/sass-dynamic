# Use the official Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Create destination directory
RUN mkdir -p /app/sass-server

# Copy sass-server folder to the root folder
COPY ./sass-server /app/sass-server

WORKDIR /app/sass-server

# Install dependencies
RUN npm install

ENV BASE=http://127.0.0.1:3011/
ENV PORT=3011

# Expose port 3000 to the host
EXPOSE 3011

# Start the app
CMD ["npm", "start"]

CMD ["tail", "-f", "/dev/null"]
