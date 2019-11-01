from jupyter_client.kernelspec import NATIVE_KERNEL_NAME
from jupyter_client.manager import start_new_kernel

# https://gist.github.com/andrewssobral/bd0f0d384c0e7aada66a6454767076f3

km, kc = start_new_kernel(kernel_name=NATIVE_KERNEL_NAME)
def run_code(kc, code, timeout=15):
  print("Running: ", code)
  reply = kc.execute_interactive(code, timeout=timeout)
  print(reply)
  status = reply['content']['status']
  if status == 'ok':
    print('succeeded!')
  elif status == 'error':
    print('failed!')
    for line in reply['content']['traceback']:
      print(line)

run_code(kc, "result='Hello world!'")
run_code(kc, "print(result)")
kc.shutdown()
