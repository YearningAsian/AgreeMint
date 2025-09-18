import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Make sure to install `lucide-react`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="flex items-center">
            <img
              className="h-8 md:h-10"
              src="/your-logo.svg" // Replace with your actual logo path
              alt="AgreeMint Logo"
            />
            <span className="ml-2 text-xl md:text-2xl font-bold text-gray-900">
              AgreeMint
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="/features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Features
          </a>
          <a href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Pricing
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            About
          </a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Contact
          </a>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Full screen overlay) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900 focus:outline-none">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
          <a href="/features" className="text-gray-700 hover:bg-gray-50 p-4 w-full text-center">
            Features
          </a>
          <a href="/pricing" className="text-gray-700 hover:bg-gray-50 p-4 w-full text-center">
            Pricing
          </a>
          <a href="/about" className="text-gray-700 hover:bg-gray-50 p-4 w-full text-center">
            About
          </a>
          <a href="/contact" className="text-gray-700 hover:bg-gray-50 p-4 w-full text-center">
            Contact
          </a>
          <button className="w-4/5 text-left bg-indigo-600 text-white px-3 py-4 rounded-md text-base font-medium hover:bg-indigo-700 text-center">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}