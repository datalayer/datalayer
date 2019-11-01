c = get_config()
c.JupyterHub.log_level = 10
c.JupyterHub.spawner_class = 'sudospawner.SudoSpawner'
c.SudoSpawner.debug_mediator = True
