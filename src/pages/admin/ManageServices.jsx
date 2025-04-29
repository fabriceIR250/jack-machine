import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Check, Briefcase, Clock } from 'lucide-react';

export default function ManageServices() {
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: "Web Development", 
      category: "Development",
      description: "Custom website development services",
      clients: 12,
      added: "2 weeks ago"
    },
    { 
      id: 2, 
      name: "Mobile App Development", 
      category: "Development",
      description: "iOS and Android application development",
      clients: 8,
      added: "1 month ago"
    },
    { 
      id: 3, 
      name: "UI/UX Design", 
      category: "Design",
      description: "User interface and experience design",
      clients: 15,
      added: "3 days ago"
    }
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({ 
    name: "", 
    category: "",
    description: "",
    clients: 0,
    added: "Just now"
  });
  
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
      added: "Just now" 
    });
  };

  const handleAddSubmit = () => {
    if (newService.name.trim() === "") return;
    
    setServices([...services, { 
      id: Date.now(), 
      name: newService.name, 
      category: newService.category,
      description: newService.description,
      clients: newService.clients || 0,
      added: "Just now"
    }]);
    
    setNewService({ 
      name: "", 
      category: "",
      description: "",
      clients: 0,
      added: "Just now" 
    });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
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
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Brief description of the service"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Clients</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newService.clients}
                  onChange={(e) => setNewService({...newService, clients: parseInt(e.target.value) || 0})}
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
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}