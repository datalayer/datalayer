import React from 'react';

export const H1: React.FC = (props): JSX.Element => {
  return <h1>{props.children}</h1>
}

export const H2: React.FC = (props): JSX.Element => {
  return <h2>{props.children}</h2>
}

export const H3: React.FC = (props): JSX.Element => {
  return <h3>{props.children}</h3>
}

export const Container: React.FC = (props): JSX.Element => {
  return (
    <span style={{border: '1px solid black', padding: 5}}>
        {props.children}
    </span>
  )
}

export const Spacer: React.FC = (props): JSX.Element => {
  return (
    <span style={{width: 10, display: 'inline-block' }}>
      {props.children}
    </span>
  )
}
