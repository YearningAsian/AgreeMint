import { useState } from 'react';

import { Menu, X } from 'lucide-react';

import agreeMintLogo from '../assets/AgreeMintLogo.png';





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

            <img

              className="h-14 md:h-18"

              src={agreeMintLogo}

              alt="AgreeMint Logo"

            />

        </div>



        {/* Desktop Navigation */}

        <nav className="hidden md:flex space-x-8 items-center">

          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer">

            About

          </button>

          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer">

            Contact

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

          <button className="w-4/5 text-left bg-green-600 text-white px-3 py-4 rounded-md text-base font-medium hover:bg-green-700 text-center">

            About

          </button>

          <button className="w-4/5 text-left bg-green-600 text-white px-3 py-4 rounded-md text-base font-medium hover:bg-green-700 text-center">

            Contact

          </button>

        </div>

      </div>

    </header>

  );

}