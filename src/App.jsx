import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Buildings from "./pages/Buildings";

const router = createBrowserRouter([
  {
    path: "/buildings",
    element: <Buildings />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Login />,
  },
  
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
