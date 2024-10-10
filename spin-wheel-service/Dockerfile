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

EXPOSE 8000

CMD ["/bin/bash", "-c", "pdm run migrate && pdm run runserver 0.0.0.0:8000"]