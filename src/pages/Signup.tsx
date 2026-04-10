import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface relative flex items-center justify-center px-4">
      <div className="absolute inset-0 cyber-metal opacity-20 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface/80 backdrop-blur-xl border border-primary/30 p-8 rounded-sm relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl font-black text-white tracking-tighter uppercase mb-2 neon-glow-cyan">
            Create <span className="text-primary">Protocol</span>
          </h1>
          <p className="text-white text-[10px] uppercase tracking-[0.3em]">Initialize New Identity</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] p-3 mb-6 uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignup} className="space-y-6">
          <div>
            <label className="block text-white font-bold text-[10px] uppercase tracking-widest mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER FULL NAME..."
              className="w-full bg-surface border border-primary/20 p-3 text-white placeholder:text-white/30 focus:border-primary outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-white font-bold text-[10px] uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL..."
              className="w-full bg-surface border border-primary/20 p-3 text-white placeholder:text-white/30 focus:border-primary outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-white font-bold text-[10px] uppercase tracking-widest mb-2">Security Key (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER PASSWORD..."
              className="w-full bg-surface border border-primary/20 p-3 text-white placeholder:text-white/30 focus:border-primary outline-none transition-colors"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-surface font-black uppercase tracking-[0.3em] py-4 hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(0,204,255,0.3)]"
          >
            Create Account
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary/20"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
            <span className="bg-surface px-4 text-white/60">Alternative Uplink</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full border border-primary/30 text-white font-black uppercase tracking-[0.3em] py-4 flex items-center justify-center gap-3 hover:bg-primary/10 transition-all shadow-[0_0_15px_rgba(0,204,255,0.1)]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="mt-8 text-center text-white/40 text-[10px] uppercase tracking-widest">
          Already have an account? <Link to="/login" className="text-primary hover:text-white transition-colors underline">Access Protocol</Link>
        </p>
      </motion.div>
    </div>
  );
}
