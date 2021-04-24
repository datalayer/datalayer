import React, { Suspense } from "react";

const DlaContact1 = React.lazy(() => import("dspWidgets/Widgets").then(module => ({ default: (module as any).DlaContact1 })));

const About = () => (
  <Suspense fallback="Loading...">
    <DlaContact1 />
  </Suspense>
);

export default About;
