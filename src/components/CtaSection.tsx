import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary opacity-20 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative z-10">
            Modernize Your College Attendance System
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Join hundreds of forward-thinking institutions that have eliminated proxy attendance and streamlined their administration with our WhatsApp OTP technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/login" className="w-full sm:w-auto bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2">
              Start Now <ArrowRight size={20} />
            </Link>
            <button className="w-full sm:w-auto bg-primary border border-blue-400 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-sm transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              <Calendar size={20} /> Book Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
