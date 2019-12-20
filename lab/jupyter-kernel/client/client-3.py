from subprocess import PIPE
from jupyter_client import KernelManager
import time

# https://gist.github.com/chiral/b9ffb87cb2abe763740f23dcb3580464

try:
    from queue import Empty  # py3
except ImportError:
    from Queue import Empty  # py2
km = KernelManager(kernel_name='ir')
km.start_kernel()
print(km.is_alive())
try:
    c = km.client()
    msg_id=c.execute('1+1')
    state='busy'
    data={}
    while state!='idle' and c.is_alive():
        try:
            msg=c.get_iopub_msg(timeout=1)
            if not 'content' in msg: continue
            content = msg['content']
            if 'data' in content:
                data=content['data']
            if 'execution_state' in content:
                state=content['execution_state']
        except Empty:
            pass
    print(data)
except KeyboardInterrupt:
    pass
finally:
    km.shutdown_kernel()
