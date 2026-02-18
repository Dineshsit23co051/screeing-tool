import { useState } from 'react';
import api from '../services/api';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/text';
import VoiceInput from '../components/VoiceInput';
import SuggestionCard from '../components/SuggestionCard';

const DashboardPage = () => {
  const { language } = useApp();
  const t = translations[language];
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });

  const analyze = async () => {
    const latest = await api.get('/assessment/latest');
    const { data } = await api.post('/ai/analyze', {
      assessment: latest.data,
      message,
      language
    });
    setResult(data);
  };

  const submitFeedback = async () => {
    await api.post('/feedback', {
      rating: Number(feedback.rating),
      comment: feedback.comment,
      condition: result?.condition || 'Unknown'
    });
    alert('Feedback saved');
  };

  return (
    <section className="max-w-5xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">{t.dashboard}</h2>
      <div className="card flex gap-2 items-start">
        <textarea
          className="w-full border rounded p-2"
          rows="4"
          placeholder={t.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <VoiceInput language={language} onTranscript={(transcript) => setMessage((prev) => `${prev} ${transcript}`.trim())} />
      </div>
      <button className="bg-calm-500 text-white px-4 py-2 rounded" onClick={analyze}>{t.analyze}</button>

      {result?.emergency && (
        <div className="card border border-red-400 bg-red-50 dark:bg-red-950">
          <h3 className="font-semibold text-red-600">{t.emergency}</h3>
          <p>{result.alert}</p>
        </div>
      )}

      {result && !result.emergency && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card md:col-span-2"><strong>{result.condition}</strong><p>{result.summary}</p></div>
          <SuggestionCard title="Professional Help" items={result.professional_help} />
          <SuggestionCard title="NGO Support" items={result.ngo_support} />
          <SuggestionCard title="Mood Activities" items={result.mood_activities} />
          <SuggestionCard title="Relaxation Methods" items={result.relaxation_methods} />
          <SuggestionCard title="Motivation Content" items={result.motivation_content} />
        </div>
      )}

      {result && (
        <div className="card">
          <h3 className="font-semibold mb-2">{t.feedback}</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <select className="border rounded p-2" value={feedback.rating} onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{'★'.repeat(star)}</option>
              ))}
            </select>
            <input className="border rounded p-2 flex-1" placeholder={t.comment} value={feedback.comment} onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })} />
            <button className="bg-calm-500 text-white px-3 py-2 rounded" onClick={submitFeedback}>{t.submitFeedback}</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
