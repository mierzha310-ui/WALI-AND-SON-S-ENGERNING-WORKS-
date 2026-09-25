import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Lock, User, ArrowLeft, ShieldAlert, KeyRound } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await login(username, password);
    setIsLoading(false);

    if (res.success) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setErrorMsg(res.error || 'Login failed. Please verify credentials.');
    }
  };

  const handleFillDemoCredentials = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#080b0f] flex flex-col justify-center items-center p-4">
      {/* Return to website link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>
        <span className="text-[11px] font-mono text-slate-500">v1.0.0-Demo</span>
      </div>

      <div className="w-full max-w-md bg-[#10141c] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tight text-white font-heading">
            Admin Console Login
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to manage services, projects, inquiries, and settings
          </p>
        </div>

        {/* Security / Prototype Notice */}
        <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-300 font-semibold mb-0.5">Prototype Storage Architecture:</strong>
            Authentication state is stored in client-side LocalStorage. This module is structured to integrate with Firebase Auth or Supabase in production.
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username or Email"
            required
            autoComplete="username"
            placeholder="admin"
            leftIcon={<User className="w-4 h-4" />}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="mt-2"
          >
            Access Dashboard
          </Button>
        </form>

        {/* Quick demo credentials filler */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={handleFillDemoCredentials}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-4"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Fill Demo Credentials (admin / admin123)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
