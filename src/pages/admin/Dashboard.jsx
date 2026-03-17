import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import ProfileManager from './ProfileManager';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="admin-container">
      {/* Mobile Toggle */}
      <button 
        className="admin-mobile-toggle glass"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={`admin-sidebar glass ${isMenuOpen ? 'open' : ''}`}>
        <h3 className="text-gradient">Admin Panel</h3>
        <nav onClick={() => setIsMenuOpen(false)}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/projects">Manage Projects</Link>
          <Link to="/admin/skills">Manage Skills</Link>
          <Link to="/admin/profile">Edit Profile</Link>
          <button onClick={handleLogout} className="btn-primary" style={{ marginTop: 'auto', background: '#ff4b4b' }}>Logout</button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="admin-content">
        <header>
          <h2>Welcome, {user.email}</h2>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div><h3>Dashboard Overview</h3><p>Manage your portfolio content from the sidebar.</p></div>} />
            <Route path="/projects" element={<ProjectManager />} />
            <Route path="/skills" element={<SkillManager />} />
            <Route path="/profile" element={<ProfileManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
