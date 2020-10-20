import "normalize.css";
import "../css/style.css";

import React from "react";
import ReactDOM from "react-dom";

import BaseLayout from "./components/BaseLayout";

const BaseComponent = ReactDOM.render(<BaseLayout/>, document.getElementById("renderContainer"));