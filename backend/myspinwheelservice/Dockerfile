FROM python:3.11-slim

# Set the working directory to /app
WORKDIR /app

# Install PDM
RUN pip install pdm

# Copy all files to /app
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

# Use relative path for ENTRYPOINT to start ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
