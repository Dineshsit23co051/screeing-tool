// OpenAI integration for structured mental wellness suggestions.
const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const fallbackResponse = (language) => {
  if (language === 'ta') {
    return {
      condition: 'மன அழுத்தம்',
      professional_help: ['மனநல நிபுணரை சந்திக்க திட்டமிடுங்கள்'],
      ngo_support: ['SNEHA போன்ற உதவி அமைப்புகளை தொடர்பு கொள்ளுங்கள்'],
      mood_activities: ['10 நிமிட நடை', 'ஜர்னலிங்'],
      relaxation_methods: ['4-7-8 சுவாச பயிற்சி', 'சிறிய தியானம்'],
      motivation_content: ['நீங்கள் தனியாக இல்லை. உதவி கேட்பது வலிமை.'],
      summary: 'உங்கள் உணர்வுகள் முக்கியமானவை. குறுகிய படிகளில் ஆதரவுடன் முன்னேறலாம்.'
    };
  }

  return {
    condition: 'stress',
    professional_help: ['Schedule a session with a licensed therapist'],
    ngo_support: ['Reach out to local verified helplines/NGOs'],
    mood_activities: ['Take a 10-minute walk', 'Write a short journal entry'],
    relaxation_methods: ['Try 4-7-8 breathing', 'Do a 5-minute mindfulness break'],
    motivation_content: ['You are not alone. Seeking support is a strength.'],
    summary: 'Your feelings are valid, and small steady steps can help you regain balance.'
  };
};

const analyzeMentalState = async ({ assessment, message, language }) => {
  try {
    const instructionLanguage = language === 'ta' ? 'Tamil' : 'English';
    const prompt = `You are MindBridge AI, a mental wellness support assistant.\nRespond only in valid JSON with keys: condition, professional_help, ngo_support, mood_activities, relaxation_methods, motivation_content, summary.\nAll values must be in ${instructionLanguage}.\nAssessment: ${JSON.stringify(assessment)}\nUser message: ${message}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-5.3-codex',
      messages: [
        { role: 'system', content: 'Provide emotionally safe, non-diagnostic support with practical suggestions.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    const raw = completion.choices?.[0]?.message?.content;
    return JSON.parse(raw);
  } catch (error) {
    console.error('AI service error:', error.message);
    return fallbackResponse(language);
  }
};

module.exports = { analyzeMentalState };
