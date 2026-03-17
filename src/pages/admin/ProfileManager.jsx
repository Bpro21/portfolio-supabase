import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
    email: '',
    social_links: '',
    contact_title: '',
    contact_description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (!error && data) {
      setProfile(data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Check if profile exists
    const { data } = await supabase.from('profiles').select('id').single();
    
    let result;
    if (data) {
      result = await supabase.from('profiles').update(profile).eq('id', data.id);
    } else {
      result = await supabase.from('profiles').insert([profile]);
    }

    if (result.error) {
      setMessage('Error: ' + result.error.message);
    } else {
      setMessage('Profile updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Edit Profile</h3>
      
      <form onSubmit={handleUpdate} className="glass" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
          <input 
            type="text" 
            value={profile.full_name} 
            onChange={(e) => setProfile({...profile, full_name: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white' }} 
            required 
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Avatar URL</label>
          <input 
            type="text" 
            value={profile.avatar_url} 
            onChange={(e) => setProfile({...profile, avatar_url: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white' }} 
            placeholder="Link to your photo"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Contact</label>
          <input 
            type="email" 
            value={profile.email} 
            onChange={(e) => setProfile({...profile, email: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white' }} 
            placeholder="your@email.com"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Social Links (GitHub, LinkedIn, etc.)</label>
          <input 
            type="text" 
            value={profile.social_links} 
            onChange={(e) => setProfile({...profile, social_links: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white' }} 
            placeholder="GitHub / LinkedIn / Twitter"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contact Section Title</label>
          <input 
            type="text" 
            value={profile.contact_title} 
            onChange={(e) => setProfile({...profile, contact_title: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white' }} 
            placeholder="Get In Touch"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contact Section Description</label>
          <textarea 
            value={profile.contact_description} 
            onChange={(e) => setProfile({...profile, contact_description: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white', height: '100px' }} 
            placeholder="Enter contact section description..."
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio</label>
          <textarea 
            value={profile.bio} 
            onChange={(e) => setProfile({...profile, bio: e.target.value})} 
            className="glass" 
            style={{ width: '100%', padding: '1rem', color: 'white', height: '150px' }} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
        
        {message && <p style={{ marginTop: '1rem', color: message.includes('Error') ? '#ff4b4b' : '#00ffc3' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ProfileManager;
