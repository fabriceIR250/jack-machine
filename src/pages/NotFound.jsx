import { useNavigate } from 'react-router-dom';
import { Wrench, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with wrench icon */}
        <div className="bg-blue-600 p-6 flex items-center justify-center">
          <Wrench className="h-12 w-12 text-white" />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Oops! The jackport you're looking for seems to be disconnected.
            Let's get you back to working order.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              Homepage
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
          Need help?{' '}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}