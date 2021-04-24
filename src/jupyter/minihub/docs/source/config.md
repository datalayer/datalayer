---
title: JupyterHub Configuration
---

# JupyterHub Configuration

```bash
jupyterhub --generate-config
```

```bash
jupyterhub --generate-config && \
  mv ./jupyterhub_config.py /etc/jupyterhub/jupyterhub_config.py && \
  jupyterhub -f /etc/jupyterhub/jupyterhub_config.py --Spawner.notebook_dir='~/notebooks'
```

## Folders

- `$DLAHOME/etc/jupyterhub`: Configuration files.
- `$DLAHOME/srv/jupyterhub`: Security and runtime files.
- `$DLAHOME/var/log`: Log files.

## Examples

What is jupyterhub? It really only has two responsibilities:
- authentication
- spawner

### JupyterHub custom authenticator.

The definition of [the Base Class Authenticator for Jupyterhub]([https://github.com/jupyterhub/jupyterhub/blob/master/jupyterhub/auth.py#L32). Jupyterhub has two representations of a user (str or dict of values) in our case we only want to use the dictionary representation. Bellow is the structure of the user data.

```python
{
   "name": "<username>",
   "admin": "<is-admin?>",
   # anything else will be stored as json blob in database
   ...
}
```

```python
from jupyterhub.auth import Authenticator

class MyAuthenticator(Authenticator):
    async def refresh_user(self, user, handler=None):
        """
        Needed if your authenticator needs to refresh its data about
        users once in a while.

        Returns True is user is up-to-date, False is user should be
        required to login, and user data otherwise.
        """
        pass

    async def authenticate(self, handler, data):
        """
        Hander is the http request from the login action. All
        authentication logic should go in this function.

        The OAuthenticator
        https://github.com/jupyterhub/oauthenticator/blob/master/oauthenticator/generic.py
        library shows in the authenticate method how you can redirect
        the user etc.

        Returns None is user is not authenticated, Returns a user
        dictionary otherwise in form of user-data above.
        """
````

Customize the profiles for each user. Here is the trick that we use to generate profiles. This is somewhat detailed in a [[https://discourse.jupyter.org/t/best-way-to-inject-per-user-config-for-juptyerhub/1740][on the jupyter discourse site]].

``python
def custom_list_available_profiles(user):
    """
    Return a list of profiles to expose for given user
    """

    ...
    return [....]


async def custom_options_form(self):
    self.profile_list = custom_list_available_profiles(self.user)

    # Let KubeSpawner inspect profile_list and decide what to return
    return self._options_form_default()


c.KubeSpawner.options_form = custom_options_form
````

The format of each profile in the list is as follows. Aall kubespawner options are in [[https://jupyterhub-kubespawner.readthedocs.io/en/latest/spawner.html][kubespawner documentaion]]. There should only be one default. And the list can be empty indicating that the user cannot launch anything.

```python
display_name: Small Instance
description: Stable environment with 1 cpu / 1 GB ram
default: true
kubespawner_override:
  cpu_limit: 1
  cpu_guarantee: 1
  mem_limit: 1G
  mem_guarantee: 1G
  image: "..."
  ...
```

Custom Spawner

```python
from jupyterhub.auth import DummyAuthenticator
from jupyterhub.spawner import SimpleLocalProcessSpawner

c.JupyterHub.authenticator_class = DummyAuthenticator
c.DummyAuthenticator.password = 'test'

PROFILE_TEMPLATE = '''
<style>
/* The profile description should not be bold, even though it is inside the <label> tag */
#kubespawner-profiles-list label p {
    font-weight: normal;
}
</style>
<div class='form-group' id='kubespawner-profiles-list'>
{% for profile in profile_list %}
<label for='profile-item-{{ profile.slug }}' class='form-control input-group'>
    <div class='col-md-1'>
        <input type='radio' name='profile' id='profile-item-{{ profile.slug }}' value='{{ profile.slug }}' {% if profile.default %}checked{% endif %} />
    </div>
    <div class='col-md-11'>
        <strong>{{ profile.display_name }}</strong>
        {% if profile.description %}
        <p>{{ profile.description }}</p>
        {% endif %}
    </div>
</label>
{% endfor %}
</div>
'''

# https://github.com/jupyterhub/kubespawner/blob/master/kubespawner/spawner.py#L2024
JUPYTERHUB_PROFILES = [
    {
        'slug': 'Small Instance',
        'display_name': 'Small Instance',
        'description': 'Stable environment with 1 cpu / 1 GB ram',
        'default': True
    },
    {
        'slug': 'Medium Instance',
        'display_name': 'Medium Instance',
        'description': 'Stable environment with 2 cpu / 2 GB ram',
        'default': False
    }
]

class CustomSpawner(SimpleLocalProcessSpawner):
    async def load_user_options(self):
        print('!@#$!@#$!@#$ user options', self.user_options)
        self.home_dir_template = '/tmp/asdf-{username}'

    async def start(self):
        await self.load_user_options()

        return await super().start()

async def custom_option_form(self):
    from jinja2 import Environment, BaseLoader
    profile_form_template = Environment(loader=BaseLoader).from_string(PROFILE_TEMPLATE)
    return profile_form_template.render(profile_list=JUPYTERHUB_PROFILES)

c.JupyterHub.spawner_class = CustomSpawner
c.CustomSpawner.options_form = custom_option_form
```
