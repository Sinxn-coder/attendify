import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Activity, ArrowRight, Play, Users, BookOpen, BarChart2, Search, Bell, Clock, LayoutDashboard, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-background pointer-events-none" />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-medium mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            </span>
            New: Enhanced OTP Security
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text mb-6"
          >
            Smart Attendance System <br className="hidden md:block" />
            <span className="text-gradient">Powered by WhatsApp OTP</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Secure, fast, and modern attendance management for colleges with real-time verification, teacher dashboards, and student history tracking.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/login" className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl shadow-soft border border-slate-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              <Play size={20} className="text-primary" /> View Demo
            </button>
          </motion.div>
        </div>

        {/* Mockup Area */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-slate-200/50 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
            {/* Simple Mockup representation using CSS */}
            <div className="absolute top-0 w-full h-12 border-b border-slate-200/50 bg-slate-50/80 flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm border border-rose-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm border border-amber-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm border border-emerald-500/20"></div>
              <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-white rounded-md shadow-sm border border-slate-200/50 text-xs text-slate-400 font-medium w-64 justify-center">
                <ShieldCheck size={12} className="text-emerald-500" /> attendify.app/dashboard
              </div>
            </div>
            
            <div className="w-full h-full pt-12 flex flex-col md:flex-row bg-slate-50/50">
              {/* Sidebar */}
              <div className="w-56 border-r border-slate-200 hidden md:block bg-white p-4 space-y-2 z-0">
                <div className="mb-6 px-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white"><LayoutDashboard size={14} /></div>
                  <span className="font-bold text-sm text-slate-800">Admin Portal</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-primary rounded-lg font-medium text-sm border border-blue-100/50 shadow-sm">
                  <LayoutDashboard size={16} /> Overview
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-default">
                  <Users size={16} /> Students
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-default">
                  <BookOpen size={16} /> Sessions
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors cursor-default">
                  <BarChart2 size={16} /> Analytics
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
                {/* Header inside mockup */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button className="md:hidden p-1.5 -ml-1.5 text-slate-500 hover:bg-slate-100 rounded-md">
                      <Menu size={18} />
                    </button>
                    <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">Today's Overview</h3>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="hidden md:flex w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-sm"><Search size={14}/></div>
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm relative">
                      <Bell size={14}/>
                      <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-sm ring-2 ring-white"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between h-28 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</span>
                      <div className="p-1.5 bg-blue-50 text-primary rounded-md"><Users size={14}/></div>
                    </div>
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-slate-800">2,451</div>
                      <div className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">↑ 12% this semester</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between h-28 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Attendance</span>
                      <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-md"><Activity size={14}/></div>
                    </div>
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-slate-800">89.4%</div>
                      <div className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">↑ 2.4% from last week</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 flex flex-col justify-between h-28 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Sessions</span>
                      <div className="p-1.5 bg-amber-50 text-amber-500 rounded-md"><Clock size={14}/></div>
                    </div>
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-slate-800">14</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-1">Across 6 departments</div>
                    </div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 flex-1 flex flex-col overflow-hidden relative">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-800">Weekly Attendance Trends</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">This Week</span>
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 mt-2">
                    {[
                      { height: 60, label: 'Mon' },
                      { height: 75, label: 'Tue' },
                      { height: 45, label: 'Wed' },
                      { height: 90, label: 'Thu' },
                      { height: 65, label: 'Fri' },
                      { height: 80, label: 'Sat' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="w-full relative flex items-end justify-center rounded-t-md bg-slate-50 h-full">
                          <div className="w-full bg-blue-100 rounded-t-md group-hover:bg-blue-200 transition-colors absolute bottom-0" style={{ height: `${bar.height}%` }}>
                             <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-blue-400 rounded-t-md shadow-[0_-2px_10px_rgba(37,99,235,0.2)]" style={{ height: `${bar.height * 0.8}%` }}></div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
              className="absolute top-20 -left-12 bg-white shadow-xl border border-slate-100 rounded-2xl p-4 flex items-center gap-3 hidden lg:flex z-20"
            >
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">OTP Verified</p>
                <p className="text-xs text-slate-500">Just now</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
              className="absolute bottom-24 -right-8 bg-white shadow-xl border border-slate-100 rounded-2xl p-4 flex items-center gap-3 hidden lg:flex z-20"
            >
              <div className="bg-blue-100 text-primary p-2 rounded-full">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Session Active</p>
                <p className="text-xs text-slate-500">CS 101 - Lecture</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
              className="absolute top-1/2 -left-6 bg-white shadow-xl border border-slate-100 rounded-2xl p-4 flex items-center gap-3 hidden lg:flex z-20"
            >
              <div className="bg-amber-100 text-accent p-2 rounded-full">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Attendance Marked</p>
                <p className="text-xs text-slate-500">85/100 Present</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
