import React from 'react';
import { Menu, Github, MessageCircleQuestion, NotebookPen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <NotebookPen className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-900">DocBuddy AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
              <MessageCircleQuestion className="h-5 w-5" />
              <span>About</span>
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow">
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-2 py-1 flex items-center space-x-2 transition-colors">
                <MessageCircleQuestion className="h-5 w-5" />
                <span>About</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-2 py-1 flex items-center space-x-2 transition-colors">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow mx-2">
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;