import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('projects').insert([{ title, description, image_url: imageUrl, live_link: liveLink }]);
    if (!error) {
      setTitle('');
      setDescription('');
      setImageUrl('');
      setLiveLink('');
      fetchProjects();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Manage Projects</h3>
      
      <form onSubmit={handleAddProject} className="glass" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Add New Project</h4>
        <div className="admin-form-grid" style={{ marginBottom: '1rem' }}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="glass" style={{ padding: '1rem', color: 'white' }} required />
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="glass" style={{ padding: '1rem', color: 'white' }} />
          <input type="text" placeholder="Live Link" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} className="glass" style={{ padding: '1rem', color: 'white' }} />
        </div>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="glass" style={{ padding: '1rem', color: 'white', width: '100%', marginBottom: '1rem', height: '100px' }} required></textarea>
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Project'}</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.map(project => (
          <div key={project.id} className="glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ marginBottom: '0.2rem' }}>{project.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{project.description.substring(0, 100)}...</p>
            </div>
            <button onClick={() => handleDelete(project.id)} className="btn-primary" style={{ background: '#ff4b4b', padding: '0.5rem 1rem' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
