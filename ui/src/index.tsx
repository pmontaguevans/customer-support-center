import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { loader as rootLoader, action as rootAction } from "./App";
import Agent, { loader as agentLoader } from "./components/Agent";
import EditAgent, { action as editAction } from "./components/Edit";
import { action as destroyAction } from "./components/Delete";
import Index from "./components/Index";
import ErrorPage from "./components/ErrorPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "agents/:agentId",
        element: <Agent />,
        loader: agentLoader,
      },
      {
        path: "agents/:agentId/edit",
        element: <EditAgent />,
        loader: agentLoader, // should be another loader
        action: editAction,
      },
      {
        path: "agents/:agentId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
