import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "devextreme/dist/css/dx.light.css";

import "./index.scss";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
