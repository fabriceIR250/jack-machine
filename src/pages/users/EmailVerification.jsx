import React from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../admin/supabaseClient';

const EmailVerification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || 'your email';
  const [resent, setResent] = React.useState(false);
  const [resentLoading, setResentLoading] = React.useState(false);
  const [resentError, setResentError] = React.useState(null);

  const handleResendEmail = async () => {
    try {
      setResentLoading(true);
      setResentError(null);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      
      setResent(true);
    } catch (err) {
      setResentError(err.message);
      console.error('Error resending email:', err);
    } finally {
      setResentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your email address
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-4">
              We've sent a verification link to:
            </p>
            <p className="text-lg font-bold text-blue-600 break-all">{email}</p>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Please check your inbox and click the link to verify your account.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                If you don't see the email, check your spam folder.
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Didn't receive the email?
              </p>
              <button
                onClick={handleResendEmail}
                disabled={resentLoading || resent}
                className={`mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  resentLoading || resent
                    ? 'bg-blue-300'
                    : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {resentLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : resent ? (
                  'Email Sent!'
                ) : (
                  'Resend Verification Email'
                )}
              </button>
              {resentError && (
                <p className="mt-2 text-sm text-red-600">{resentError}</p>
              )}
              {resent && (
                <p className="mt-2 text-sm text-green-600">
                  A new verification email has been sent to your inbox.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;