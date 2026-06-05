import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import '../styles/experience.css';

const experienceData = [
  {
    id: 1,
    role: 'Intern Trainee Engineer',
    company: 'Skyttus Pvt. Ltd.',
    duration: '2 Months',
    type: 'internship',
    typeLabel: 'Internship',
    description:
      'Working as an Intern Trainee Engineer, gaining hands-on industry experience in frontend development and modern web technologies.',
    highlights: [
      'Building responsive web applications using ReactJS and modern JavaScript',
      'Collaborating with the development team on real-world client projects',
      'Learning industry best practices for code quality and version control',
      'Applying AI & Data Science knowledge to enhance development workflows',
    ],
    technologies: ['ReactJS', 'JavaScript', 'CSS3', 'Git', 'GitHub'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <SectionTitle
          title="Work Experience"
          subtitle="My professional journey and hands-on industry experience"
        />

        <div className="experience-timeline">
          {experienceData.map(
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
