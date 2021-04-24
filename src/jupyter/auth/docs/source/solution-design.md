# Solution Design

(just to see some mermaid diagram...)

```{eval-rst}
.. mermaid::

   sequenceDiagram
      participant User
      participant Jupyter_Frontend
      participant RTC_Client
      participant RTC_Server
      participant Jupyter_Rest
      User-->Jupyter_Frontend: Request CRUD Notebook
      Jupyter_Frontend-->RTC_Client: Request CRUD Notebook
      RTC_Client-->RTC_Server: Request CRUD Notebook
      RTC_Server-->Jupyter_Rest: Request CRUD Notebook
      Jupyter_Rest-->RTC_Server: Response CRUD Notebook
      RTC_Server-->RTC_Client: Response CRUD Notebook
      RTC_Client-->Jupyter_Frontend: Response CRUD Notebook
      Jupyter_Frontend-->User: Response CRUD Notebook
```
