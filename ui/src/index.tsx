import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { loader as rootLoader, action as rootAction } from "./App";
import EditAgent, {
  action as editAction,
} from "./components/agent/agent-actions/Edit";
import Support, { action as ticketAction } from "./routes/Support";
import AgentDetails, {
  loader as agentLoader,
  action as agentAction,
} from "./components/agent/Agent";
import { action as destroyAction } from "./components/agent/agent-actions/Delete";
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
        element: <AgentDetails />,
        loader: agentLoader,
        action: agentAction,
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
  {
    path: "/support",
    element: <Support />,
    action: ticketAction,
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
