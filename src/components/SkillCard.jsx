const SkillCard = ({ name, icon: Icon }) => {
  return (
    <div className="skill-card">
      <div className="skill-card-icon">
        <Icon />
      </div>
      <span className="skill-card-name">{name}</span>
    </div>
  );
};

export default SkillCard;
