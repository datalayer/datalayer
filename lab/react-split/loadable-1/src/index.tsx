import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./hello/App";
import LazyNoPreloadApp from "./table/lazy-nopreload/App";
import LazyPreloadApp from "./table/lazy-preload/App";
import LazyPreloadCodeApp from "./table/lazy-preload-code/App";
import LazyPreloadCodeHack from "./table/lazy-preload-hack/App";
import PreloadComponent from "./table/preload-component/App";
import PreselectStock from "./table/preselect-stock/App";

function randomValue() {
  return Math.round(1000 + Math.random() * 1000) / 10;
}
function daysAgo(days: any) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}
function fakeStock(name: any) {
  const today = randomValue();
  const yesterday = randomValue();
  const change = Math.round((1000 * (today - yesterday)) / yesterday) / 10;
  return {
    name,
    today,
    change,
    data: [
      { x: daysAgo(4), y: randomValue() },
      { x: daysAgo(3), y: randomValue() },
      { x: daysAgo(2), y: randomValue() },
      { x: daysAgo(1), y: yesterday },
      { x: daysAgo(0), y: today }
    ]
  };
}
const stocks = [
  fakeStock("Apple"),
  fakeStock("Citigroup"),
  fakeStock("General Electric"),
  fakeStock("Google"),
  fakeStock("Microsoft")
];

ReactDOM.render(
    <table>
      <tr>
        <td>
          <App />
        </td>
        <td>
          <div>LazyNoPreloadApp</div>
          <LazyNoPreloadApp stocks={stocks} />
          <hr/>
          <div>LazyPreloadApp</div>
          <LazyPreloadApp stocks={stocks} />
          <hr/>
          <div>LazyPreloadCodeApp</div>
          <LazyPreloadCodeApp stocks={stocks} />
          <hr/>
          <div>LazyPreloadCodeHack</div>
          <LazyPreloadCodeHack stocks={stocks} />
          <hr/>
          <div>PreloadComponent</div>
          <PreloadComponent stocks={stocks} />
          <hr/>
          <div>PreselectStock</div>
          <PreselectStock stocks={stocks} />
        </td>
      </tr>
    </table>
    ,
  document.getElementById("root")
  );
