import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/text';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { language, setAuth } = useApp();
  const t = translations[language];

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? form : { ...form, preferredLanguage: language };
      const { data } = await api.post(endpoint, payload);
      setAuth(data);
      setAuthToken(data.token);
      navigate('/assessment');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <section className="max-w-md mx-auto card mt-10">
      <h1 className="text-2xl font-semibold mb-2">{t.appName}</h1>
      <p className="mb-4 text-sm opacity-80">{t.welcome}</p>
      <form className="space-y-3" onSubmit={submit}>
        {!isLogin && (
          <input className="w-full p-2 rounded border" placeholder={t.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="w-full p-2 rounded border" placeholder={t.email} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 rounded border" placeholder={t.password} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-calm-500 text-white rounded p-2" type="submit">{isLogin ? t.login : t.register}</button>
      </form>
      <button className="mt-3 text-sm underline" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? t.register : t.login}
      </button>
    </section>
  );
};

export default AuthPage;
