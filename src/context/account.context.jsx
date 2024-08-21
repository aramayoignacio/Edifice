import React, { createContext, useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [session, setSession] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const localStorageSession = localStorage.getItem('session');
      if (localStorageSession) {
        const localStorageSessionObj = JSON.parse(localStorageSession);
        if (localStorageSessionObj && Object.keys(localStorageSessionObj).length > 0) {
          setSession(localStorageSessionObj);
        }
      }
    } catch (error) {
      console.error('Error parsing session from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    if (session && Object.keys(session).length > 0) {
      localStorage.setItem('session', JSON.stringify(session));
    }
  }, [session]);

  useEffect(() => {
    const sessionFromLocalStorage = localStorage.getItem('session');
    if (window.location.pathname === '/' && session.isLogged) {
      navigate('/home');
    }

    if (!session.isLogged && !sessionFromLocalStorage) {
      navigate('/');
    }
  }, [navigate, session]);


  const logOut = () => {
    localStorage.removeItem('session');
    setSession({});
    navigate('/');
  }

  return (
    <AccountContext.Provider value={{ session, setSession, logOut }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountContextProvider };
