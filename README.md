# chivote

- [Requirements](#requirements)
- [Installation](#installation)
- [Env variables](#env-variables)
- [Management commands](#management-commands)
- [Internationalization](#internationalization)
- [Production use](#production-use)
- [Under the hood](#under-the-hood)
- [References](#references)
- [Todos](#todos)

## Requirements

| Local dependency | Mac setup                                                                                                                         | Ubuntu setup                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| python 3.6       | [🔗](https://docs.python-guide.org/starting/install3/osx/)                                                                        | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-ubuntu-16-04) |
| PostgreSQL       | [🔗](https://www.elliotblackburn.com/installing-postgresql-on-macos-osx/)                                                         | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)                                  |
| pipenv           | [🔗](https://pipenv.readthedocs.io/en/latest/install/#homebrew-installation-of-pipenv)                                            | [🔗](https://pipenv.readthedocs.io/en/latest/install/#pragmatic-installation-of-pipenv)                                                   |
| node             | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos) | [🔗](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)                                             |
| yarn             | [🔗](https://yarnpkg.com/lang/en/docs/install/#mac-stable)                                                                        | [🔗](https://yarnpkg.com/lang/en/docs/install/#debian-stable)                                                                             |

[🔝](#chivote)

## Installation

1. Clone repo
2. Set up postgres database

```
sudo su - postgres
psql
CREATE USER sample_user WITH PASSWORD 'sample_password';
CREATE DATABASE sample_database WITH OWNER sample_user;
ALTER USER sample_user WITH SUPERUSER
```

3. From inside the repo, create .env and add postgres credentials

```
touch .env
echo "PG_NAME = sample_database
PG_USER = sample_user
PG_PASSWORD = sample_password" >> .env
```

4. Install python requirements and activate virtualenv with `pipenv sync && pipenv shell`
5. Load initial database:

```
./manage.py migrate
./manage.py createsuperuser
./manage.py collectstatic
```

6. Build frontend with `yarn --cwd ./frontend install`

~ ~ ~

**If you want to match your local db to the production db**, here's an alias command to drop into `~/.bash_profile` or a similar terminal management file.

```bash
alias cvdb='pg_dump chivote > /tmp/chivote.bk.psql; dropdb chivote; ssh -i /path/to/chivote.pem ubuntu@ec2-54-236-199-60.compute-1.amazonaws.com pg_dump chivote > /tmp/chivote.psql; createdb chivote; psql chivote < /tmp/chivote.psql'
```

[🔝](#chivote)

## Env variables

In production, you need a `.env` file in the root directory with the following filled out:

```sh
DJANGO_SECRET_KEY=
# DJANGO_DEBUG= # uncomment to enable debug mode
DJANGO_URL_ENDPOINT=

PG_NAME=
PG_USER=
PG_PASSWORD=

## @datadesk/django-bakery settings ##
AWS_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
ALLOW_BAKERY_AUTO_PUBLISHING=
# BAKERY_GZIP= # uncomment to gzip baked files

BALLOT_READY_API_KEY=
BALLOT_READY_API_URL=

# CELERY_BROKER_URL= # uncomment and fill in if using celery
```

[🔝](#chivote)

## Management commands

### Launch dev environment: `./manage.py serve`

Launches dev environment at http://localhost:8000/. It simply starts the various servers in one terminal instead of three.

```python
# this is pseudo python describing the task

devCommands = [
    # redis server
    'redis-server',

    # celery worker
    'celery -A chivote worker -l info',

    # frontend webpack-dev-server w/ hot module replacement
    'yarn --cwd ./frontend start',

    # django-livereload-server, to automatically reload browser on a Django file change
    'python manage.py livereload --settings=chivote.settings.local',

    # django server
    'python manage.py runserver --settings=chivote.settings.local',
]

for command in devCommands:
    # do command
    ...
```

### Launch production environment: `./manage.py serve --production`

Launches production environment at http://localhost:8000/. It simply runs the necessary builders to bake the app out as flat files, then serves those files.

```python
# this is pseudo python describing the task

prodCommands = [
    # frontend production build
    'yarn --cwd ./frontend build',

    # django collectstatic (incl. built frontend)
    'python manage.py collectstatic --no-input --settings=chivote.settings.production',

    # django-bakery build
    'python manage.py build --settings=chivote.settings.production',

    # django-bakery production server
    'python manage.py buildserver --settings=chivote.settings.production',
]

for command in prodCommands:
    # do command
    ...
```

### Rebuild packages and assets: `./manage.py rebuild`

Install packages (Django and Yarn) and rebuild the frontend. If you've updated your pipfile, you'll need to run `pipenv install` first.

```python
# this is pseudo python describing the task

commands = [
    # install frontend packages
    'yarn --cwd ./frontend install',

    # build frontend bundle
    'yarn --cwd ./frontend build',

    # run migrations
    'python manage.py migrate',

    # collect frontend bundle to be served in django
    'python manage.py collectstatic --no-input',

    # django-bakery build
    'python manage.py build --settings=chivote.settings.production',
]

for command in commands:
    # do command
    ...
```

[🔝](#chivote)

## Internationalization

**TODO**: explain django side and frontend side

From inside `frontend`, run `yarn build:langs` to generate `public/locales/data.json`. This compiles `public/locales/messages/*` into a single message file, as well as any locale files that are in `public/locales`.

**TODO**: Automate locale file generation (e.g. `public/locales/es.json`).

[🔝](#chivote)

## Production use

### Server

Our app is deployed on an EC2 instance. I used [these instructions from DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04) for setting it up. For continuing maintenance and troubleshooting, read through those instructions' [troubleshooting section ](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04#troubleshooting-nginx-and-gunicorn).

### Celery

Instructions for Celery setup and maintenance are documented in [the pull request](https://github.com/thechicagoreporter/chivote/pull/11) that first integrated Celery.

### BallotReady data

BallotReady data is loaded live from their API via a proxy API we've set up in order to hide our BallotReady API key and monitor API use. Our API is hosted on AWS API Gateway.

### Updating code

The [public site](https://chi.vote/) is hosted on an S3 bucket. On the server, django-bakery and celery manage automatic data updates of the site. The one caveat here is if a data update happens _while_ code is also being updated, there's a good chance that the S3 version will get all kinds of mucked up.

With that in mind, here's the process for updating code. Eventually this should be automated, but for now, you need to run each command in sequence:

```bash
sudo supervisorctl stop chivote_worker # stops celery server from uploading to s3
git pull
pipenv install
pipenv run ./manage.py rebuild && pipenv run ./manage.py publish # should only publish after a successful build
sudo supervisorctl start chivote_worker # resume celery server uploads to s3
```

[🔝](#chivote)

## Under the hood

### Baking

We're using [`datadesk/django-bakery`](https://github.com/datadesk/django-bakery) to bake out our app as flat files and to publish those files to s3. See [their docs](https://django-bakery.readthedocs.io/en/latest/gettingstarted.html) for further instruction.

### Connecting Django and React

Loading the frontend files into Django templates is accomplished with [`owais/django-webpack-loader`](https://github.com/owais/django-webpack-loader).

In the frontend, Webpack creates a stats file called `webpack-stats.json`. Django uses that stats file to load webpack chunks in a template through the function `render_bundle [chunk_name]`.

We pass data from Django to React by declaring global variables in our Django templates. I adapted this pattern from [`MasterKale/django-cra-helper`](https://github.com/MasterKale/django-cra-helper).

Overview of flow:

- **View**: Exposes context data for Template
- **Template**: Exposes context data as JavaScript vars for Index, attaches frontend files from Webpack-Stats
- **Webpack-Stats**: References built output of compiled Index
- **Index**: Renders Component, w/ props
- **Component**: Loaded with props exposed in Template

Full example:

`myapp/views.py` (**View**)

```python
from django.views import generic

class HomepageView(generic.TemplateView):
    """View function for home page of site."""
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context_dict = {
            'env': 'django'
        }

        react_dict = {
            'component': 'App',
            'props': context_dict,
        }
        context.update(react_dict)

        return context
```

`myapp/templates/index.html` (**Template**)

```django
{% load render_bundle from webpack_loader %}

<div id="app"></div>

<script>
  window.component = '{{ component }}';
  window.props = {{ props | json }};
  window.reactRoot = document.getElementById('app');
</script>

{% render_bundle 'main' %}
```

`frontend/webpack-stats.json` (**Webpack-Stats**)

```js
// this all builds from webpack, with an entry of frontend/src/index.js
{
  "status":"done",
  "publicPath":"http://localhost:3000/static/dist/",
  "chunks":{
    "main":[{
      "name":"main-4a3ebe49ac244ea51884.js",
      "publicPath":"http://localhost:3000/static/dist/main-4a3ebe49ac244ea51884.js",
      "path":"/Users/pjudge/bettergov/projects/chivote/frontend/dist/main-4a3ebe49ac244ea51884.js"
    }]
  }
}
```

`frontend/src/index.js` (**Index**)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Maintain a simple map of React components to make it easier for
 * Django to reference individual components.
 */

const pages = {
  App
};

/**
 * If Django hasn't injected these properties into the HTML
 * template that's loading this script then we're viewing it
 * via the create-react-app liveserver
 */
window.component = window.component || 'App';
window.props = window.props || { env: 'create-react-app' };
window.reactRoot = window.reactRoot || document.getElementById('root');

ReactDOM.render(
  React.createElement(pages[window.component], window.props),
  window.reactRoot
);
```

`frontend/src/App.jsx` (**Component**)

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <h2>Env: {this.props.env}</h2>
      </div>
    );
  }
}

export default App;
```

[🔝](#chivote)

## References

This React-in-Django approach is informed by a few articles:

- ["Reconciling Backend Templates with Frontend Components,"](https://hackernoon.com/reconciling-djangos-mvc-templates-with-react-components-3aa986cf510a) Nick Sweeting
- ["Using Webpack transparently with Django + hot reloading React components as a bonus,"](https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/) Owais Lone
- Politico Interactive News on [public-facing apps](https://docs.politicoapps.com/politico-newsroom-developer-guide/infrastructure#public-facing-apps)

[🔝](#chivote)

## Todos

- Optimize frontend bundle
- Server side rendering of frontend

[🔝](#chivote)
