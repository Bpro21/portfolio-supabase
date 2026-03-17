import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data);
  };

  return (
    <section id="projects" className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
        My Latest <span className="text-gradient">Work</span>
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {projects.length > 0 ? projects.map(project => (
          <div key={project.id} className="glass-card" style={{ overflow: 'hidden', padding: '1.5rem' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              borderRadius: '12px', 
              background: '#1e293b', 
              marginBottom: '1rem',
              overflow: 'hidden'
            }}>
              <img src={project.image_url || 'https://via.placeholder.com/400x200'} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{project.description}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.live_link && <a href={project.live_link} className="text-gradient" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Live Demo</a>}
            </div>
          </div>
        )) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>No projects found yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
