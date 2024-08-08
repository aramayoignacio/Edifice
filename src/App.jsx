import { useState } from "react";
import reactLogo from "./assets/IMG_0767.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
