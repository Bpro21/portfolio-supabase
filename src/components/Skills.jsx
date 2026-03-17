import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('name');
    if (!error) setSkills(data);
  };

  return (
    <section id="skills" style={{ background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
          Technical <span className="text-gradient">Skills</span>
        </h2>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '1.5rem' 
        }}>
          {skills.length > 0 ? skills.map(skill => (
            <div key={skill.id} className="glass" style={{ padding: '1rem 2rem', fontWeight: '600' }}>
              {skill.name}
            </div>
          )) : (
            ['React', 'Vite', 'Supabase', 'CSS3', 'HTML5', 'JavaScript'].map(skill => (
              <div key={skill} className="glass" style={{ padding: '1rem 2rem', fontWeight: '600' }}>
                {skill}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
