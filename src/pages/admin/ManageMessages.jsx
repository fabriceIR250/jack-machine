import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('adminAuth');
      if (storedUser) {
        setLoading(false);  // Fixed typo: setisoading -> setLoading
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/admin/login');
      } else {
        const customUser = {
          id: user.id,
          isAuthenticated: true,
          username: user.user_metadata?.username || 'unknown',
        };
        localStorage.setItem('user', JSON.stringify(customUser));
        setLoading(false);  // Fixed typo: setisLoading -> setLoading
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch messages from Supabase
  useEffect(() => {
    if (loading) return;

    const fetchMessages = async () => {
      try {
        setLoading(false);
        const { data, error } = await supabase
          .from('user_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [loading]);

  const handleDeleteMessage = async (id) => {
    try {
      const { error } = await supabase
        .from('user_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <AdminNavbar /> */}
      <div className="p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">User Messages</h1>
            <div className="text-sm text-gray-500">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No messages found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors relative"
                >
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="font-semibold">Name:</span> {msg.name}
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span> {msg.email}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="font-semibold">Subject:</span> {msg.subject || 'No subject'}
                  </div>
                  
                  <div className="mb-3">
                    <span className="font-semibold">Message:</span>
                    <p className="mt-1 text-gray-700 whitespace-pre-line">{msg.message}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Received: {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}