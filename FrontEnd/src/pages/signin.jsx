import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle between Login and Registration mode
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate backend auth delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to customer dashboard upon success
      navigate("/account"); 
    }, 1200);
  };

  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center p-6 py-16 font-sans">
      
      {/* Main Authentication Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in border border-gray-100">
        
        {/* --- LEFT SIDE: Branding Panel (Hidden on very small screens) --- */}
        <div className="w-full md:w-5/12 bg-gray-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background pattern/shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
              {isLogin ? "Welcome to Pick2Print." : "Start bringing your ideas to life."}
            </h1>
            <p className="text-gray-400 text-lg font-semibold leading-relaxed">
              {isLogin 
                ? "Sign in to track your orders, re-order past designs, and manage your account." 
                : "Create an account to access bulk discounts, save your designs, and enjoy express delivery."}
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <p className="text-sm text-gray-500 font-semibold">
              Need help? <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Contact Support</a>
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: The Form --- */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-20">
          
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {isLogin ? "Log-in" : "Create an Account"}
            </h2>
            <p className="text-gray-500 font-semibold">
              {isLogin ? "Don't have an account yet?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-2 text-red-600 hover:text-red-700 font-bold underline transition-colors focus:outline-none"
              >
                {isLogin ? "Sign-up here" : "Log-in here"}
              </button>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-bold flex items-center gap-2">
              <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">!</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Registration-only fields (Name & Phone) */}
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FiUser className="text-lg" />
                    </div>
                    <input type="text" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-red-500 focus:bg-white transition-all" placeholder="Your Full Name" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FiPhone className="text-lg" />
                    </div>
                    <input type="tel" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-red-500 focus:bg-white transition-all" placeholder="Your Phone Number" />
                  </div>
                </div>
              </div>
            )}

            {/* Email Field (Both) */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiMail className="text-lg" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-red-500 focus:bg-white transition-all" 
                  placeholder="Your Email" 
                />
              </div>
            </div>

            {/* Password Field (Both) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                {isLogin && (
                  <Link to="/forgot-password" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiLock className="text-lg" />
                </div>
                <input 
                  type={showPass ? "text" : "password"} 
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required 
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-red-500 focus:bg-white transition-all" 
                  placeholder="Your Password" 
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPass ? <FiEye className="text-lg" /> : <FiEyeOff className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            {isLogin && (
              <label className="flex items-center gap-3 text-sm text-gray-600 font-semibold cursor-pointer group mt-2">
                <input type="checkbox" className="w-5 h-5 accent-red-600 rounded cursor-pointer" />
                <span className="group-hover:text-gray-900 transition-colors">Keep me signed in</span>
              </label>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-black text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-8 
                ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 active:scale-95"}`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                isLogin ? "Log-in" : "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

          </form>

        </div>
      </div>
      
    </div>
  );
}