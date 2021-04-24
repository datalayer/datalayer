[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer DSP Admin

Datalayer `DSP Admin` is an open source tool to create and manage the Datalayer Science Platform.

```bash
# Help.
dsp -h
```

## Auth

```bash
# Auth Help.
dsp auth -h
```

```bash
# Operate LDAP users.
dsp auth init-ldap-users
# List LDAP users.
dsp auth list-ldap-users --log-level info
dsp auth list-ldap-users --log-level debug
dsp auth list-ldap-users -f ech --log-level debug
dsp auth list-ldap-users -d
# Export/Import LDAP users.
dsp auth export-ldap-users
dsp auth import-users
```

```bash
# List users.
dsp auth list-users
dsp auth list-users -q id:charlie
```

```bash
# Delete users.
dsp auth delete-users -q id:charlie
```

```bash
# Communicate with users.
dsp auth mail-users
```

## Library

```bash
dsp library -h
```

```bash
# Library Project.
dsp library create-project project1
dsp library delete-project
dsp library list-projects
```

```bash
# Library Dataset.
dsp library create-dataset -p project1
dsp library delete-dataset -p project1
dsp library list-datasets -p project1
```

```bash
# Library Exercise.
dsp library create-exercise -p project1
dsp library delete-exercise -p project1
dsp library list-exercises -p project1
```

```bash
# Library Paper.
dsp library create-paper -p project1
dsp library delete-paper -p project1
dsp library list-papers -p project1
```
