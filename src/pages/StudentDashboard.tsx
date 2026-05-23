import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, LogOut, Key, Calendar, Clock, CheckCircle2, AlertCircle, Lock, PlayCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import WhatsAppOTP from '../components/WhatsAppOTP';

const StudentDashboard: React.FC = () => {
  const [sessionKey, setSessionKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState<boolean | null>(null);
  const [activeSession, setActiveSession] = useState<{ id: string; youtube_url: string } | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student || { name: 'Student', phone_number: 'N/A' };

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
  
      if (!error && data) {
        setActiveSession(data);
        
        // Check if student already verified for this session
        const { data: attendanceRecord } = await supabase
          .from('attendance')
          .select('*')
          .eq('session_id', data.id)
          .eq('student_name', student.name)
          .single();
          
        if (attendanceRecord && attendanceRecord.verified) {
          setVerifySuccess(true);
        }
      } else {
        setActiveSession(null);
        setVerifySuccess(null); // Reset verify if session ends
      }
    };
  
    fetchSession();
    const interval = setInterval(fetchSession, 5000);
    return () => clearInterval(interval);
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleVerifySuccess = async () => {
    setVerifySuccess(true);
    
    // Actually mark attendance in the database
    if (activeSession) {
      await supabase.from('attendance').insert([{
        session_id: activeSession.id,
        student_name: student.name,
        verified: true
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl text-white shadow-soft">
              <ShieldCheck size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Attendify <span className="text-secondary font-medium text-sm border border-secondary/20 bg-secondary/10 px-2 py-0.5 rounded-full ml-1">Student</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <span className="font-bold text-slate-600 uppercase">{student.name.substring(0, 2)}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight capitalize">{student.name}</p>
                <p className="text-xs text-slate-500">{student.phone_number}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-500 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 capitalize">Welcome back, {student.name}!</h1>
          <p className="text-slate-500">You have an active live class. Verify your attendance instantly.</p>
        </div>

        {/* Video Player Section */}
        {activeSession ? (
          <div className={`mb-12 relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center border border-slate-200 group ${verifySuccess ? 'aspect-video' : 'min-h-[650px]'}`}>
            
            {/* Real Video Content (Visible when unlocked) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${verifySuccess ? 'opacity-100 z-20' : 'opacity-30 z-0 pointer-events-none'}`}>
              {verifySuccess ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(activeSession.youtube_url) || ''}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900"></div>
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 via-slate-900 to-slate-900"></div>
                </>
              )}
            </div>

            {/* Locked Overlay */}
            <AnimatePresence>
              {!verifySuccess && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 z-10 bg-slate-900/50 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center overflow-y-auto"
                >
                  <div className="bg-white/10 p-6 rounded-full mb-6 border border-white/20 shadow-2xl backdrop-blur-sm">
                    <Lock size={48} className="text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">Class is Locked</h2>
                  <p className="text-slate-300 mb-8 max-w-md text-lg drop-shadow-md">
                    Verify your attendance to unlock the live stream for this class.
                  </p>

                  <div className="w-full max-w-md relative z-20 mt-4">
                    <WhatsAppOTP 
                      onSuccess={handleVerifySuccess}
                      style={{ background: 'transparent', padding: '0', minHeight: 'auto' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mb-12 rounded-2xl bg-white border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <Clock size={48} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Active Class</h2>
            <p className="text-slate-500 max-w-md">There are no live classes happening right now. Please wait for your teacher to start a session.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* Stats Card */}
          <div className="flex flex-col gap-6">
            <div className="glass-card p-6 border border-slate-200 bg-white flex items-center gap-4">
              <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Classes Attended</p>
                <p className="text-3xl font-bold text-slate-800">42</p>
              </div>
            </div>
            
            <div className="glass-card p-6 border border-slate-200 bg-white flex items-center gap-4">
              <div className="bg-amber-100 p-4 rounded-full text-amber-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Overall Attendance</p>
                <p className="text-3xl font-bold text-slate-800">92%</p>
              </div>
            </div>
          </div>
        </div>


      </main>
    </div>
  );
};

export default StudentDashboard;
