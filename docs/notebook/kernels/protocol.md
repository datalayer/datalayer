---
title: Jupyter Kernel Protocol
---

# Jupyter Kernel Protocol

[Docs](https://jupyter-protocol.readthedocs.io/en/latest).

## Messages

[Kernel Messaging](https://jupyter-client.readthedocs.io/en/latest/messaging.html).

![Frontend Kernel](https://jupyter-client.readthedocs.io/en/latest/_images/frontend-kernel.png)

### Shell

This single ROUTER socket allows multiple incoming connections from frontends, and this is the socket where requests for code execution, object information, prompts, etc. are made to the kernel by any frontend. The communication on this socket is a sequence of request/reply actions from each frontend and the kernel.

### IOPub

This socket is the ‘broadcast channel’ where the kernel publishes all side effects (stdout, stderr, etc.) as well as the requests coming from any client over the shell socket and its own requests on the stdin socket. There are a number of actions in Python which generate side effects: print() writes to sys.stdout, errors generate tracebacks, etc. Additionally, in a multi-client scenario, we want all frontends to be able to know what each other has sent to the kernel (this can be useful in collaborative scenarios, for example).

This socket allows both side effects and the information about communications taking place with one client over the shell channel to be made available to all clients in a uniform manner.

### STDIN

This ROUTER socket is connected to all frontends, and it allows the kernel to request input from the active frontend when raw_input() is called. The frontend that executed the code has a DEALER socket that acts as a ‘virtual keyboard’ for the kernel while this communication is happening (illustrated in the figure by the black outline around the central keyboard).

In practice, frontends may display such kernel requests using a special input widget or otherwise indicating that the user is to type input for the kernel instead of normal commands in the frontend. All messages are tagged with enough information (details below) for clients to know which messages come from their own interaction with the kernel and which ones are from other clients, so they can display each type appropriately.

### Control

This channel is identical to Shell, but operates on a separate socket, to allow important messages to avoid queueing behind execution requests (e.g. shutdown or abort).

### Heartbeat

This socket allows for simple bytestring messages to be sent between the frontend and the kernel to ensure that they are still connected.

## ZeroMQ

+ [ZeroMQ](https://zeromq.org)
+ [ZeroMQ Guide](http://zguide.zeromq.org/page:all)

Pyzmq [GitHub](https://github.com/zeromq/pyzmq) repo.

[Decoupled two-process model](https://ipython.readthedocs.io/en/stable/overview.html#ipythonzmq).

## C++

+ [Xeus](https://github.com/quantstack/xeus), C++ implementation of the Jupyter kernel protocol
