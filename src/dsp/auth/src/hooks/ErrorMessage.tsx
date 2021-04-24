import React from "react";
import styled from "styled-components";
import MuiAlert from '@material-ui/lab/Alert';

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 10px;
  color: #ff0000;
`;

const ErrorMessageContainer: React.FC<{ message: Array<string> | string | null }> = ({
  message
}) => {
  if (message instanceof Array) {
    return <div>
      {message.map( (m, i) => <MuiAlert elevation={6} variant="filled" severity="error" key={i}>{m}</MuiAlert>)}
    </div>
  } else {
//      return <ErrorMessage>{message}</ErrorMessage>;
    return <MuiAlert elevation={6} variant="filled" severity="error">{message}</MuiAlert>
  }
};

export default ErrorMessageContainer;
