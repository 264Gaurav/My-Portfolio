// utils/gemini.js
const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
  MODEL
)}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Base portfolio context
 * Keep this tight and factual so generations stay focused.
 */
const ABOUT_ME_CONTEXT = `
Gaurav Singh — Research Engineer @ IDEMIA; iOS & full-stack (MERN) developer; AI/ML enthusiast.

Education
- B.Tech (ECE), MMMUT Gorakhpur — 86.5%
- Diploma (ECE), Govt. Polytechnic Jaunpur — 88.28%

Core Skills
- Frontend: React, HTML/CSS, Tailwind, SwiftUI
- Backend: Node.js, Express, REST
- Mobile: iOS (Swift, SwiftUI)
- Data/ML & MLOps: Python, LangChain, LangGraph, LangSmith, RAG, Vector DBs, DVC, MLflow, Airflow, Docker
- DevOps/Tools: Git, GitHub, GitHub Actions, Firebase, Vercel, Render

Selected Projects
- Smart Parking App, GRUBHUB, Alarm Clock, GIF Generator, Login Auth, Todo App, Password Generator, Top Courses

Coding Profiles
- GeeksForGeeks (1000+ problems), LeetCode (300+), HackerRank (5★ C++), Code Studio (Level-6, 6000+)

Contact
- Email: gauravsingh264209@gmail.com
`;

/**
 * One-time GitHub snapshot (as of Aug 14, 2025 IST),
 * curated from github.com/264Gaurav and public repos.
 * Keep this concise; update occasionally.
 */
const GITHUB_SNAPSHOT = `
GitHub Snapshot (Aug 14, 2025)

Profile
- Research Engineer @ IDEMIA; iOS + full-stack developer with AI features (Noida, India).

Highlighted Repos
- ai-app-2 — LangChain/LangGraph/LangSmith scaffold for medium-to-advanced AI apps (topics: streaming, memory, chatbot, agents). MIT.
- Graph_RAG — Graph RAG using Neo4j + Gemma on Groq; builds knowledge graphs via Cypher; multi-hop retrieval; LangChain. MIT.
- mini-cursor — “Coding agent” prototype using Google Gemini LLM for cursor-driven code assistance; cross-platform. MIT.
- Login_Auth ios app - Login and authentication ios application built using swiftUI , firebase , swift etc.
- videoCall - A webRTC Application for real time communication with zero delay . Wifi/Hotspot communication setup and video calling can be done without usign data pack consumption.
- dvc_demo - This project includes data versioning concept handling and managing big datas for AI models, data pipeline creation , data version management etc.Also Experiment tracking using dvc has been done.
- DSA-RAG - DSA instructor RAG system with memory and persist previous conversation as context.
- MLFlow-experiment-tracking - experiment tracking of ML / AI project using MLFlow tool with visuals and comparison charts ,etc.
- Medical-RAG-Chatbot - A LangChain-based Retrieval-Augmented Generation (RAG) chatbot for medical data. Integrates with Gemini/Grok AI to deliver accurate, context-aware answers in healthcare and biomedical domains.
- ETL-Airflow - Dockerized Apache Airflow pipeline that extracts data from NASA's APOD API, transforms it, and loads it into Postgres. Uses Airflow hooks/operators for orchestration, scheduling, and monitoring in an isolated, reproducible environment.

Tech Focus Seen on GitHub
- LangChain, LangGraph, LangSmith, RAG, knowledge graphs (Neo4j), AI agents
- Swift/SwiftUI, React/Node/Express, MongoDB, Docker
`;

/**
 * askGemini(question, history?)
 * - `question`: string
 * - `history`: optional array of { role: 'user'|'model', text: string }
 *   Pass a trimmed subset of prior turns to provide continuity.
 */
