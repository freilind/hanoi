FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy all website files (HTML, CSS, JS, images, etc.)
COPY . ./

# Configure nginx to handle single page applications (optional, remove if not needed)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

# Build and run commands:
# docker build -t hanoi-web -f config/Dockerfile .
# docker run -p 8080:80 hanoi-web
# http://localhost:8080