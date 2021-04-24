import React, { Suspense } from "react";

const DlaFeatures = React.lazy(() => import("dspWidgets/Widgets").then(module => ({ default: module.DlaFeatures })));

const FeaturesExample = () => (
  <Suspense fallback="">
    <DlaFeatures />
  </Suspense>
);

export default FeaturesExample;
