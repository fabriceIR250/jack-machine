import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Check, Clock } from 'lucide-react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    description: "",
    clients: 0,
    image_url: "",
    imageFile: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('adminAuth');
      if (storedUser) {
        setIsLoading(false);
        fetchServices(); // Added fetchServices call here
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
        setIsLoading(false); // Fixed typo: setLoading -> setIsLoading
        fetchServices(); // Added fetchServices call here
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted = data.map(service => ({
        ...service,
        added: formatTimeAgo(service.created_at),
      }));
      setServices(formatted);
    } catch (err) {
      console.error('Error fetching services:', err.message);
      setError('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);
    const units = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];
    for (const { label, seconds: s } of units) {
      const count = Math.floor(seconds / s);
      if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  const handleAddSubmit = async () => {
    if (newService.name.trim() === "") {
      setError('Service name is required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let imageUrl = newService.image_url;

      if (newService.imageFile) {
        const fileExt = newService.imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('service-photos')
          .upload(fileName, newService.imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('service-photos')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { data, error: insertError } = await supabase
        .from('services')
        .insert([{
          name: newService.name,
          category: newService.category,
          description: newService.description,
          clients: newService.clients,
          image_url: imageUrl,
        }])
        .select();

      if (insertError) throw insertError;

      setServices(prev => [{
        ...data[0],
        added: 'Just now'
      }, ...prev]);

      setNewService({
        name: "",
        category: "",
        description: "",
        clients: 0,
        image_url: "",
        imageFile: null,
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding service:', error.message);
      setError('Failed to add service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      setIsLoading(true);
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error.message);
      setError('Failed to delete service');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (service) => {
    setEditingId(service.id);
    setEditingData({ ...service });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingData({});
  };

  const saveEditing = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('services')
        .update({
          name: editingData.name,
          category: editingData.category,
          description: editingData.description,
          clients: editingData.clients,
          image_url: editingData.image_url,
        })
        .eq('id', editingId);

      if (error) throw error;

      setServices(services.map(service =>
        service.id === editingId ? { ...editingData, added: service.added } : service
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating service:', error.message);
      setError('Failed to update service');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
            <p className="text-gray-600 mt-2">Create and manage your company's service offerings</p>
          </div>
          {!showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)} 
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={isLoading}
            >
              <Plus size={18} className="mr-2" /> Add New Service
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {showAddForm && (
          <div className="bg-white border p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-600">Add Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name', 'category', 'description'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    value={newService[field]}
                    onChange={e => setNewService({ ...newService, [field]: e.target.value })}
                    placeholder={`Enter ${field}`}
                    className={`w-full border p-2 rounded ${field === 'description' ? 'col-span-2' : ''}`}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clients</label>
                <input
                  type="number"
                  value={newService.clients}
                  onChange={e => setNewService({ ...newService, clients: parseInt(e.target.value) || 0 })}
                  placeholder="Number of clients"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewService({ ...newService, imageFile: e.target.files[0] })}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button 
                onClick={() => setShowAddForm(false)} 
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleAddSubmit} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          {services.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No services found. {!showAddForm && (
                <button 
                  onClick={() => setShowAddForm(true)} 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Add your first service
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Clients</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Added</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {services.map(service => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {editingId === service.id ? (
                          <div className="space-y-2">
                            <input 
                              value={editingData.name} 
                              onChange={e => setEditingData({ ...editingData, name: e.target.value })} 
                              className="border p-2 rounded w-full" 
                              placeholder="Service name"
                            />
                            <input 
                              value={editingData.category} 
                              onChange={e => setEditingData({ ...editingData, category: e.target.value })} 
                              className="border p-2 rounded w-full" 
                              placeholder="Category"
                            />
                            <input 
                              value={editingData.image_url} 
                              onChange={e => setEditingData({ ...editingData, image_url: e.target.value })} 
                              className="border p-2 rounded w-full" 
                              placeholder="Image URL"
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.category}</div>
                            {service.image_url && (
                              <img 
                                src={service.image_url} 
                                alt={service.name} 
                                className="mt-2 w-16 h-16 object-cover rounded border"
                              />
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === service.id ? (
                          <textarea 
                            value={editingData.description} 
                            onChange={e => setEditingData({ ...editingData, description: e.target.value })} 
                            className="border p-2 rounded w-full h-24" 
                            placeholder="Description"
                          />
                        ) : (
                          <div className="text-sm text-gray-700 line-clamp-3">{service.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === service.id ? (
                          <input 
                            type="number" 
                            value={editingData.clients} 
                            onChange={e => setEditingData({ ...editingData, clients: parseInt(e.target.value) || 0 })} 
                            className="border p-2 rounded w-20" 
                          />
                        ) : (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {service.clients} clients
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          {service.added}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {editingId === service.id ? (
                          <>
                            <button 
                              onClick={saveEditing} 
                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                              disabled={isLoading}
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={cancelEditing} 
                              className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50"
                              disabled={isLoading}
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEditing(service)} 
                              className="text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(service.id)} 
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}