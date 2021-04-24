# our user list
c.Authenticator.whitelist = ['minrk', 'ellisonbg', 'willingc', 'echarles']

# ellisonbg, willingc and echarles have access to a shared server:

c.JupyterHub.load_groups = {'shared': ['ellisonbg', 'willingc', 'echarles']}

service_name = 'shared-notebook'
service_port = 9999
group_name = 'shared'

# start the notebook server as a service
c.JupyterHub.services = [
    {
        'name': service_name,
        'url': 'http://127.0.0.1:{}'.format(service_port),
        'command': ['jupyterhub-singleuser', '--group=shared', '--debug'],
    }
]
