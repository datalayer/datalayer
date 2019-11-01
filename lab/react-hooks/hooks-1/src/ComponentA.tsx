import * as React from 'react'
import { useApi } from './UseApi';

export const ComponentA: React.SFC = (): JSX.Element => {
  const { state, loading } = useApi('https://jsonplaceholder.typicode.com/todos/2');
  return (
    <>
      {
        loading 
          ? <div>Loading...</div> 
          : <div>{state}</div>
      }
    </>
  )
};