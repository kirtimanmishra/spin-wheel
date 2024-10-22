#!/bin/bash

. .venv/bin/activate

pdm run makemigrations
pdm run migrate

.venv/bin/gunicorn \
--bind 0.0.0.0:8000 \
--workers 2 \
--threads 1 \
myspinwheelservice.wsgi:application
