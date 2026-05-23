import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const FIREBASE_DB = "https://gate-ways-default-rtdb.firebaseio.com";

function WhatsAppOTP({ onSuccess, style = {} }: { onSuccess?: (data?: any) => void; style?: React.CSSProperties }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [timer, setTimer] = useState(300);
  const [requestId, setRequestId] = useState<string | null>(null);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "").slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById("cotp-" + (index + 1))?.focus();
    }
  };

  const sendOTP = async () => {
    let cleanPhone = phone.replace(/\D/g, "").slice(-10);

    if (cleanPhone.length !== 10) {
      setMessage("Enter a valid 10-digit phone number");
      setMessageType("error");
      return;
    }
    setLoading(true);
    setMessage("");
    
    try {
      // 1. Check if student exists in Supabase
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('phone_number', cleanPhone)
        .single();
        
      if (studentError || !student) {
        setMessage("Phone number not registered. Contact your teacher.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      // 2. Rate limit checks
      const twoMinsAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const today = new Date();
      today.setHours(0,0,0,0);
      const startOfDay = today.toISOString();

      const { data: recentRequests } = await supabase
        .from('otp_requests_log')
        .select('*')
        .eq('phone_number', cleanPhone)
        .gte('requested_at', twoMinsAgo);

      if (recentRequests && recentRequests.length > 0) {
        setMessage("Please wait 2 minutes before requesting another OTP.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const { data: dailyRequests } = await supabase
        .from('otp_requests_log')
        .select('*')
        .eq('phone_number', cleanPhone)
        .gte('requested_at', startOfDay);

      if (dailyRequests && dailyRequests.length >= 5) {
        setMessage("Daily OTP limit (5) exceeded. Try again tomorrow.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      // 3. Log OTP request
      await supabase.from('otp_requests_log').insert([{ phone_number: cleanPhone }]);

      // REAL SEND OTP via Firebase
      const resp = await fetch(FIREBASE_DB + "/otpRequests.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: cleanPhone,
          status: "pending",
          origin: window.location.origin,
          createdAt: Date.now(),
          verifyRequest: false,
          verified: false
        })
      });
      const data = await resp.json();
      setRequestId(data.name);

      setStep(2);
      setMessage("OTP sent! Check your WhatsApp.");
      setMessageType("success");
      startTimer();
    } catch (e) {
      setMessage("Connection error. Please try again.");
      setMessageType("error");
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setMessage("Please enter the complete 6-digit OTP");
      setMessageType("error");
      return;
    }
    setLoading(true);
    setMessage("");
    
    try {
      await fetch(FIREBASE_DB + "/otpRequests/" + requestId + ".json", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enteredOtp: code, verifyRequest: true })
      });
      checkResult();
    } catch (e) {
      setMessage("Verification failed. Try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  const checkResult = async () => {
    for (let i = 0; i < 20; i++) {
      try {
        const resp = await fetch(FIREBASE_DB + "/otpRequests/" + requestId + ".json");
        const data = await resp.json();
        if (data && data.verified === true) {
          setMessage("Verification successful!");
          setMessageType("success");
          setTimeout(() => {
            if (onSuccess) onSuccess({ verified: true, phone });
          }, 500);
          return;
        }
        if (data && data.status === "wrong_otp") {
          setMessage("Wrong OTP. Please try again.");
          setMessageType("error");
          setLoading(false);
          return;
        }
        if (data && data.status === "expired") {
          setMessage("OTP expired. Please request a new one.");
          setMessageType("error");
          resetForm();
          return;
        }
      } catch (e) {}
      await new Promise(r => setTimeout(r, 2000));
    }
    setMessage("Timeout. Please try again.");
    setMessageType("error");
    setLoading(false);
  };

  const startTimer = () => {
    setTimer(300);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { 
          clearInterval(interval); 
          setMessage("OTP expired. Please request a new one.");
          setMessageType("error");
          resetForm();
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetForm = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setLoading(false);
  };

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  };

  // Styles based on celonix-otp-react
  const containerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    width: "100%",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    ...style
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "35px 30px",
    width: "100%",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.25)",
    position: "relative",
    overflow: "hidden"
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "52px",
    border: "2px solid #e2e8f0",
    borderRadius: "14px",
    padding: "0 16px",
    fontSize: "16px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    backgroundColor: "#f8fafc"
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "52px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "16px",
    transition: "all 0.2s",
    letterSpacing: "0.3px"
  };

  const otpInputStyle: React.CSSProperties = {
    width: "48px",
    height: "58px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 700,
    border: "2px solid #e2e8f0",
    borderRadius: "14px",
    outline: "none",
    color: "#0f172a",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s, box-shadow 0.2s"
  };

  const messageStyle = (type: string): React.CSSProperties => ({
    textAlign: "center",
    fontSize: "14px",
    marginTop: "16px",
    fontWeight: 500,
    padding: "10px 16px",
    borderRadius: "10px",
    backgroundColor: type === "success" ? "#f0fdf4" : "#fef2f2",
    color: type === "success" ? "#16a34a" : "#dc2626"
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>OTP Login</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0, fontWeight: 400 }}>Verify your phone number via WhatsApp</p>
        </div>

        {step === 1 && (
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#475569", marginBottom: "6px", display: "block" }}>Phone Number</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "16px", top: "16px", color: "#64748b", fontWeight: 600 }}>+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                maxLength={10}
                style={{ ...inputStyle, paddingLeft: "52px" }}
                autoFocus
              />
            </div>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>Enter your 10-digit phone number</p>
            <button
              onClick={sendOTP}
              disabled={loading}
              style={{ ...buttonStyle, opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#475569", marginBottom: "8px", display: "block" }}>Enter OTP Code</label>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={"cotp-" + i}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => { 
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      document.getElementById("cotp-" + (i - 1))?.focus(); 
                    }
                  }}
                  style={otpInputStyle}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px", textAlign: "center" }}>Enter the 6-digit code sent to your WhatsApp</p>
            <button
              onClick={verifyOTP}
              disabled={loading}
              style={{ ...buttonStyle, opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p style={{ textAlign: "center", color: "#64748b", fontSize: "14px", marginTop: "16px", fontWeight: 500 }}>
              Code expires in <span style={{ fontWeight: 700, color: timer < 60 ? "#dc2626" : "#2563eb" }}>{formatTime()}</span>
            </p>
            <p 
              style={{ textAlign: "center", marginTop: "12px", fontSize: "13px", color: "#64748b", cursor: "pointer", textDecoration: "underline" }}
              onClick={resetForm}
            >
              Change phone number
            </p>
          </div>
        )}

        {loading && (
          <div style={{ width: "40px", height: "40px", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "20px auto" }} />
        )}

        {message && <p style={messageStyle(messageType)}>{message}</p>}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default WhatsAppOTP;
