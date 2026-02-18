import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useApp } from '../context/AppContext';
import { translations } from '../translations/text';

const AssessmentPage = () => {
  const { language } = useApp();
  const t = translations[language];
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(5).fill(''));

  const submitAssessment = async (e) => {
    e.preventDefault();
    const responses = t.questions.map((question, index) => ({
      questionId: `q${index + 1}`,
      question,
      answer: answers[index]
    }));

    await api.post('/assessment', { language, responses });
    navigate('/dashboard');
  };

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">{t.startAssessment}</h2>
      <form onSubmit={submitAssessment} className="space-y-3">
        {t.questions.map((question, index) => (
          <div key={question} className="card">
            <p className="mb-2 font-medium">{index + 1}. {question}</p>
            <textarea
              className="w-full border rounded p-2"
              rows="2"
              required
              value={answers[index]}
              onChange={(e) => {
                const next = [...answers];
                next[index] = e.target.value;
                setAnswers(next);
              }}
            />
          </div>
        ))}
        <button className="bg-calm-500 text-white px-4 py-2 rounded" type="submit">{t.submitAssessment}</button>
      </form>
    </section>
  );
};

export default AssessmentPage;
