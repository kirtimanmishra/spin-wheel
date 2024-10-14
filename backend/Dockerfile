# Use the official Python image as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install PDM
RUN pip install pdm

# Copy all the files to /app
COPY . /app


RUN set -e; \
    pdm venv create -w virtualenv --with-pip --force; \
    . .venv/bin/activate; \
    pdm sync ; 

# Give execute permissions to the entrypoint script
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

# Set the entrypoint to the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]