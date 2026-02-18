import { useEffect, useState } from 'react';
import api from '../services/api';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/text';

const AdminPage = () => {
  const { language } = useApp();
  const t = translations[language];
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/analytics').then((res) => setStats(res.data)).catch(() => setStats(null));
  }, []);

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">{t.admin}</h2>
      {!stats ? (
        <p className="card">No analytics data or insufficient permissions.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card"><h3 className="font-semibold">Total Users</h3><p>{stats.totalUsers}</p></div>
          <div className="card"><h3 className="font-semibold">Average Feedback</h3><p>{Number(stats.averageFeedback).toFixed(2)}</p></div>
          <div className="card sm:col-span-2">
            <h3 className="font-semibold">Most Common Conditions</h3>
            <ul className="list-disc list-inside">
              {stats.mostCommonConditions.map((item) => (
                <li key={item._id}>{item._id}: {item.count}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPage;
