import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : { token: '', user: null };
  });

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const value = useMemo(
    () => ({ language, setLanguage, darkMode, setDarkMode, auth, setAuth }),
    [language, darkMode, auth]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
