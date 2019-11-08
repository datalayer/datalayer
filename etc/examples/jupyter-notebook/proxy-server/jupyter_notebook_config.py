c.ServerProxy.servers = {
  'test-server': {
    'command': ['python3', '-m', 'http.server', '{port}'],
    'absolute_url': False
  }
}
