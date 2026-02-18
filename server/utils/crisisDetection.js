// Crisis keyword detector for English and Tamil content.
const CRISIS_KEYWORDS = {
  en: ['suicide', 'end my life', 'kill myself', 'self harm', 'i want to die'],
  ta: ['தற்கொலை', 'வாழ விருப்பமில்லை', 'என்னை கொல்ல', 'சாக வேண்டும்']
};

const hasCrisisSignal = (text = '') => {
  const normalized = text.toLowerCase();
  return (
    CRISIS_KEYWORDS.en.some((k) => normalized.includes(k)) ||
    CRISIS_KEYWORDS.ta.some((k) => normalized.includes(k))
  );
};

const crisisMessage = (language = 'en') => {
  if (language === 'ta') {
    return 'அவசர நிலை கண்டறியப்பட்டது. உடனே அருகிலுள்ள நம்பகமான நபர், மருத்துவர் அல்லது அவசர உதவி எண்ணை தொடர்பு கொள்ளவும்.';
  }
  return 'Crisis signal detected. Please contact a trusted person, local emergency services, or a mental health professional immediately.';
};

module.exports = { hasCrisisSignal, crisisMessage };
