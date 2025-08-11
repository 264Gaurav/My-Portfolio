// utils/gemini.js (or wherever you keep it)
const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MODEL = 'gemini-2.5-flash'; // change only if you have a different model id
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
  MODEL
)}:generateContent?key=${GEMINI_API_KEY}`;

// Your resume/about context
const ABOUT_ME_CONTEXT = `
Gaurav Singh is a Research Engineer at IDEMIA, iOS & Fullstack Developer, AI/ML enthusiast.
- B.Tech (Electronics and Communication Engineering), MMMUT Gorakhpur, 86.5%
- Diploma (Electronics and Communication Engineering), Government Polytechnic JAUNPUR, 88.28%
- Skills: React, Node.js, MongoDB, Swift, Python, AI/ML, DVC, MLflow, Airflow, Docker, Git, GitHub, etc.
- Projects: Smart Parking App, GRUBHUB, Alarm Clock, GIF Generator, Login Auth, Todo App, Password Generator, Top Courses.
- Coding Profiles: GeeksForGeeks (1000+ problems), Leetcode (300+), HackerRank (5* C++), Code Studio (Level-6, 6000+ score)
- Email: gauravsingh264209@gmail.com
`;

export async function askGemini(question) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Missing Gemini API key. Add VITE_GOOGLE_API_KEY to your .env and restart the dev server.'
    );
  }

  // Construct a focused prompt: use systemInstruction + a single user content entry.
  const promptText = `${ABOUT_ME_CONTEXT}\n\nUser: ${question}\nAssistant:`;

  const body = {
    // systemInstruction helps steer the model's behavior reliably
    systemInstruction: {
      parts: [
        {
          text: "You are a helpful assistant for Gaurav Singh's portfolio website. Answer clearly and concisely about Gaurav's skills, projects and profile.",
        },
      ],
    },

    // send the user content as a single content item
    contents: [
      {
        role: 'user',
        parts: [{ text: promptText }],
      },
    ],

    // optional generation controls — tune as you like
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
  } catch (e) {
    throw new Error('Failed to parse Gemini response as JSON.');
  }

  if (!res.ok) {
    const serverMessage = data?.error?.message || JSON.stringify(data);
    throw new Error(`Gemini API error: ${serverMessage}`);
  }

  // Safely extract the text from the first candidate
  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') ??
    null;

  return (reply || 'Sorry, I could not get an answer from Gemini AI.').trim();
}

// const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// const GEMINI_API_URL =
//   'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' +
//   GEMINI_API_KEY;

// // You can put your resume/about data here:
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
//   const prompt = `You are a helpful assistant for Gaurav Singh's portfolio website. Use the following context to answer user questions about Gaurav:\n\n${ABOUT_ME_CONTEXT}\n\nUser: ${question}\nAssistant:`;

//   const body = {
//     contents: [
//       {
//         parts: [{ text: prompt }],
//       },
//     ],
//   };

//   const res = await fetch(GEMINI_API_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });

//   if (!res.ok) throw new Error('Gemini API error');
//   const data = await res.json();
//   return (
//     data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//     'Sorry, I could not get an answer from Gemini AI.'
//   );
// }
