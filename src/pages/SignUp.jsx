import React, { useState } from 'react';
import { supabase } from './admin/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPhone = /^\d+$/.test(identifier);
    const signUpData = isPhone
      ? { phone: '+' + identifier.replace(/^0+/, '') }
      : { email: identifier };

    const { error } = await supabase.auth.signUp({
      ...signUpData,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/login');
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="displayName">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="identifier">
              Email or Phone (e.g. 2507XXXXXXX)
            </label>
            <input
              type="text"
              id="identifier"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">or</div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full mt-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-300"
        >
          Continue with Google
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
