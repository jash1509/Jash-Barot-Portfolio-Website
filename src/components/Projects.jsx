import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';
import '../styles/projects.css';

const Projects = () => {
  const { projects } = useContext(PortfolioContext);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work and achievements"
        />

        <div className="projects-grid">
          {projects.map(({ id, title, description, technologies, github, liveDemo, featured }) => (
            <ProjectCard
              key={id}
              title={title}
              description={description}
              technologies={technologies}
              github={github}
              liveDemo={liveDemo}
              featured={featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
