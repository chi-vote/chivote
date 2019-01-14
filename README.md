# chivote

## Requirements

| Local dependency | Mac setup                                                                                                                         | Ubuntu setup                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| python 3.6       | [🔗](https://docs.python-guide.org/starting/install3/osx/)                                                                        | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-ubuntu-16-04) |
| PostgreSQL       | [🔗](https://www.elliotblackburn.com/installing-postgresql-on-macos-osx/)                                                         | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)                                  |
| pipenv           | [🔗](https://pipenv.readthedocs.io/en/latest/install/#homebrew-installation-of-pipenv)                                            | [🔗](https://pipenv.readthedocs.io/en/latest/install/#pragmatic-installation-of-pipenv)                                                   |
| node             | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos) | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)                                             |
| yarn             | [🔗](https://yarnpkg.com/lang/en/docs/install/#mac-stable)                                                                        | [🔗](https://yarnpkg.com/lang/en/docs/install/#debian-stable)                                                                             |

## Installation

1. Clone repo
2. Set up postgres database

```
psql
CREATE USER sample_user WITH PASSWORD 'sample_password';
CREATE DATABASE sample_database WITH OWNER sample_user;
```

3. From inside the repo, create .env and add postgres credentials

```
touch .env
echo "PG_NAME = sample_database
PG_USER = sample_user
PG_PASSWORD = sample_password" >> .env
```

4. Install python requirements and activate virtualenv with `pipenv sync && pipenv shell`
5. Run migrations and start devserver:

```
./manage.py migrate
./manage.py createsuperuser
./manage.py loaddata catalog
```

6. Build frontend with `yarn --cwd ./frontend install`

## Tasks

### `./manage.py serve`

**Launches dev environment** at http://localhost:8000/ by calling...

Frontend dev server (w/ HMR):

```
yarn --cwd ./frontend start
```

Django livereload server:

```
python manage.py livereload --settings=chivote.settings.local
```

Django dev server:

```
python manage.py runserver --settings=chivote.settings.local
```

### `./manage.py serve --production`

**Launches production environment** at http://localhost:8000/ by calling...

Frontend production build:

```
yarn --cwd ./frontend build
```

Django-bakery build:

```
python manage.py build --settings=chivote.settings.production
```

Django-bakery production server:

```
python manage.py buildserver --settings=chivote.settings.production
```

We're using [`django-bakery`](https://github.com/datadesk/django-bakery) to bake out our app to s3. Please see [their docs](https://django-bakery.readthedocs.io/en/latest/gettingstarted.html) for further instructions.

## Todos

* Code-splitting
* .css support
