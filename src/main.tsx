import React from "react";
import ReactDOM from "react-dom/client";
import Canvas from "./components/Canvas";
import GlobalStyles from "./globalStyles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Canvas />
    <GlobalStyles />
  </React.StrictMode>
);
