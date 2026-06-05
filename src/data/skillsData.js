import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaReact,
  FaJava,
  FaAws,
  FaRobot,
  FaBrain,
} from 'react-icons/fa';
import {
  SiOpenai,
  SiJavascript,
} from 'react-icons/si';
import { MdDesignServices, MdDevices } from 'react-icons/md';
import { HiLightBulb } from 'react-icons/hi';

const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'JavaScript ES6+', icon: FaJsSquare },
    ],
  },
  {
    category: 'Design',
    skills: [
      { name: 'Figma', icon: FaFigma },
      { name: 'UI/UX Wireframing', icon: MdDesignServices },
      { name: 'Responsive Design', icon: MdDevices },
    ],
  },
  {
    category: 'Version Control',
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub },
    ],
  },
  {
    category: 'AI & Productivity',
    skills: [
      { name: 'ChatGPT', icon: SiOpenai },
      { name: 'Prompt Engineering', icon: HiLightBulb },
      { name: 'Custom GPT', icon: FaRobot },
      { name: 'LLMs', icon: FaBrain },
    ],
  },
  {
    category: 'Cloud',
    skills: [
      { name: 'AWS Fundamentals', icon: FaAws },
    ],
  },
  {
    category: 'Currently Learning',
    skills: [
      { name: 'ReactJS', icon: FaReact },
      { name: 'Advanced JavaScript', icon: SiJavascript },
      { name: 'Java', icon: FaJava },
      { name: 'Generative AI', icon: FaBrain },
    ],
  },
];

export default skillsData;
