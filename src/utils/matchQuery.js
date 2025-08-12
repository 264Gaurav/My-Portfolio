// src/utils/matchQuery.js
export default function matchQuery(item, q) {
  if (!q) return true;
  const s = q.trim().toLowerCase();
  if (item.name && item.name.toLowerCase().includes(s)) return true;
  const cats = (item.categories || []).map(c => String(c).toLowerCase());
  return cats.some(c => c.includes(s));
}
