import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (!error) setProfile(data);
  };

  return (
    <div className="home-container">
      <Navbar />
      <main>
        <Hero profile={profile} />
        <Skills />
        <Projects />
        <Contact profile={profile} />
      </main>
      <footer className="container" style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} {profile?.full_name || 'Portfolio'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
