---
title: Jupyter Kernel Protocol
---

# [DEPRECATED] Jupyter Kernel Protocol

[Docs](https://jupyter-protocol.readthedocs.io/en/latest).

## ZeroMQ

- [ZeroMQ](https://zeromq.org)
- [ZeroMQ Guide](http://zguide.zeromq.org/page:all)
- https://rfc.zeromq.org

## PyZMQ

PyZMQ [GitHub](https://github.com/zeromq/pyzmq) repo.

- https://pyzmq.readthedocs.io/en/latest
- http://zguide.zeromq.org/py:all

## Channels

Five Channels:

1. `shell`
2. `iopub`
3. `stdin`
4. `control`
5. `heartbeat`

```
kernel-server      ROUTER     PUB     ROUTER     ROUTER       ROUTER
                     *         |        |          *            *
                     |         |        |          |            |
                     |         *        *          |            |
kernel-client      DEAL       SUB      DEAL       DEAL         DEAL
                  1.shell   2.iopub   3.stdin   4.control   5.heartbeat
```

### Shell

This single ROUTER socket allows multiple incoming connections from frontends, and this is the socket where requests for code execution, object information, prompts, etc. are made to the kernel by any frontend.

The communication on this socket is a sequence of request/reply actions from each frontend and the kernel.

### IoPub

This socket is the `broadcast channel` where the kernel publishes all side effects (stdout, stderr, etc.) as well as the requests coming from any client over the shell socket and its own requests on the stdin socket.

There are a number of actions in Python which generate side effects: print() writes to sys.stdout, errors generate tracebacks, etc.

Additionally, in a multi-client scenario, we want all frontends to be able to know what each other has sent to the kernel (this can be useful in collaborative scenarios, for example).

This socket allows both side effects and the information about communications taking place with one client over the shell channel to be made available to all clients in a uniform manner.

### Stdin

This ROUTER socket is connected to all frontends, and it allows the kernel to request input from the active frontend when raw_input() is called.

The frontend that executed the code has a DEALER socket that acts as a `virtual keyboard` for the kernel while this communication is happening (illustrated in the figure by the black outline around the central keyboard).

In practice, frontends may display such kernel requests using a special input widget or otherwise indicating that the user is to type input for the kernel instead of normal commands in the frontend. All messages are tagged with enough information (details below) for clients to know which messages come from their own interaction with the kernel and which ones are from other clients, so they can display each type appropriately.

### Control

This channel is identical to Shell, but operates on a separate socket, to allow important messages to avoid queueing behind execution requests (e.g. shutdown or abort).

### Heartbeat

This socket allows for simple bytestring messages to be sent between the frontend and the kernel to ensure that they are still connected.

## Kernel Status

- https://jupyter-client.readthedocs.io/en/stable/messaging.html#status

## Messages

[Kernel Messaging](https://jupyter-protocol.readthedocs.io/en/latest/messaging.html).

![Frontend Kernel](https://jupyter-protocol.readthedocs.io/en/latest/_images/frontend-kernel.png)

[Decoupled two-process model](https://ipython.readthedocs.io/en/stable/overview.html#ipythonzmq).

## Message Structure

```
{
  # The message header contains a pair of unique identifiers for the
  # originating session and the actual message id, in addition to the
  # username for the process that generated the message.  This is useful in
  # collaborative settings where multiple users may be interacting with the
  # same kernel simultaneously, so that frontends can label the various
  # messages in a meaningful way.
  'header' : {
                'msg_id' : str, # typically UUID, must be unique per message
                'username' : str,
                'session' : str, # typically UUID, should be unique per session
                # ISO 8601 timestamp for when the message is created
                'date': str,
                # All recognized message type strings are listed below.
                'msg_type' : str,
                # the message protocol version
                'version' : '5.0',
     },

  # In a chain of messages, the header from the parent is copied so that
  # clients can track where messages come from.
  'parent_header' : dict,

  # Any metadata associated with the message.
  'metadata' : dict,

  # The actual content of the message must be a dict, whose structure
  # depends on the message type.
  'content' : dict,

  # optional: buffers is a list of binary data buffers for implementations
  # that support binary extensions to the protocol.
  'buffers': list,
}
```

```python
[
  b'u-u-i-d',         # zmq identity(ies)
  b'<IDS|MSG>',       # delimiter
  b'baddad42',        # HMAC signature
  b'{header}',        # serialized header dict
  b'{parent_header}', # serialized parent header dict
  b'{metadata}',      # serialized metadata dict
  b'{content}',       # serialized content dict
  b'\xf0\x9f\x90\xb1' # extra raw data buffer(s)
  ...
```

```python
{
  'header' : dict,
  # The msg's unique identifier and type are always stored in the header,
  # but the Python implementation copies them to the top level.
  'msg_id' : str,
  'msg_type' : str,
  'parent_header' : dict,
  'content' : dict,
  'metadata' : dict,
}
```
