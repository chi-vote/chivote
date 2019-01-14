# chivote

## Requirements

python 3.6\
django 2.1\
postgres\
psycopg2

## Installation

### Django

1. Clone repo
2. Set up postgres database

```
psql
CREATE USER sample_user WITH PASSWORD 'sample_password';
CREATE DATABASE sample_database WITH OWNER sample_user;
```

3. From inside the repo, create .env and add postgres credentials

```
cd chivote
touch .env
echo "PG_NAME = sample_database
PG_USER = sample_user
PG_PASSWORD = sample_password" >> .env
```

4. Install python requirements and activate virtualenv with `pipenv sync && pipenv shell`
5. Run migrations and start devserver:

```
./manage.py migrate
./manage.py loaddata catalog
./manage.py runserver
```
