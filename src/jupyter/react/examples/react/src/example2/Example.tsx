import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

export default function Example() {

  const classes = useStyles({});

  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (

    <div>

      <div>
        <Button variant="contained" className={classes.button}>
          Default
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Primary
        </Button>
        <Button variant="contained" color="secondary" className={classes.button}>
          Secondary
        </Button>
        <Button variant="contained" color="secondary" disabled className={classes.button}>
          Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons" className={classes.button}>
          Link
        </Button>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" className={classes.button}>
            Upload
          </Button>
        </label>
      </div>

      <div>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" className={classes.fab}>
          <EditIcon />
        </Fab>
        <Fab variant="extended" aria-label="like" className={classes.fab}>
          <NavigationIcon className={classes.extendedIcon} />
          Extended
        </Fab>
        <Fab disabled aria-label="like" className={classes.fab}>
          <FavoriteIcon />
        </Fab>
      </div>

      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <TextField
            id="standard-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="standard-number"
            label="Number"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-helperText"
            label="Helper text"
            defaultValue="Default Value"
            className={classes.textField}
            helperText="Some important text"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            required
            id="filled-required"
            label="Required"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Disabled"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-number"
            label="Number"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-helperText"
            label="Helper text"
            defaultValue="Default Value"
            className={classes.textField}
            helperText="Some important text"
            margin="normal"
            variant="filled"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            className={classes.textField}
            helperText="Some important text"
            margin="normal"
            variant="outlined"
          />
        </div>
      </form>

      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={value}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="filled-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={value}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={value}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </div>
      </form>

    </div>

  )

}
