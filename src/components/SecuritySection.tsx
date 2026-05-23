import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Fingerprint, RefreshCw } from 'lucide-react';

const securityFeatures = [
  {
    icon: RefreshCw,
    title: 'OTP Expiry Protection',
    description: 'Generated OTPs are valid for a maximum of 60 seconds, preventing delayed proxy attempts.',
  },
  {
    icon: Key,
    title: 'Secure JWT Authentication',
    description: 'All sessions are secured using stateless JWT tokens with strict payload validation.',
  },
  {
    icon: Fingerprint,
    title: 'Device Fingerprinting',
    description: 'We generate a unique device hash to ensure students use their registered primary device.',
  },
  {
    icon: Shield,
    title: 'Duplicate Prevention',
    description: 'Smart algorithms instantly detect and block multiple logins or OTP attempts from the same IP or device.',
  },
];

const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Enterprise Security</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">Bank-grade security for your attendance data</h3>
            <p className="text-slate-600 text-lg mb-8">
              We understand the importance of academic integrity. Our platform uses multi-layered security measures to guarantee that every attendance record is authentic and verified.
            </p>
            
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{feature.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative glass-card p-8 border border-slate-200/50"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Shield size={28} className="text-emerald-500" />
                  <span className="font-bold text-xl text-slate-800">Security Status</span>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">All Systems Normal</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'End-to-End Encryption', status: 'Active' },
                  { label: 'Network Firewall', status: 'Active' },
                  { label: 'Intrusion Detection', status: 'Monitoring' },
                  { label: 'Data Backup', status: 'Synced just now' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
