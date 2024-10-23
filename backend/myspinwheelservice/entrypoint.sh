#!/bin/bash
echo "Activating virtual environment..."
. .venv/bin/activate

echo "Running makemigrations..."
pdm run makemigrations

echo "Running migrate..."
pdm run migrate

echo "Starting Gunicorn..."
.venv/bin/gunicorn \
--bind 0.0.0.0:8000 \
--workers 5 \
--threads 2 \
myspinwheelservice.wsgi:application
