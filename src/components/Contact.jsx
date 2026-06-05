import { useState, useContext } from 'react';
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import { PortfolioContext } from '../context/PortfolioContext';
import SectionTitle from './SectionTitle';
import '../styles/contact.css';

const Contact = () => {
  const { profile } = useContext(PortfolioContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 3) return 'Name must be at least 3 characters';
        return '';
      case 'email': {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      }
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on type
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      const accessKey = profile?.web3FormsKey || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setIsSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          setErrors({ submit: result.message || "Something went wrong." });
        }
      } catch (err) {
        setErrors({ submit: "Failed to connect to the form submission service." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactItems = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: profile?.email || 'jashbarot69@gmail.com',
      href: `mailto:${profile?.email || 'jashbarot69@gmail.com'}`,
    },
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: profile?.phone || '+91 8347665218',
      href: `tel:${(profile?.phone || '+918347665218').replace(/\s+/g, '')}`,
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      value: (profile?.github || 'https://github.com/jash1509').replace('https://', ''),
      href: profile?.github || 'https://github.com/jash1509',
    },
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      value: profile?.fullName || 'Barot Jash Miteshbhai',
      href: profile?.linkedin || 'https://linkedin.com/in/barot-jash-miteshbhai',
    },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a question or want to work together? Let's connect!"
        />

        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-info-text">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out
              through any of the channels below.
            </p>

            <div className="contact-info-items">
              {contactItems.map(({ icon, label, value, href }) => (
                <div key={label} className="contact-info-item">
                  <div className="contact-info-icon">{icon}</div>
                  <div>
                    <div className="contact-info-label">{label}</div>
                    <div className="contact-info-value">
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {value}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className={`form-input${errors.name ? ' error' : ''}`}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="form-error">
                    <FiAlertCircle /> {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="form-error">
                    <FiAlertCircle /> {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message <span>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`form-textarea${errors.message ? ' error' : ''}`}
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.message && (
                  <span className="form-error">
                    <FiAlertCircle /> {errors.message}
                  </span>
                )}
              </div>

              {errors.submit && (
                <div className="form-error" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.88rem' }}>
                  <FiAlertCircle /> {errors.submit}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary form-submit-btn"
                disabled={isSubmitting}
                style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </button>

              {isSuccess && (
                <div className="form-success">
                  <div className="form-success-icon">
                    <FiCheckCircle />
                  </div>
                  <span className="form-success-text">
                    Message Sent Successfully!
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
