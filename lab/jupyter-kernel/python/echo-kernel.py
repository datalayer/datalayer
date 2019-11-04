"""
https://jupyter-protocol.readthedocs.io/en/latest/wrapperkernels.html

Here’s the Kernel spec kernel.json file for this.

{
    "display_name": "Echo",
    "argv": ["python","-m","echokernel", "-f", "{connection_file}"]
}

    jupyter kernelspec install ./kernel.json.

Place your kernel module anywhere Python can import it (try current directory for testing).

Finally, you can run your kernel using

    jupyter console --kernel <mykernelname>

Note that <mykernelname> in the below example is echo.

"""

import logging

from ipykernel.kernelapp import IPKernelApp
from ipykernel.kernelbase import Kernel

class EchoKernel(Kernel):
    implementation = 'Echo'
    implementation_version = '1.0'
    language = 'echo'
    language_version = '0.1'
    language_info = {
        'name': 'echo',
        'mimetype': 'text/plain',
        'file_extension': '.txt',
    }
    banner = "Echo kernel - as useful as a parrot"
    def do_execute(self, code, silent, store_history=True,
            user_expressions=None, allow_stdin=False):
        if not silent:
            stream_content = {'name': 'stdout', 'text': code}
            self.send_response(self.iopub_socket, 'stream', stream_content)

        return {'status': 'ok',
                # The base class increments the execution count
                'execution_count': self.execution_count,
                'payload': [],
                'user_expressions': {}}

class EchoKernelApp(IPKernelApp):
    kernel_class = EchoKernel

if __name__ == '__main__':
    logging.disable(logging.ERROR)
    EchoKernelApp.launch_instance()
