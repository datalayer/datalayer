import React, { lazy, Suspense } from "react";

// const HelloLink = lazy(() => import("widgets/HelloLink1"));
import HelloLink1 from "dspWidgets/HelloLink1";

// import HelloButton from "dspWidgets/HelloButton";
const HelloButton1 = lazy(() => import("dspWidgets/HelloButton1"));

// const DlaHeader1 = lazy(() => import("dspWidgets/Widgets").then(module => ({ default: module.DlaHeader1 })));
import { DlaHeader1 } from "dspWidgets/Widgets";

import { Hello2 as Hello2Def } from "../../../dsp/widgets/lib/Examples";
const Hello2 = lazy<typeof Hello2Def>(() => import("dspWidgets/Examples").then(module => ({ default: module.Hello2 })));

// import { Hello3 as Hello3Def } from "../../../dsp/widgets/lib/Examples";
// const Hello3 = lazy<typeof Hello3Def>(() => import("dspWidgets/Examples").then(module => ({ default: module.Hello3 })));
import { Hello3 } from "dspWidgets/Examples";

const UserPostListExample = lazy(() => import("dspUtils/UserPostListExample"));

const App = () => (
  <>
    <DlaHeader1 />
    <Hello3 />
    <Suspense fallback="Loading...">
      <UserPostListExample />
      <HelloButton1 /> 
      <Hello2 name="Eric" />
    </Suspense>
    <HelloLink1 />
  </>
);

export default App;
