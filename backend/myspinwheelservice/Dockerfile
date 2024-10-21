FROM python:3.11-slim

WORKDIR /app

# Install PDM
RUN pip install pdm

COPY . /app

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000


RUN set -e; \
    pdm venv create -w virtualenv --with-pip --force; \
    . .venv/bin/activate; \
    pdm sync ; \
    pip install --no-cache-dir gunicorn; 


ENTRYPOINT ["/app/entrypoint.sh"]