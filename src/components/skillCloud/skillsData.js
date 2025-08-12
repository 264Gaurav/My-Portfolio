// src/data/skillsData.js
import {
  FaApple,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaGitAlt,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaBrain,
  FaServer,
  FaCloud,
  FaStackOverflow,
  FaFileSignature,
} from 'react-icons/fa';
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiDvc,
  SiMlflow,
  SiApacheairflow,
  SiLangchain,
  SiPostgresql,
  SiMysql,
  SiSwift,
  SiCplusplus,
  SiCodesandbox,
  SiFigma,
  SiCanva,
  SiVercel,
  SiFirebase,
  SiDocker,
  SiGithubactions,
  SiSocketdotio,
  SiHuggingface,
  SiGooglecolab,
  SiOllama,
  SiRedux,
  SiGithub,
  SiXcode,
  SiNeo4J,
  SiChatbot,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FcDataEncryption } from 'react-icons/fc';

// images (put these in src/assets)
import gfgImg from '../../assets/gfg.png';
import codeStudioImg from '../../assets/code2.jpeg';
import leetcodeImg from '../../assets/code3.png.png';
import hackerrankImg from '../../assets/hackerRank.jpg.png';

// NOTE: normalize ALL categories to lowercase for consistent filtering
export const SKILL_CATEGORIES = [
  'all',
  'frontend',
  'backend',
  'mobile',
  'programming',
  'database',
  'ai',
  'competitive',
  'security',
  'others',
];

export const TOOL_CATEGORIES = [
  'all',
  'mlops',
  'ai',
  'coding',
  'competitive',
  'devops',
  'design',
  'hosting',
  'ci/cd',
];

export const skills = [
  { name: 'React', icon: FaReact, categories: ['frontend', 'programming'] },
  { name: 'JavaScript', icon: FaJs, categories: ['frontend', 'programming'] },
  { name: 'HTML', icon: FaHtml5, categories: ['frontend'] },
  { name: 'CSS', icon: FaCss3Alt, categories: ['frontend'] },
  { name: 'Tailwind CSS', icon: SiTailwindcss, categories: ['frontend'] },
  { name: 'Swift', icon: SiSwift, categories: ['mobile', 'programming'] },
  {
    name: 'SwiftUI',
    icon: SiSwift,
    categories: ['mobile', 'programming', 'frontend'],
  },
  { name: 'iOS', icon: FaApple, categories: ['mobile'] },
  { name: 'Node.js', icon: FaNodeJs, categories: ['backend', 'programming'] },
  { name: 'Express', icon: SiExpress, categories: ['backend'] },
  { name: 'MongoDB', icon: SiMongodb, categories: ['database', 'backend'] },
  { name: 'Postgres', icon: SiPostgresql, categories: ['database'] },
  { name: 'MySQL', icon: SiMysql, categories: ['database'] },
  { name: 'C++', icon: SiCplusplus, categories: ['programming'] },
  { name: 'Python', icon: FaPython, categories: ['programming', 'ai'] },
  { name: 'LangChain', icon: SiLangchain, categories: ['ai'] },
  { name: 'LangGraph', icon: SiLangchain, categories: ['ai'] },
  { name: 'Ollama', icon: SiOllama, categories: ['ai'] },
  { name: 'Hugging Face', icon: SiHuggingface, categories: ['ai'] },
  { name: 'Vector DBs', icon: FaDatabase, categories: ['ai'] },
  { name: 'Graph DBs', icon: SiNeo4J, categories: ['ai'] },
  { name: 'RAG', icon: FaBrain, categories: ['ai', 'gen-ai'] },
  { name: 'Agetic-Ai', icon: FaBrain, categories: ['ai', 'gen-ai'] },
  { name: 'Chatbot', icon: SiChatbot, categories: ['ai', 'gen-ai'] },
  {
    name: 'DSA',
    icon: FaCode,
    categories: ['programming', 'competitive'],
  },
  { name: 'WebRTC', icon: FaServer, categories: ['backend', 'others'] },
  { name: 'WebSocket', icon: SiSocketdotio, categories: ['backend', 'others'] },
  { name: 'Socket.IO', icon: SiSocketdotio, categories: ['backend', 'others'] },
  { name: 'JWT', icon: FaFileSignature, categories: ['backend', 'security'] },
  {
    name: 'Bcrypt',
    icon: FcDataEncryption,
    categories: ['backend', 'security'],
  },
];

