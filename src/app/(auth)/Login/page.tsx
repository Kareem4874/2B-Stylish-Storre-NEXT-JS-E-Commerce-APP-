"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {
    setIsLoading(true)
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/"
    })
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      {/* Laser Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-pulse"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-pulse delay-700"></div>

      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center mb-12">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">2B Stylish</h1>
                <p className="text-blue-400 text-sm">Premium Store</p>
              </div>
            </div>
            
            {/* Hero Content */}
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-white leading-tight">
                Welcome to the
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Future of Commerce
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                Experience seamless shopping with advanced AI-powered recommendations and lightning-fast checkout.
              </p>
              
              {/* Features */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center text-slate-300">
                  <Zap className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Lightning Fast Performance</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Shield className="w-5 h-5 text-cyan-400 mr-3" />
                  <span>Bank-Grade Security</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <ArrowRight className="w-5 h-5 text-purple-400 mr-3" />
                  <span>Seamless User Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">2B Stylish</h1>
                </div>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-white">Sign In</h2>
              <p className="text-slate-400 text-lg">Access your premium account</p>
            </div>

            {/* Login Card */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
              
              {/* Card */}
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full h-14 pl-12 pr-4 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-white text-lg placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-500/70 hover:bg-slate-800/80"
                        {...register("email", { 
                          required: "Email address is required", 
                          pattern: { 
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                            message: "Please enter a valid email address" 
                          } 
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full h-14 pl-12 pr-14 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-white text-lg placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-500/70 hover:bg-slate-800/80"
                        {...register("password", { 
                          required: "Password is required", 
                          minLength: { 
                            value: 6, 
                            message: "Password must be at least 6 characters long" 
                          } 
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                      <p className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline">Forgot your password?</p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-slate-900 text-slate-400">New to 2B Stylish?</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      href="/Register"
                      className="inline-flex items-center justify-center w-full h-12 border-2 border-slate-600 text-slate-200 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 group"
                    >
                      <span>Create New Account</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-slate-900 text-slate-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button variant="outline" className="h-12 bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="h-12 bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-slate-500 text-sm">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}