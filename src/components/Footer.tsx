import React from "react";
import LinkedInIcon from "../assets/linkedin.svg?react";
import EmailIcon from "../assets/mail.svg?react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-green-300 text-black font-['Noto_Sans_JP'] [box-shadow:_0_4px_4px_rgb(0_0_0_/_0.25)]">
      <div className="w-full flex min-h-[400px] flex-col justify-between p-6 md:p-12 lg:p-20">
        
        {/* Title */}
        <div>
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:_0_4px_4px_rgb(0_0_0_/_0.25)]">
            Connect with us!
          </h2>

          {/* Contact Blocks */}
          <div className="flex flex-col gap-10 md:flex-row">
            
            {/* Colin */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                Colin Onevathana
              </h3>
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="https://www.linkedin.com/in/onecolin/"
                  aria-label="Colin's LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <LinkedInIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </a>
                <a
                  href="mailto:business@onecolin.dev"
                  aria-label="Email Colin"
                  className="transition-transform hover:scale-110"
                >
                  <EmailIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </a>
              </div>
            </div>

            {/* Pratyusha */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                Pratyusha Shanker
              </h3>
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="https://www.linkedin.com/in/pratyusha-shanker/"
                  aria-label="Pratyusha's LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <LinkedInIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </a>
                <a
                  href="mailto:pratyushabansal@gmail.com"
                  aria-label="Email Pratyusha"
                  className="transition-transform hover:scale-110"
                >
                  <EmailIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-xl font-medium sm:text-3xl md:text-4xl lg:text-5xl">
          © AgreeMint 2025
        </div>

      </div>
    </footer>
  );
};

export default Footer;