export const tools = [
  { name: 'Git', icon: FaGitAlt, categories: ['coding', 'devops'] },
  { name: 'GitHub', icon: SiGithub, categories: ['coding', 'ci/cd'] },
  { name: 'DVC', icon: SiDvc, categories: ['mlops'] },
  { name: 'MLflow', icon: SiMlflow, categories: ['mlops'] },
  { name: 'Airflow', icon: SiApacheairflow, categories: ['mlops'] },
  { name: 'LangChain', icon: SiLangchain, categories: ['ai'] },
  { name: 'LangGraph', icon: SiLangchain, categories: ['ai'] },
  { name: 'LangSmith', icon: SiLangchain, categories: ['ai'] },
  { name: 'Vector DBs', icon: FaDatabase, categories: ['ai', 'mlops'] },
  { name: 'Graph DBs', icon: SiNeo4J, categories: ['ai', 'mlops'] },
  { name: 'Docker', icon: SiDocker, categories: ['devops', 'hosting'] },
  { name: 'DockerHub', icon: SiDocker, categories: ['devops'] },
  { name: 'VSCode', icon: VscVscode, categories: ['coding'] },
  { name: 'XCode', icon: SiXcode, categories: ['coding'] },
  { name: 'Codesandbox', icon: SiCodesandbox, categories: ['coding'] },
  { name: 'Copilot', icon: FaBrain, categories: ['ai', 'coding'] },
  { name: 'Cursor', icon: FaCode, categories: ['coding'] },
  { name: 'Figma', icon: SiFigma, categories: ['design'] },
  { name: 'Canva', icon: SiCanva, categories: ['design'] },
  { name: 'Vercel', icon: SiVercel, categories: ['hosting'] },
  { name: 'Render', icon: FaCloud, categories: ['hosting'] },
  { name: 'Firebase', icon: SiFirebase, categories: ['hosting', 'devops'] },
  {
    name: 'GitHub Actions',
    icon: SiGithubactions,
    categories: ['ci/cd', 'devops'],
  },
  { name: 'NodeMon', icon: FaCode, categories: ['coding', 'devops'] },
  { name: 'Redux', icon: SiRedux, categories: ['frontend'] },
  { name: 'Dagshub', icon: FaCloud, categories: ['mlops'] },
  { name: 'Ollama', icon: SiOllama, categories: ['ai'] },
  { name: 'Hugging Face', icon: SiHuggingface, categories: ['ai'] },
  { name: 'Google Colab', icon: SiGooglecolab, categories: ['ai', 'mlops'] },
  { name: 'HackerRank', icon: FaStackOverflow, categories: ['competitive'] },
  { name: 'LeetCode', icon: FaCode, categories: ['competitive'] },
  { name: 'GeeksForGeeks', icon: FaCode, categories: ['competitive'] },
  { name: 'Coding Ninjas', icon: FaCode, categories: ['competitive'] },
];

export const codingProfiles = [
  {
    name: 'GeeksForGeeks',
    description:
      '2nd academic Rank on GFG. Solved more than 1000+ problems with 3200+ score and secured.',
    link: 'https://auth.geeksforgeeks.org/user/gauravsingh_45/practice',
    image: gfgImg,
    color: '#2F855A',
  },
  {
    name: 'Code Studio',
    description:
      'Specialist, achieved Level-6 with 6000+ score. Solved 300+ DSA and Programming Problems.',
    link: 'https://www.codingninjas.com/studio/profile/Gaurav_kashyap',
    image: codeStudioImg,
    color: '#3182CE',
  },
  {
    name: 'Leetcode',
    description:
      'Solved 300+ problems. 50 days, 100 days badge earned. Completed 6 month coding challenge.',
    link: 'https://leetcode.com/gaurav264/',
    image: leetcodeImg,
    color: '#F56565',
  },
  {
    name: 'HackerRank',
    description:
      '5 star in C++ Coder on Hacker Rank and also got certificate in Problem solving and JavaScript.',
    link: 'https://www.hackerrank.com/gauravsingh_45',
    image: hackerrankImg,
    color: '#38A169',
  },
];
