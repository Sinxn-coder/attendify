import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, UserCheck, LayoutDashboard, CalendarClock, History, Fingerprint, BarChart3, Users } from 'lucide-react';

const features = [
  {
    title: 'WhatsApp OTP Authentication',
    description: 'Lightning-fast logins using secure one-time passwords sent directly to WhatsApp.',
    icon: MessageCircle,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Student Attendance Tracking',
    description: 'Accurate and frictionless tracking of student attendance for every class session.',
    icon: UserCheck,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Teacher Dashboard',
    description: 'Comprehensive overview for teachers to manage classes, view stats, and generate reports.',
    icon: LayoutDashboard,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'Session-Based Attendance',
    description: 'Create unique, time-bound sessions to prevent proxy attendance.',
    icon: CalendarClock,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Attendance History',
    description: 'Detailed logs and historical data accessible instantly for both students and staff.',
    icon: History,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    title: 'Device Fingerprint Security',
    description: 'Advanced device tracking ensures attendance is marked from the authorized student device.',
    icon: Fingerprint,
    color: 'bg-slate-100 text-slate-700',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Live charts and insights into attendance trends across departments and semesters.',
    icon: BarChart3,
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    title: 'Role-Based Access',
    description: 'Secure, partitioned access for Admins, Teachers, and Students.',
    icon: Users,
    color: 'bg-violet-100 text-violet-600',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Core Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">Everything you need to manage attendance effortlessly</h3>
          <p className="text-slate-600 text-lg">
            Our platform provides a complete suite of tools designed specifically for modern colleges to eliminate proxy attendance and streamline administration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
