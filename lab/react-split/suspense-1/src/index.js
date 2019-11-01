import React, { Timeout } from "react";
import ReactDOM from "react-dom";
import { createResource, createCache } from "simple-cache-provider";

/**
 * This is a simple data cache mechanism. Given input, it will create
 * a fake Promise call (that here evaluates after set amount of time).
 *
 * When called with the same parameter instances it will return the
 * cached promise, not create a new one, which allows it to be easilly
 * used inside a SFC or other form of Component that might end up
 * re-rendering multiple times (e.g. due to parent re-rendering).
 *
 * In this case the last parameter - `ms` - is ignored, for cache purposes
 * so if you want to test the behaviour of Loader having multiple async
 * children please call it with different `text` prop.
 */
const cache = createCache();
const readText = createResource(([text, ms = 0]) => {
  return new Promise(resolve => {
    console.log(new Date().getTime(), "Promise created, will resolve in ", ms);
    setTimeout(() => {
      resolve(text);
    }, ms);
  });
}, ([text, ms]) => text);

/**
 * This is our Asynchronous component - it will start fetching some data
 * (based on props input) and use the new Suspend feature by throwing a
 * promise until it is ready to render.
 */
const AsyncText = props => {
  /**
   * Note: this try-catch block is only added here for demo purpose.
   * In a normal application you would not need it here, as the promise
   * thrown by readText would automatically be thrown from the render.
   *
   * I've added the try/catch here just so we can get more debug info
   * in the console - instead the component could be just
   *
   * const AsyncText = props => {
   *    const data = readText(cache, [props.text, props.ms]);
   *    return <span>{data}</span>;
   * }
   */
  try {
    const data = readText(cache, [props.text, props.ms]);
    console.log(new Date().getTime(), "AsyncText is ready, returning JSX");
    return <span>{data}</span>;
  } catch (promise) {
    console.log(new Date().getTime(), "AsyncText is not ready yet, throwing");
    throw promise;
  }
};

/**
 * A wrapper around the Timeout component, so that we can pass it some props:
 * - fallback component
 * - ms - time after which we want to show the fallback
 * - children - the actual component to load
 */
const Loader = props => {
  return (
    <Timeout ms={props.ms}>
      {didTimeout => {
        console.log(
          new Date().getTime(),
          "in Loader > Timeout, did timeout: ",
          didTimeout
        );
        /**
         * The first time this component is rendered, `didTimeout` will
         * be set to false, in order to init loading the component, which
         * will start the async - long - operation.
         *
         * On subsequent renderers it will be called with:
         *
         * - true, once the timeout expired - in order to show the provided
         *   placeholder
         * - false, once the Promise thrown by the component actually resolved
         *   to show the component
         */
        return didTimeout ? props.fallback : props.children;
      }}
    </Timeout>
  );
};

class App extends React.Component {
  state = {
    showHello: false,
    loadingIndicator: false
  };

  requestData = () => {
    /**
     * We tell the UI that we want to perform some action. In case of Dan's
     * original demo, this was making the button render as pressed.
     */
    this.setState({
      loadingIndicator: true
    });
    /**
     * We're now taking a dive into another complex, but not entirelly new
     * territory.
     *
     * React Fiber introduced a new callback - "ReactDOM.unstable_deferredUpdates"
     * This call is used to tell React to perform an update with a "low priority"
     *
     */
    ReactDOM.unstable_deferredUpdates(() => {
      console.log(new Date().getTime(), "Defered setState scheduled");
      this.setState({
        loadData: true
      });
    });
  };

  render() {
    console.log(new Date().getTime(), "App render");
    return (
      <div>
        {this.state.loadingIndicator && <p>Requested content:</p>}
        {this.state.loadData && (
          <Loader
            ms={1000}
            fallback={<span>The content is still loading :(</span>}
          >
            <AsyncText text="Hello world" ms={2500} />
          </Loader>
        )}
        <p>
          <button onClick={this.requestData}>load data</button>
        </p>
      </div>
    );
  }

  componentWillMount() {
    console.log("----------------");
    console.log(new Date().getTime(), "App init");
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
