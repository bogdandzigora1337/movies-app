import React from "react";
import { createRoot } from "react-dom/client";
import { DatePicker } from "antd";

import App from "./components/app";
import "./index.css";

const container = createRoot(document.getElementById("root"));
container.render(<App />);
