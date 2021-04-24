import React from "react";

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    if (!args.url) {
      return;
    }
    const element = document.createElement("script");
    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;
    setReady(false);
    setFailed(false);
    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };
    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };
    document.head.appendChild(element);
    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);
  return {
    ready,
    failed,
  };
};

function ServiceLoader(props) {
  if (!props.service) {
    return <h2>Not Service specified</h2>;
  }
  const { ready, failed } = useDynamicScript({
    url: props.service.manifest.url
  });
  if (!ready) {
    return <h2>Loading dynamic script: {props.service.manifest.url}</h2>;
  }
  if (failed) {
    return <h2>Failed to load dynamic script: {props.service.manifest.url}</h2>;
  }
  const Component = React.lazy(
    loadComponent(props.service.manifest.scope, props.service.manifest.module)
  );
  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}

export default ServiceLoader;
