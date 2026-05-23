import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, Users, Smartphone } from 'lucide-react';

const badges = [
  { icon: Lock, text: 'Secure Authentication' },
  { icon: Clock, text: 'Real-Time Attendance' },
  { icon: Users, text: 'Multi-Role Access' },
  { icon: Smartphone, text: 'Device Tracking' },
];

const TrustBadges: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Trusted by top colleges for reliable attendance
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-70">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 text-slate-600 grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
              >
                <Icon size={24} className="text-primary" />
                <span className="font-semibold">{badge.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
