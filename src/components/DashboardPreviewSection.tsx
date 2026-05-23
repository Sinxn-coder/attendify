import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, CheckCircle, LayoutDashboard, Settings, BookOpen, ShieldCheck, Menu, Plus } from 'lucide-react';

const DashboardPreviewSection: React.FC = () => {
  return (
    <section id="dashboard" className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Intuitive Dashboards</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">Designed for clarity and control</h3>
          <p className="text-slate-600 text-lg">
            Whether you are a teacher managing hundreds of students or an admin overseeing the entire college, our dashboards provide the insights you need.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Dashboard UI Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar Mockup */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 p-6 hidden md:block">
              <div className="flex items-center gap-2 mb-10 text-primary">
                <ShieldCheck size={28} />
                <span className="font-bold text-xl text-slate-800 tracking-tight">Attendify</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 text-primary rounded-lg font-medium border border-blue-100/50 shadow-sm cursor-default">
                  <LayoutDashboard size={18} /> Dashboard
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg font-medium transition-colors cursor-default">
                  <BookOpen size={18} /> My Classes
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg font-medium transition-colors cursor-default">
                  <Users size={18} /> Students List
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg font-medium transition-colors cursor-default">
                  <Settings size={18} /> Settings
                </div>
              </div>
            </div>

            {/* Main Content Mockup */}
            <div className="flex-1 p-8 bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <button className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <Menu size={20} />
                  </button>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-800">Teacher Dashboard</h4>
                    <p className="text-sm text-slate-500">Welcome back, Prof. Smith</p>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 transition-colors">
                  <Plus size={18} /> <span className="hidden sm:inline">New Session</span><span className="sm:hidden">Create Session</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Total Students</span>
                    <Users size={16} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">1,248</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Avg. Attendance</span>
                    <TrendingUp size={16} className="text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">86%</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Active Sessions</span>
                    <Calendar size={16} className="text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">3</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Verified Today</span>
                    <CheckCircle size={16} className="text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">492</div>
                </div>
              </div>

              {/* Recent Activity / Chart Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-xl border border-slate-200/60 bg-white shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <span className="font-bold text-slate-800">Weekly Attendance Rate</span>
                    <select className="text-xs border-slate-200 rounded text-slate-500 bg-white px-2 py-1 outline-none cursor-default">
                      <option>Last 7 Days</option>
                    </select>
                  </div>
                  <div className="p-6 h-56 flex items-end justify-between gap-2 md:gap-4">
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

                <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <span className="font-bold text-slate-800">Recent Sessions</span>
                  </div>
                  <div className="p-0 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-800">CS 301 - Networks</p>
                        <p className="text-xs text-slate-500">10:00 AM • Room 402</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Completed</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-800">CS 305 - Database</p>
                        <p className="text-xs text-slate-500">01:00 PM • Room 204</p>
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-blue-50 px-2 py-1 rounded-full animate-pulse uppercase tracking-wider">Active Now</span>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-800">CS 308 - AI</p>
                        <p className="text-xs text-slate-500">03:30 PM • Room 105</p>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Student Dashboard Mini */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute -bottom-10 -right-6 md:-right-12 w-72 glass-card p-5 hidden lg:block border border-slate-200/50 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-primary"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">Student Profile</p>
                <p className="text-xs text-slate-500">B.Tech CS - 3rd Year</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Overall Attendance</span>
                <span className="text-xs font-bold text-emerald-600">92%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[92%]"></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
              <div className="text-center">
                <p className="text-xs text-slate-500">Present</p>
                <p className="text-sm font-bold text-slate-800">45</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">Absent</p>
                <p className="text-sm font-bold text-slate-800">4</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;
