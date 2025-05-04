import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './pages/users/Settings';  // Correct import

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Other Routes */}
          <Route path="/settings" element={<Settings />} /> {/* Settings route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
