// src/app/register/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signUp } from '../../actions/actions';
import { SubmitButton } from '../login/submit-button';
import '@/styles/globals.css';

const RegisterContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleEmailBlur = () => {
    if (email.trim() === '') {
      setEmailError('Email cannot be empty');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    const errors = [];
    if (!/[a-z]/.test(password)) {
      errors.push('lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('uppercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('digit');
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push('symbol');
    }
    if (password.length < 8) {
      errors.push('at least 8 characters');
    }

    if (password.trim() === '') {
      setPasswordError('Password cannot be empty');
    } else if (errors.length > 0) {
      setPasswordError(`Password must contain ${errors.join(', ')}`);
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords must match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const isDisabled =
    email === '' ||
    password === '' ||
    confirmPassword === '' ||
    password !== confirmPassword ||
    passwordError !== '';

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-2"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          required
        />
        {emailError && (
          <p className="text-red-600 text-sm mb-6">{emailError}</p>
        )}

        <label className="text-md" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2 w-full"
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onMouseDown={() => setIsPasswordVisible(true)}
            onMouseUp={() => setIsPasswordVisible(false)}
            onMouseLeave={() => setIsPasswordVisible(false)}
            aria-label="Show Password"
          >
            👁️
          </button>
        </div>
        {passwordError && (
          <p className="text-red-600 text-sm mb-6">{passwordError}</p>
        )}

        <label className="text-md" htmlFor="confirm-password">
          Confirm Password
        </label>
        <div className="relative">
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2 w-full"
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            name="confirm-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onMouseDown={() => setIsConfirmPasswordVisible(true)}
            onMouseUp={() => setIsConfirmPasswordVisible(false)}
            onMouseLeave={() => setIsConfirmPasswordVisible(false)}
            aria-label="Show Confirm Password"
          >
            👁️
          </button>
        </div>
        {confirmPasswordError && (
          <p className="text-red-600 text-sm mb-6">{confirmPasswordError}</p>
        )}

        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
          disabled={isDisabled}
        >
          Register
        </SubmitButton>
        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

const Register: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </React.Suspense>
  );
};

export default Register;
