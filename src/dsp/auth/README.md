[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer DSP Auth

Datalayer `DSP Auth` is an open source tool to ensure `authentication` and `authorisation` to the Datalayer platform.

## Develop

```
DSP_AUTH_UI_REDIRECT=http://localhost:3001/api/auth \
  make build && \
  make start
```

```bash
open http://localhost:9700/api/auth/version
````

## Model

```json
{
  "id":"eric",
  "type_s":"user",
  "first_name_t":"EC",
  "last_name_t":"Charles",
  "email_s":"eric@datalayer.io",
  "create_timestamp_dt":"2020-07-05T18:03:31Z",
  "last_update_timestamp_dt":"2020-07-05T18:03:31Z",
  "activation_timestamp_dt":"2020-07-05T18:03:41Z"
  }
```
