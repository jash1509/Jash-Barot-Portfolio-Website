import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projectsData';
import '../styles/projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work and achievements"
        />

        <div className="projects-grid">
          {projectsData.map(({ id, title, description, technologies, github, liveDemo, featured }) => (
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
