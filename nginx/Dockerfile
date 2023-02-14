FROM python:3.8.6
FROM nginx:1.19.6-alpine
FROM nginx:1.19.6-alpine


COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
RUN apt-get update \
    && apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip3 install --upgrade pip
COPY ./config/ ./
RUN pip3 install -r requirements.txt
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh
RUN pip3 install gunicorn