export async function askGemini(question, history = []) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Missing Gemini API key. Add VITE_GOOGLE_API_KEY to your .env and restart the dev server.'
    );
  }

  // Build a focused prompt that includes your static portfolio context + GitHub snapshot.
  // Keep the user turn last so the model answers the current question directly.
  const promptHeader = `${ABOUT_ME_CONTEXT.trim()}\n\n${GITHUB_SNAPSHOT.trim()}`;

  // Convert optional history to Gemini "contents" turns.
  // We keep it compact: first a single system steer, then alternating user/model parts,
  // then the final user question.
  const contents = [];

  // (A) Single system steer
  const systemInstruction = {
    parts: [
      {
        text:
          "You are a helpful assistant for Gaurav Singh's portfolio website. " +
          "Answer concisely about Gaurav's skills, projects, and profile. " +
          'Prefer facts from the provided context. If unknown, say so briefly.',
      },
    ],
  };

  // (B) Inject portfolio + GitHub context as the first user content so it’s always in scope
  contents.push({
    role: 'user',
    parts: [
      {
        text: `${promptHeader}\n\nThe following conversation may reference this context.`,
      },
    ],
  });

  // (C) Optional short conversation history
  // Expect items like: { role: 'user'|'model', text: '...' }
  for (const turn of history.slice(-8)) {
    const mappedRole = turn.role === 'model' ? 'model' : 'user';
    contents.push({ role: mappedRole, parts: [{ text: turn.text }] });
  }

  // (D) Current user question last
  contents.push({
    role: 'user',
    parts: [{ text: question }],
  });

  const body = {
    systemInstruction, // steer behavior
    contents,
    generationConfig: {
      temperature: 0.0,
      maxOutputTokens: 512,
    },
  };

  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Failed to parse AI response as JSON.');
  }

  if (!res.ok) {
    const serverMessage = data?.error?.message || JSON.stringify(data);
    throw new Error(`AI API error: ${serverMessage}`);
  }

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') ??
    null;

  return (reply || 'Sorry, I could not get an answer from AI.').trim();
}

// const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// const MODEL = 'gemini-2.5-flash'; // change only if you have a different model id
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
//   MODEL
// )}:generateContent?key=${GEMINI_API_KEY}`;

// // Your resume/about context
// const ABOUT_ME_CONTEXT = `
// Gaurav Singh is a Research Engineer at IDEMIA, iOS & Fullstack Developer, AI/ML enthusiast.
// - B.Tech (Electronics and Communication Engineering), MMMUT Gorakhpur, 86.5%
// - Diploma (Electronics and Communication Engineering), Government Polytechnic JAUNPUR, 88.28%
// - Skills: React, Node.js, MongoDB, Swift, Python, AI/ML, DVC, MLflow, Airflow, Docker, Git, GitHub, etc.
// - Projects: Smart Parking App, GRUBHUB, Alarm Clock, GIF Generator, Login Auth, Todo App, Password Generator, Top Courses.
// - Coding Profiles: GeeksForGeeks (1000+ problems), Leetcode (300+), HackerRank (5* C++), Code Studio (Level-6, 6000+ score)
// - Email: gauravsingh264209@gmail.com
// `;

// export async function askGemini(question) {
//   if (!GEMINI_API_KEY) {
//     throw new Error(
//       'Missing Gemini API key. Add VITE_GOOGLE_API_KEY to your .env and restart the dev server.'
//     );
//   }

//   // Construct a focused prompt: use systemInstruction + a single user content entry.
//   const promptText = `${ABOUT_ME_CONTEXT}\n\nUser: ${question}\nAssistant:`;

//   const body = {
//     // systemInstruction helps steer the model's behavior reliably
//     systemInstruction: {
//       parts: [
//         {
//           text: "You are a helpful assistant for Gaurav Singh's portfolio website. Answer clearly and concisely about Gaurav's skills, projects and profile.",
//         },
//       ],
//     },

//     // send the user content as a single content item
//     contents: [
//       {
//         role: 'user',
//         parts: [{ text: promptText }],
//       },
//     ],

//     // optional generation controls — tune as you like
//     generationConfig: {
//       temperature: 0.0,
//       maxOutputTokens: 512,
//     },
//   };

//   const res = await fetch(GEMINI_API_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });

//   let data;
//   try {
//     data = await res.json();
//   } catch (e) {
//     throw new Error('Failed to parse AI response as JSON.');
//   }

//   if (!res.ok) {
//     const serverMessage = data?.error?.message || JSON.stringify(data);
//     throw new Error(`AI API error: ${serverMessage}`);
//   }

//   // Safely extract the text from the first candidate
//   const reply =
//     data?.candidates?.[0]?.content?.parts?.[0]?.text ??
//     data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') ??
//     null;

//   return (reply || 'Sorry, I could not get an answer from AI.').trim();
// }
