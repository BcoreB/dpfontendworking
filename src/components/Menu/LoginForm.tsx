// app/components/LoginForm.tsx
"use client"
import React, { useState } from 'react';
import { useDirection } from '../../app/DirectionContext';
import { useEmployee } from '@/app/EmployeeContext';
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const { toggleDirection, isRtl } = useDirection();
  const { setEmployeeCode } = useEmployee();

  
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === '12345' && password === '12345') {
      console.log('Setting employeeCode to 12345');
      setEmployeeCode('12345'); // Set employeeCode in context
      window.location.href = '/home';
    } else if (username === '67890' && password === '67890') {
      console.log('Setting employeeCode to 67890');
      setEmployeeCode('67890'); // Set employeeCode in context
      window.location.href = '/home';
    } else {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <form
      className={`rounded bg-white rounded-lg py-12 mb-4 text-left ${isRtl ? 'text-right' : ''}`}
      onSubmit={handleLogin}
    >
      <div className="mb-4">
        <input
          className={`px-6 w-10/12 py-2 rounded-lg text-black focus:outline-none ${isRtl ? 'text-right' : ''}`}
          id="username"
          type="text"
          placeholder="User Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          className={`px-6 w-10/12 py-2 rounded-lg text-black focus:outline-none ${isRtl ? 'text-right' : ''}`}
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <select
          className={`px-6 w-10/12 py-2 rounded-lg text-black focus:outline-none ${isRtl ? 'text-right' : ''}`}
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
      <div className="flex w-10/12 pb-4 items-center justify-between">
        <div className="remember">
          <input type="checkbox" className='bg-blue' id="remember" name="remember" value="true" />
          <label> Remember me</label>
        </div>
        <a href="" className='text-blue-500'><span dir="ltr">Forgot password?</span></a>
      </div>
      <div className="">
        <button
          className="bg-black text-white w-10/12 font-bold py-2 p-4 rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
        >
          LOGIN
        </button>
        <div className='mt-5'>
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
