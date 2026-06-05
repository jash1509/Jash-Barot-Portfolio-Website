import { FiArrowDown, FiMail } from 'react-icons/fi';
import { FaReact, FaJsSquare, FaBrain } from 'react-icons/fa';
import '../styles/hero.css';

const Hero = () => {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for Opportunities
          </div>

          <p className="hero-greeting">Hello, I&apos;m</p>
          <h1 className="hero-name">
            <span>Jash Barot</span>
          </h1>

          <div className="hero-title">
            <span>Frontend Developer</span>
            <span className="hero-title-divider" />
            <span>AI &amp; DS Student</span>
            <span className="hero-title-divider" />
            <span>Prompt Engineer</span>
          </div>

          <p className="hero-description">
            Passionate about creating responsive web applications, intuitive user
            experiences, and AI-powered solutions using modern JavaScript
            technologies and Generative AI.
          </p>

          <div className="hero-buttons">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => handleScroll(e, '#projects')}
            >
              <FiArrowDown /> View Projects
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              onClick={(e) => handleScroll(e, '#contact')}
            >
              <FiMail /> Contact Me
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">4+</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">5+</div>
              <div className="hero-stat-label">Technologies</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">1</div>
              <div className="hero-stat-label">Custom GPT</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-illustration">
            <div className="hero-float-element" data-tooltip="ReactJS">
              <FaReact style={{ color: '#61dafb' }} />
            </div>
            <div className="hero-float-element" data-tooltip="JavaScript">
              <FaJsSquare style={{ color: '#f7df1e' }} />
            </div>
            <div className="hero-float-element" data-tooltip="AI &amp; Data Science">
              <FaBrain style={{ color: '#a78bfa' }} />
            </div>
            <div className="hero-illustration-graphic">
              <div className="hero-illustration-inner">
                <div className="hero-code-block">
                  <div>
                    <span className="comment">{'// Portfolio.jsx'}</span>
                  </div>
                  <div>
                    <span className="keyword">const </span>
                    <span className="function">Developer</span>
                    <span> = () =&gt; {'{'}</span>
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>
                    <span className="keyword">return </span>
                    <span>(</span>
                  </div>
                  <div style={{ paddingLeft: '1.5rem' }}>
                    <span>&lt;</span>
                    <span className="function">Portfolio</span>
                    <span>&gt;</span>
                  </div>
                  <div style={{ paddingLeft: '2rem' }}>
                    <span className="string">&quot;Jash Barot&quot;</span>
                  </div>
                  <div style={{ paddingLeft: '1.5rem' }}>
                    <span>&lt;/</span>
                    <span className="function">Portfolio</span>
                    <span>&gt;</span>
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>
                    <span>);</span>
                  </div>
                  <div>
                    <span>{'}'};</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
