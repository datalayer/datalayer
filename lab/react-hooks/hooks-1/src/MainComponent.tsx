
import * as React from "react";
import OldSchoolComponent from './OldSchoolComponent';
import { ComponentA } from './ComponentA';
import { ComponentB } from './ComponentB';

const App: React.SFC = (): JSX.Element => {
  return (
    <>
      <OldSchoolComponent />
      <ComponentA />    
      <ComponentB />
    </>
  );
};

export default App;
