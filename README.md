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

## Under the hood

### Baking

We're using [`datadesk/django-bakery`](https://github.com/datadesk/django-bakery) to bake out our app as flat files and to publish those files to s3. See [their docs](https://django-bakery.readthedocs.io/en/latest/gettingstarted.html) for further instruction.

### Connecting Django and React

Loading the frontend files into Django templates is accomplished with [`owais/django-webpack-loader`](https://github.com/owais/django-webpack-loader).

In the frontend, Webpack creates a stats file called `webpack-stats.json`. Django uses that stats file to load webpack chunks in a template through the function `render_bundle [chunk_name]`.

We pass data from Django to React by declaring global variables in our Django templates. I adapted this pattern from [`MasterKale/django-cra-helper`](https://github.com/MasterKale/django-cra-helper).

Here's a full example of Django data → React rendering:

**`myapp/views.py`**

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

**`myapp/templates/index.html`**

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

**`frontend/webpack-stats.json`**

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

**`frontend/src/index.js`**

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

**`frontend/src/App.jsx`**

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

## References

This React-in-Django approach is informed by a few articles:

- ["Reconciling Backend Templates with Frontend Components,"](https://hackernoon.com/reconciling-djangos-mvc-templates-with-react-components-3aa986cf510a) Nick Sweeting
- ["Using Webpack transparently with Django + hot reloading React components as a bonus,"](https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/)
  Owais Lone
- Politico Interactive News on [public-facing apps](https://docs.politicoapps.com/politico-newsroom-developer-guide/infrastructure#public-facing-apps)

## Todos

- Code-splitting
- .css support
