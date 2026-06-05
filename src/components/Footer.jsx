import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: 'https://github.com/jash1509',
      label: 'GitHub',
    },
    {
      icon: <FiLinkedin />,
      href: 'https://linkedin.com/in/barot-jash-miteshbhai',
      label: 'LinkedIn',
    },
    {
      icon: <FiMail />,
      href: 'mailto:jashbarot69@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <footer className="footer">
      <div className="container footer-content">
        <span className="footer-logo">JB</span>
        <p className="footer-tagline">
          Building responsive web applications and AI-powered solutions with
          modern JavaScript technologies.
        </p>

        <div className="footer-socials">
          {socialLinks.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Barot Jash Miteshbhai. All Rights Reserved.
          </p>
          <p className="footer-made-with">
            Made with <FiHeart className="footer-heart" /> using React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
