import os, sys
from jupyter_client import BlockingKernelClient

connection_file = 'kernel-{}.json'.format(sys.argv[1])
bkc = BlockingKernelClient(connection_file='{}/Library/Jupyter/runtime/{}'.format(os.environ.get('HOME'), connection_file))
bkc.load_connection_file()
def run_code(bkc, code, timeout=15):
  print("Running: ", code)
  reply = bkc.execute_interactive(code)
  print(reply)
  status = reply['content']['status']
  if status == 'ok':
    print('succeeded!')
  elif status == 'error':
    print('failed!')
    for line in reply['content']['traceback']:
      print(line)

run_code(bkc, "result='Hello world!'")
run_code(bkc, "print(result)")
bkc.shutdown()
