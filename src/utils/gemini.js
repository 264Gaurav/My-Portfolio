const GEMINI_API_KEY = 'AIzaSyB_dkqU6ClkIiFNB1T8VM4lSn6_-dDPtoU'; // <-- Replace with your actual key

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' +
  GEMINI_API_KEY;

// You can put your resume/about data here:
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
  const prompt = `You are a helpful assistant for Gaurav Singh's portfolio website. Use the following context to answer user questions about Gaurav:\n\n${ABOUT_ME_CONTEXT}\n\nUser: ${question}\nAssistant:`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('Gemini API error');
  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Sorry, I could not get an answer from Gemini AI.'
  );
}
