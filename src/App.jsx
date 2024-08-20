import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { AccountContextProvider } from './context/account.context';
import { AxiosProvider } from './providers/Axios.provider';
import AppWrapper from './providers/AppWrapper';
import { ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <AccountContextProvider>
          <AxiosProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<AppWrapper />}>
                <Route path="/home" element={<Home />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AxiosProvider>
        </AccountContextProvider>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
