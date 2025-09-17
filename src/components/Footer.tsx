import React from "react";
import LinkedInIcon from "../assets/linkedin.svg?react";
import EmailIcon from "../assets/mail.svg?react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div>
          <h2 className="footer-title">
            Connect with us!
          </h2>

          <div className="contacts-wrapper">
            
            {/* Colin's Contact Info */}
            <div className="contact-card">
              <h3 className="contact-name">Colin Onevathana</h3>
              <div className="icon-group">
                <a href="https://www.linkedin.com/in/colin-onevathana/" aria-label="Colin's LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="mailto:colin.onevathana@example.com" aria-label="Email Colin">
                  <EmailIcon />
                </a>
              </div>
            </div>

            {/* Pratyusha's Contact Info */}
            <div className="contact-card">
              <h3 className="contact-name contact-name-shadow">
                Pratyusha Shanker
              </h3>
              <div className="icon-group">
                <a href="https://www.linkedin.com/in/pratyusha-shanker/" aria-label="Pratyusha's LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="mailto:pratyusha.shanker@example.com" aria-label="Email Pratyusha">
                  <EmailIcon />
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-copyright">
          © AgreeMint 2025
        </div>

      </div>
    </footer>
  );
};

export default Footer;