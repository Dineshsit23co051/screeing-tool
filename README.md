# MindBridge AI

MindBridge AI is a bilingual (English + தமிழ்) full-stack mental wellness support platform with secure authentication, assessments, AI-based support suggestions, crisis detection, feedback collection, and admin analytics.

## Project Structure

- `server/` - Node.js + Express + MongoDB backend
- `client/` - React + Vite + TailwindCSS frontend

## Environment Variables

Create `server/.env` based on `server/.env.example`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/mindbridge_ai
JWT_SECRET=replace_with_a_secure_secret
OPENAI_API_KEY=replace_with_openai_api_key
PORT=5000
```

## Install & Run

Backend:

```bash
cd server && npm install && npm run dev
```

Frontend:

```bash
cd client && npm install && npm run dev
```

## Feature Coverage

- JWT + bcrypt authentication (register/login)
- English/Tamil language toggle with localStorage persistence
- 5-question language-aware assessment flow
- Voice + text message input (Web Speech API)
- AI analysis endpoint returning strict structured JSON
- Crisis keyword detection in English and Tamil
- Feedback collection with rating + optional comments
- Admin analytics endpoint and dashboard view
- Responsive calm UI with dark mode and suggestion cards

## Notes

- The backend AI model call uses `gpt-5.3-codex` via OpenAI SDK.
- If AI call fails, safe fallback responses are returned in the selected language.
