import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    role: 'College Administrator',
    name: 'Dr. Sarah Jenkins',
    college: 'State University',
    content: 'This platform eliminated our proxy attendance problem entirely. The WhatsApp OTP is genius because every student already has it installed. Highly recommended.',
    color: 'bg-primary/5',
  },
  {
    role: 'Computer Science Professor',
    name: 'Prof. Michael Chen',
    college: 'Tech Institute',
    content: 'I save about 15 minutes every lecture. I just create a session, project the code, and students mark themselves present on their phones. The dashboard is incredibly intuitive.',
    color: 'bg-secondary/5',
  },
  {
    role: '3rd Year Student',
    name: 'Priya Sharma',
    college: 'Engineering College',
    content: 'No more waiting in line to sign the sheet. It takes 5 seconds to mark my attendance, and I can always check my overall percentage in the student portal so I never fall short.',
    color: 'bg-accent/5',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-background border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text mb-6">Loved by educators and students</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl border border-slate-100 shadow-sm relative ${testimonial.color}`}
            >
              <Quote className="absolute top-6 right-6 text-slate-300/50" size={48} />
              <div className="mb-6 relative z-10">
                <p className="text-slate-700 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-200/50">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                  <p className="text-xs text-slate-400">{testimonial.college}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
