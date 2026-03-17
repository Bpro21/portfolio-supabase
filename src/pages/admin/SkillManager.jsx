import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('name');
    if (!error) setSkills(data);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    const { error } = await supabase.from('skills').insert([{ name }]);
    if (!error) {
      setName('');
      fetchSkills();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) fetchSkills();
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Manage Skills</h3>
      
      <form onSubmit={handleAddSkill} className="glass admin-form-flex" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <input 
          type="text" 
          placeholder="Skill Name (e.g. React.js)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="glass" 
          style={{ flex: 1, padding: '1rem', color: 'white' }} 
          required 
        />
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Skill'}</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {skills.map(skill => (
          <div key={skill.id} className="glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{skill.name}</span>
            <button onClick={() => handleDelete(skill.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
