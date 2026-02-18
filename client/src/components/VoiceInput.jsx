import { useMemo, useState } from 'react';

const VoiceInput = ({ language, onTranscript }) => {
  const [listening, setListening] = useState(false);
  const SpeechRecognition = useMemo(() => window.SpeechRecognition || window.webkitSpeechRecognition, []);

  const startListening = () => {
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript, recognition.lang);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <button className="px-3 py-2 rounded bg-calm-500 text-white" onClick={startListening}>
      {listening ? 'Listening...' : '🎙️'}
    </button>
  );
};

export default VoiceInput;
