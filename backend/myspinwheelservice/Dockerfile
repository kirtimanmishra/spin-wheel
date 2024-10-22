FROM python:3.11-slim

WORKDIR /app

# Install PDM
RUN pip install pdm

COPY . /app

# Create virtual environment
RUN pdm venv create -w virtualenv --with-pip --force

# Install dependencies
RUN . .venv/bin/activate && pdm sync && pip install --no-cache-dir gunicorn

# Make entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose port 8000
EXPOSE 8000

# Set the entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
