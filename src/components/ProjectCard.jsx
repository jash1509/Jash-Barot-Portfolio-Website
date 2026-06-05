import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FiFolder, FiStar } from 'react-icons/fi';

const ProjectCard = ({ title, description, technologies, github, liveDemo, featured }) => {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-card-icon">
          <FiFolder />
        </div>
        {featured && (
          <span className="project-card-badge">
            <FiStar /> Featured
          </span>
        )}
      </div>

      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-description">{description}</p>

      <div className="project-card-tech">
        {technologies.map((tech) => (
          <span key={tech} className="project-card-tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="project-card-links">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            aria-label={`View ${title} on GitHub`}
          >
            <FiGithub /> GitHub
          </a>
        )}
        {liveDemo && (
          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            aria-label={`View live demo of ${title}`}
          >
            <FiExternalLink /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
