const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="section-title-wrapper">
      <h2 className="section-title">{title}</h2>
      <div className="section-title-line" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
