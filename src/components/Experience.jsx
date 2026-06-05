import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import '../styles/experience.css';

const Experience = () => {
  const { experiences } = useContext(PortfolioContext);

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <SectionTitle
          title="Work Experience"
          subtitle="My professional journey and hands-on industry experience"
        />

        <div className="experience-timeline">
          {experiences.map(
            ({ id, role, company, duration, type, typeLabel, description, highlights, technologies }) => (
              <div key={id} className="experience-item">
                <div className="experience-dot">
                  <div className="experience-dot-inner" />
                </div>

                <div className="experience-card">
                  <div className="experience-card-header">
                    <h3 className="experience-card-role">{role}</h3>
                    <span className={`experience-card-type ${type}`}>
                      {typeLabel}
                    </span>
                  </div>

                  <div className="experience-card-meta">
                    <span className="experience-card-company">
                      <FiBriefcase /> {company}
                    </span>
                    <span className="experience-card-duration">
                      <FiCalendar /> {duration}
                    </span>
                  </div>

                  <p className="experience-card-description">{description}</p>

                  <div className="experience-card-highlights">
                    {highlights.map((item, index) => (
                      <div key={index} className="experience-highlight">
                        <FiCheckCircle className="experience-highlight-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="experience-card-tech">
                    {technologies.map((tech) => (
                      <span key={tech} className="experience-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
