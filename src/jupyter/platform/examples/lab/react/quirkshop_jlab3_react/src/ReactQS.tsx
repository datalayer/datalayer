import { ReactWidget } from '@jupyterlab/apputils';

import React, { useState } from 'react';

import { getRandomInt } from './util';

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const CounterComponent = (props: {animate: boolean}): JSX.Element => {
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  console.log(increment);
  const doIncrement = () => {
    const inc = getRandomInt(10000);
    setIncrement(inc);
    setCounter(counter + inc);
  }
  return (
    <div>
      {
        <div>
          <p>You earned {counter}!</p>
          <button
            onClick={() => { doIncrement() }}
          >
            Increment
          </button>
        </div>
      }
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
class CounterWidget extends ReactWidget {
  private animate: boolean;
  /**
   * Constructs a new CounterWidget.
   */
  constructor(animate: boolean) {
    super();
    this.addClass('jp-Quirkshop-React');
    this.animate = animate;
  }
  protected render(): JSX.Element {
    return <CounterComponent 
      animate={this.animate}
      />;
  }
}

export default CounterWidget;
