import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, Check, Briefcase, Clock } from 'lucide-react';
import { supabase } from './supabaseClient'; // Adjust the path as needed

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    description: "",
    clients: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services from Supabase
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Format the data with a human-readable "added" field
      const formattedData = data.map(service => ({
        ...service,
        added: formatTimeAgo(service.created_at)
      }));

      setServices(formattedData);
    } catch (error) {
      console.error('Error fetching services:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 }
    ];

    for (let { label, seconds: interval } of intervals) {
      const count = Math.floor(seconds / interval);
      if (count >= 1) {
        return `${count} ${label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddCancel = () => {
    setShowAddForm(false);
    setNewService({
      name: "",
      category: "",
      description: "",
      clients: 0,
    });
  };

  const handleAddSubmit = async () => {
    if (newService.name.trim() === "") return;

    try {
      const { data, error } = await supabase
        .from('services')
        .insert([{
          name: newService.name,
          category: newService.category,
          description: newService.description,
          clients: newService.clients || 0,
        }])
        .select();

      if (error) throw error;

      // Add the new service to state with formatted "added" field
      setServices(prev => [
        {
          ...data[0],
          added: 'Just now'
        },
        ...prev
      ]);

      setNewService({
        name: "",
        category: "",
        description: "",
        clients: 0,
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding service:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error.message);
    }
  };

  // Add edit functionality if needed
  const handleEdit = async (id, updatedData) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;

      // Update the service in state
      setServices(services.map(service =>
        service.id === id ? { ...service, ...updatedData } : service
      ));

      setEditingId(null);
    } catch (error) {
      console.error('Error updating service:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
            <p className="text-gray-600 mt-2">Create and manage your company's service offerings</p>
          </div>
          {!showAddForm && (
            <button
              onClick={handleAddClick}
              className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Add New Service
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-6 p-6 border border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Add New Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  placeholder="e.g. Content Marketing"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Brief description of the service"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Clients</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newService.clients}
                  onChange={(e) => setNewService({ ...newService, clients: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleAddCancel}
                className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleAddSubmit}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Check size={18} />
                <span>Add Service</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <p>Loading services...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clients
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No services found. Add a new one to get started.
                        </td>
                      </tr>
                    ) : (
                      services.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.category}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {service.clients} clients
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1.5 flex-shrink-0" />
                              {service.added}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                title="Edit"
                                onClick={() => setEditingId(service.id)}
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(service.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between items-center">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{services.length}</span> of{' '}
                    <span className="font-medium">{services.length}</span> services
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
