import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import { FiBookOpen, FiAward, FiMapPin } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import '../styles/about.css';

const About = () => {
  const { profile } = useContext(PortfolioContext);

  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about my journey and background"
        />

        <div className="about-grid">
          <div className="about-text">
            <p>
              I am a{' '}
              <span className="about-highlight">
                {profile.education.degree}
              </span>{' '}
              student at {profile.education.college}. I enjoy building responsive web
              applications, exploring Generative AI, and developing AI-powered
              solutions through{' '}
              <span className="about-highlight">Prompt Engineering</span> and{' '}
              <span className="about-highlight">Custom GPTs</span>.
            </p>
            <p>
              I continuously learn modern technologies and create real-world
              projects to strengthen my software development skills. My passion
              lies at the intersection of frontend development and artificial
              intelligence, where I strive to build intuitive and intelligent
              user experiences.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <div className="about-card-icon">
                <FiBookOpen />
              </div>
              <div className="about-card-title">Education</div>
              <div className="about-card-subtitle">
                {profile.education.degree}
              </div>
              <div className="about-card-detail">
                <FiMapPin style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                {profile.education.college}
              </div>
              <div className="about-card-detail">{profile.education.duration}</div>
            </div>

            <div className="about-card">
              <div className="about-card-icon">
                <FiAward />
              </div>
              <div className="about-card-title">Focus Areas</div>
              <div className="about-card-subtitle">
                Frontend Development &amp; Generative AI
              </div>
              <div className="about-card-detail">ReactJS • JavaScript ES6+ • Prompt Engineering</div>
              <div className="about-card-detail">Building real-world projects &amp; Custom GPTs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
