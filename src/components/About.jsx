import { FiBookOpen, FiAward, FiMapPin } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import '../styles/about.css';

const About = () => {
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
                B.Tech Artificial Intelligence &amp; Data Science
              </span>{' '}
              student at CGPIT, Bardoli. I enjoy building responsive web
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
                B.Tech Artificial Intelligence &amp; Data Science
              </div>
              <div className="about-card-detail">
                <FiMapPin style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                CGPIT, Bardoli (UTU)
              </div>
              <div className="about-card-detail">2024 – 2028</div>
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
