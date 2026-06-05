import { useState, useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import { FiChevronRight } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import SkillCard from './SkillCard';
import { getIconComponent } from '../data/skillsData';
import '../styles/skills.css';

const Skills = () => {
  const { skills } = useContext(PortfolioContext);
  
  // Frontend expanded by default to demonstrate interactivity
  const [expandedCategories, setExpandedCategories] = useState({
    'Frontend': true,
  });

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Tap on any category title to expand or collapse the skills list"
        />

        <div className="skills-grid">
          {skills.map(({ category, skills: skillItems }) => {
            const isExpanded = !!expandedCategories[category];
            return (
              <div key={category} className="skills-category">
                <h3
                  className="skills-category-title"
                  onClick={() => toggleCategory(category)}
                >
                  <span className={`cat-icon-wrapper ${isExpanded ? 'expanded' : ''}`}>
                    <FiChevronRight className="cat-icon" />
                  </span>
                  {category}
                </h3>
                <div className={`skills-list ${isExpanded ? 'expanded' : ''}`}>
                  {skillItems.map(({ name, icon }) => (
                    <SkillCard key={name} name={name} icon={getIconComponent(icon)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
