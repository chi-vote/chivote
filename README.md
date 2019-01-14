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

### Frontend

1. Run `cd frontend && yarn i`
2. Start the dev server with the command `yarn start`
3. Build the production bundle with the command `yarn build`

**TODO**: Build in code-splitting
**TODO**: Need style support

## Tasks

These are located in `apps/core/management/commands/serve.py`

### Launch dev environment: `./manage.py serve`

Launches dev environment including...

**Frontend dev server (w/ HMR):**

```
yarn --cwd ./frontend start
```

**Django livereload server:**

```
python manage.py livereload --settings=chivote.settings.local
```

**Django dev server:**

```
python manage.py runserver --settings=chivote.settings.local
```

### Launch production environment: `./manage.py serve --production`

Launches production environment including...

**Frontend production build:**

```
yarn --cwd ./frontend build
```

**Django-bakery build:**

```
python manage.py build --settings=chivote.settings.production
```

**Django-bakery production server:**

```
python manage.py buildserver --settings=chivote.settings.production
```

We're using [`django-bakery`](https://github.com/datadesk/django-bakery) to bake out our app to s3. Please see [their docs](https://django-bakery.readthedocs.io/en/latest/gettingstarted.html) for further instructions.
