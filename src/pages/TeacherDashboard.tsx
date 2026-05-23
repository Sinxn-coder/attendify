import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Play, StopCircle, Copy, Users, Clock, LogOut, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const TeacherDashboard: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [sessionCode, setSessionCode] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // State for sessions
  const [sessions, setSessions] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Fetch sessions (both active and past)
  const fetchSessions = async () => {
    setLoadingSessions(true);
    const { data, error } = await supabase.from('sessions').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setSessions(data);
      
      const activeSession = data.find((s: any) => s.is_active);
      if (activeSession) {
        const createdTime = new Date(activeSession.created_at).getTime();
        const durationMs = (activeSession.duration_minutes || 60) * 60 * 1000;
        const now = new Date().getTime();
        
        if (now > createdTime + durationMs) {
          await supabase.from('sessions').update({ is_active: false }).eq('id', activeSession.id);
          setIsLive(false);
          setSessionCode('');
          setSessionId(null);
          setTimeLeft('');
          // Fetch again to update state
          const { data: updatedData } = await supabase.from('sessions').select('*').order('created_at', { ascending: false });
          if (updatedData) setSessions(updatedData);
        } else {
          setIsLive(true);
          setSessionCode(activeSession.id);
          setSessionId(activeSession.id);
          viewAttendance(activeSession.id);
          
          // Calculate time left
          const remainingMs = (createdTime + durationMs) - now;
          const mins = Math.floor(remainingMs / 60000);
          const secs = Math.floor((remainingMs % 60000) / 1000);
          setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`);
        }
      }
    } else {
      console.error('Error fetching sessions', error);
    }
    setLoadingSessions(false);
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 1000); // Check every second for the timer
    return () => clearInterval(interval);
  }, []);

  // Start a new live session (teacher provides YouTube URL)
  const handleStartLive = async () => {
    if (!youtubeUrl) return;
    setIsSaving(true);
    const { data, error } = await supabase
      .from('sessions')
      .insert([{ youtube_url: youtubeUrl, is_active: true, duration_minutes: durationMinutes }])
      .select()
      .single();
    setIsSaving(false);
    if (error) {
      alert('Failed to start session');
      console.error(error);
    } else {
      setYoutubeUrl('');
      setIsLive(true);
      setSessionCode(data.id);
      setSessionId(data.id);
      fetchSessions();
    }
  };

  // End an active session
  const handleStopLive = async (sessionId: string) => {
    const { error } = await supabase.from('sessions').update({ is_active: false }).eq('id', sessionId);
    if (error) {
      alert('Failed to stop session');
      console.error(error);
    } else {
      setIsLive(false);
      setSessionCode('');
      setSessionId(null);
      setTimeLeft('');
      fetchSessions();
    }
  };

  // View attendance list for a specific session
  const viewAttendance = async (id: string) => {
    setLoadingAttendance(true);
    const { data, error } = await supabase.from('attendance').select('student_name, verified, created_at').eq('session_id', id).order('created_at', { ascending: false });
    if (!error && data) {
      setAttendanceList(data);
      setSelectedSession(id);
      setAttendanceCount(data.length);
    } else {
      console.error('Error loading attendance', error);
    }
    setLoadingAttendance(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const ongoingSessions = sessions.filter(s => s.is_active);
  const recentSessions = sessions.filter(s => !s.is_active);

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
              Attendify <span className="text-primary font-medium text-sm border border-primary/20 bg-primary/10 px-2 py-0.5 rounded-full ml-1">Console</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <span className="font-bold text-slate-600">JS</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-800">John Smith</p>
                <p className="text-xs text-slate-500">testing@2026</p>
              </div>
            </div>
            <button onClick={() => navigate('/login')} className="text-slate-500 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          {!isLive ? (
            <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="w-full md:w-32">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    id="durationMinutes"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                    placeholder="Duration"
                    className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
                    min
                  </span>
                </div>
              </div>
              <button 
                onClick={handleStartLive}
                disabled={!youtubeUrl || isLoading}
                className={`flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-soft ${
                  (!youtubeUrl || isLoading) 
                    ? 'bg-emerald-500/60 cursor-not-allowed' 
                    : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Play size={20} />
                    Start Live Session
                  </>
                )}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => sessionId && handleStopLive(sessionId)}
              disabled={isLoading}
              className={`flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-soft ${
                isLoading 
                  ? 'bg-rose-500/60 cursor-not-allowed' 
                  : 'bg-rose-500 hover:bg-rose-600 hover:shadow-lg hover:-translate-y-0.5 animate-pulse'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <StopCircle size={20} />
                  End Session
                </>
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {isLive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* API Integration Card */}
              <div className="lg:col-span-2 glass-card p-6 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Session is Live
                  </h3>
                  <div className="flex gap-2">
                    {timeLeft && (
                      <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full border border-amber-200 shadow-sm flex items-center gap-1">
                        <Clock size={12} /> {timeLeft} left
                      </span>
                    )}
                    <span className="text-xs font-semibold bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-600 shadow-sm">
                      Listening for webhooks...
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">Copy this API Session Key and use it in your LMS platform to start routing students for verification.</p>
                
                <div className="bg-slate-900 rounded-xl p-4 flex items-center justify-between font-mono text-sm shadow-inner group">
                  <span className="text-emerald-400">{sessionCode}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="text-slate-400 hover:text-white transition-colors p-2"
                  >
                    {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Live Stats Card */}
              <div className="glass-card p-6 flex flex-col justify-center items-center text-center border-emerald-500/20 bg-emerald-500/5">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Users size={32} className="text-emerald-500" />
                </div>
                <h4 className="text-slate-500 font-medium mb-1">Verified Students</h4>
                <div className="text-5xl font-bold text-slate-800 tracking-tight">{attendanceCount}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attendance List Section for Active or Selected Session */}
        {(isLive || selectedSession) && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-slate-400" />
                {isLive ? 'Live Attendance' : 'Session Attendance'}
              </h3>
              <span className="text-sm text-slate-500 font-medium">Total: {attendanceCount}</span>
            </div>
            
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loadingAttendance ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                        Loading attendance...
                      </td>
                    </tr>
                  ) : attendanceList.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                        No students have marked attendance yet.
                      </td>
                    </tr>
                  ) : (
                    attendanceList.map((student, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">{student.student_name}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Verified
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500">
                          {new Date(student.created_at).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* History Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              Recent Sessions
            </h3>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Session Date</th>
                  <th className="px-6 py-4">Module / Class</th>
                  <th className="px-6 py-4">API Key Used</th>
                  <th className="px-6 py-4 text-right">Verified Count</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No recent sessions found. Start a live session to see records here.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
