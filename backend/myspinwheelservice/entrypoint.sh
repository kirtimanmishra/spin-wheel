#!/bin/bash

# Activate the virtual environment
source .venv/bin/activate

# Run migrations
pdm run migrate

# # Start the Django server
# pdm run runserver 0.0.0.0:8000


.venv/bin/gunicorn \
--bind 0.0.0.0:3008 \
--workers 2 \
--threads 1 \
myspinwheelservice.wsgi:application
