// app/components/LoginForm.tsx
"use client"
import React, { useState } from 'react';
import { useDirection } from '../../app/DirectionContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const { toggleDirection, isRtl } = useDirection();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if location is selected
    if (location === '') {
      setError('Please select a location.');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      window.location.href = '/home';
    } else {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <form
      className="rounded bg-white rounded-lg px-10 py-12 mb-4 text-left"
      onSubmit={handleLogin}
    >
      <div className="mb-4">
        <h2 className='text-black text-xl font-semibold'>Login to your account</h2>
      </div>
      <div className="mb-4">
        <input
          className="px-6 w-full py-2 rounded-lg text-black focus:outline-none"
          id="username"
          type="text"
          placeholder="User Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          className="px-6 w-full py-2 rounded-lg text-black focus:outline-none"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <select
          className="px-6 w-full py-2 rounded-lg text-black focus:outline-none"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
        </select>
      </div>
      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          className="bg-black text-white font-bold py-1 p-4 rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
        >
          LOGIN
        </button>
        <div>
          <input
            type="checkbox"
            id="languageSelect"
            onChange={toggleDirection}
            checked={isRtl}
          />
          <label className='text-black'> AR</label>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
