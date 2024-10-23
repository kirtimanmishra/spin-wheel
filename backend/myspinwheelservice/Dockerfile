# Use a specific architecture to avoid compatibility issues
FROM --platform=linux/amd64 python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Install PDM
RUN pip install pdm

# Copy only necessary files to reduce image size
COPY . /app

# Create virtual environment and install dependencies
RUN pdm venv create -w virtualenv --with-pip && \
    . .venv/bin/activate && \
    pdm sync && \
    pip install --no-cache-dir gunicorn

# Make the entrypoint.sh script executable
RUN chmod +x /app/entrypoint.sh

# Expose port 8000
EXPOSE 8000

# Use the full path for ENTRYPOINT
ENTRYPOINT ["/app/entrypoint.sh"]
