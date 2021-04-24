import React, { useEffect } from "react";

const Loading: React.FC = () => <>Loading Service</>

function loadComponent(scope, module) {
  return async () => {
    const factory = await (window[scope] as any).get(module);
    const Module = factory();
    return Module;
  };
}

const useDynamicScript = (args: any) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  useEffect(() => {
      if (!args.url) {
        return;
      }
      const element = document.createElement("script");
      element.src = args.url;
      element.type = "text/javascript";
      element.async = true;
      setReady(false);
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

const ServiceLoader: React.FC<any> = (props: any) => {
  const { ready, failed } = useDynamicScript({ 
      url: props.service.manifest.url
  });
  if (failed) {
      return <h2>Failed to load dynamic script: {props.service.manifest.url}</h2>;
  }
  if (!ready) {
      return <Loading />
  }
  (window[props.service.manifest.scope] as any).override(
    Object.assign(
    {
        react: () => {
          return Promise.resolve().then(() => {
              return () => require('react');
          });
        },
        'react-dom': () => {
          return Promise.resolve().then(() => {
              return () => require('react-dom');
          });
        },
    },
    // @ts-ignore
    __webpack_require__.O
    )
  );
  const Component = React.lazy(
      loadComponent(props.service.manifest.scope, props.service.manifest.module)
  );
  return <React.Suspense fallback={<Loading/>}>
    <Component />
    </React.Suspense>
}

export default ServiceLoader;
