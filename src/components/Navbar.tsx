import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-soft py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl text-white">
              <ShieldCheck size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-text">Attendify</span>
          </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#security" className="hover:text-primary transition-colors">Security</a>
          <a href="#dashboard" className="hover:text-primary transition-colors">Dashboard</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-slate-600 font-medium hover:text-primary transition-colors px-4 py-2 rounded-lg">
            Login
          </Link>
          <Link to="/login" className="bg-primary hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4 shadow-lg"
        >
          <a href="#features" className="block text-slate-600 font-medium">Features</a>
          <a href="#security" className="block text-slate-600 font-medium">Security</a>
          <a href="#dashboard" className="block text-slate-600 font-medium">Dashboard</a>
          <a href="#contact" className="block text-slate-600 font-medium">Contact</a>
          <div className="pt-4 flex flex-col gap-3 border-t border-slate-100">
            <Link to="/login" className="w-full text-center border border-slate-200 text-slate-600 font-medium px-4 py-2 rounded-lg">
              Login
            </Link>
            <Link to="/login" className="w-full text-center bg-primary text-white font-medium px-4 py-2 rounded-lg shadow-md">
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
