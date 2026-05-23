import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MessageCircle, ArrowLeft, GraduationCap, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Remove any spaces or special characters from phone number for checking (student only)
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    if (activeTab === 'teacher') {
      if (phoneNumber === 'testing@2026' && password === 'test@live') {
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);
          // In a real app, this would set auth tokens before redirecting
          setTimeout(() => navigate('/dashboard'), 2000);
        }, 1200);
      } else {
        setError('Invalid Teacher ID or Password.');
      }
    } else {
      // Student logic (Supabase)
      if (!cleanPhone || !password) {
        setError('Please enter a valid WhatsApp number and password.');
        return;
      }
      setIsLoading(true);
      
      const { data, error: dbError } = await supabase
        .from('students')
        .select('*')
        .eq('phone_number', cleanPhone)
        .eq('password', password)
        .single();
        
      setIsLoading(false);
      
      if (dbError || !data) {
        setError('Invalid phone number or password.');
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/student-dashboard', { state: { student: data } });
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans selection:bg-primary/20 selection:text-primary">
      {/* Left Section - Visual/Brand */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-slate-50 relative overflow-hidden flex-col justify-between p-12 border-r border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-16">
            <ArrowLeft size={20} /> Back to website
          </Link>
          
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <ShieldCheck size={28} />
            </div>
            <span className="font-bold text-3xl tracking-tight text-slate-800">Attendify</span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            The smartest way to manage college attendance.
          </h1>
          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            Fast, secure, and proxy-proof. Verify your identity instantly using WhatsApp OTP and get to class faster.
          </p>
        </div>

        {/* Floating elements for visual flair */}
        <div className="relative z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-5 max-w-sm ml-auto border border-white shadow-2xl relative bg-white/60"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">OTP Received</p>
                <p className="text-xs text-slate-500">Just now via WhatsApp</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[4, 9, 2, 8].map((num, i) => (
                <div key={i} className="flex-1 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-800 shadow-sm">
                  {num}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 bg-white relative">
        <div className="md:hidden mb-8 flex justify-between items-center w-full max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl text-white">
              <ShieldCheck size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Attendify</span>
          </Link>
          <Link to="/" className="text-sm text-slate-500 hover:text-primary font-medium flex items-center gap-1">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Welcome back</h2>
            <p className="text-slate-500">Please enter your details to sign in.</p>
          </div>

          {/* Role Toggle Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8 relative">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${
                activeTab === 'student' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <GraduationCap size={18} /> Student
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${
                activeTab === 'teacher' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Briefcase size={18} /> Teacher & Admin
            </button>

            {/* Sliding Tab Indicator */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out ${
                activeTab === 'student' ? 'translate-x-0' : 'translate-x-[calc(100%+4px)]'
              }`}
            />
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                {activeTab === 'teacher' ? 'Teacher ID' : 'WhatsApp Mobile Number'}
              </label>
              <div className="relative">
                {activeTab === 'student' && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-slate-500 font-medium">+91</span>
                  </div>
                )}
                <input
                  type={activeTab === 'teacher' ? 'text' : 'tel'}
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError('');
                  }}
                  className={`block w-full ${activeTab === 'student' ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  placeholder={activeTab === 'teacher' ? 'Enter Teacher ID' : '987 654 3210'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2 mt-6">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Enter password"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-rose-500 text-sm font-medium bg-rose-50 p-3 rounded-lg border border-rose-100"
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                success 
                  ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500' 
                  : 'bg-primary hover:bg-blue-700 focus:ring-primary hover:shadow-lg hover:-translate-y-0.5'
              } ${(isLoading || success) ? 'opacity-90 cursor-not-allowed transform-none' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : success ? (
                <>
                  <CheckCircle2 size={18} />
                  Login Successful!
                </>
              ) : (
                <>
                  {activeTab === 'teacher' ? 'Login to Dashboard' : 'Student Login'}
                </>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Need help?</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4 text-sm">
              <a href="#" className="font-medium text-slate-600 hover:text-primary transition-colors">
                Contact Support
              </a>
              <span className="text-slate-300">•</span>
              <a href="#" className="font-medium text-slate-600 hover:text-primary transition-colors">
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
