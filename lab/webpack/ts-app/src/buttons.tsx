import React from 'react'
import {ReactNode} from 'react'
import {createUseStyles} from 'react-jss'

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
  myButton: {
    color: 'green',
    margin: {
      // jss-expand gives more readable syntax
      top: 5, // jss-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': {
      // jss-nested applies this to a child span
      fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
})

interface IProps {
    children: ReactNode;
    // any other props that come into the component
}

const Button = ({ children, ...props }: IProps) => {
  const classes = useStyles()
  return (
    <button className={classes.myButton} {...props}>
      <span className={classes.myLabel}>{children}</span>
    </button>
  )
}

const ButtonSubmit = () => <Button>Submit2</Button>

export default ButtonSubmit
