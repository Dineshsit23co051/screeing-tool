import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/text';

const Navbar = () => {
  const { language, setLanguage, darkMode, setDarkMode, auth, setAuth } = useApp();
  const t = translations[language];

  return (
    <nav className="sticky top-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-slate-200 dark:border-slate-700 p-4 mb-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link to="/" className="font-bold text-calm-700 dark:text-calm-100">{t.appName}</Link>
        <div className="flex items-center gap-2 text-sm">
          <button className="px-3 py-1 rounded bg-calm-100 dark:bg-slate-700" onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}>
            {t.language}: {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <button className="px-3 py-1 rounded bg-calm-100 dark:bg-slate-700" onClick={() => setDarkMode(!darkMode)}>{t.darkMode}</button>
          {auth.token && (
            <button
              className="px-3 py-1 rounded bg-red-100 dark:bg-red-900"
              onClick={() => setAuth({ token: '', user: null })}
            >
              {t.logout}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
