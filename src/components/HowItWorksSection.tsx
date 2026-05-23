import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Teacher creates session',
    description: 'A new secure session is generated with a unique timeframe and location bounds.',
    icon: BookOpen,
  },
  {
    title: 'Student logs in via WhatsApp',
    description: 'Students receive an instant OTP on WhatsApp, eliminating password sharing.',
    icon: Smartphone,
  },
  {
    title: 'Device & OTP Verification',
    description: 'The system validates the OTP and ensures the device fingerprint matches the student profile.',
    icon: ShieldCheck,
  },
  {
    title: 'Attendance Recorded',
    description: 'Once verified, attendance is marked instantly and syncs with the teacher dashboard.',
    icon: CheckCircle2,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">Four simple steps to secure attendance</h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-100 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-soft flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/20 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                      <Icon size={32} />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
