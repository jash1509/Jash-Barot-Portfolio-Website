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
      <div className="container footer-container">
        <p className="footer-copyright">
          &copy; {currentYear} Barot Jash Miteshbhai. All Rights Reserved.
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

        <p className="footer-made-with">
          <span>Made with <FiHeart className="footer-heart" style={{ display: 'inline', verticalAlign: 'middle' }} /> using React</span>
          <span className="footer-dot">•</span>
          <a
            href={import.meta.env.VITE_ADMIN_PANEL_URL || 'https://jashadmin.vercel.app/'}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-admin-link"
          >
            Admin
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
