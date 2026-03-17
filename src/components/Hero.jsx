import React from 'react';

const Hero = ({ profile }) => {
  return (
    <section id="hero" className="container hero-section">
      <div className="hero-content" style={{ maxWidth: '600px' }}>
        <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Hello, It's Me</h4>
        <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{profile?.full_name || 'Loading...'}</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          And I'm a <span className="text-gradient">Frontend Developer</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          {profile?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Possimus nulla sed saepe rerum, animi expedita.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#contact" className="btn-primary">Connect with Me</a>
          <a href="/cv.pdf" className="glass" style={{ padding: '12px 24px', textDecoration: 'none', color: 'white', fontWeight: '600' }}>Download CV</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="glass" style={{ 
          width: '350px', 
          height: '350px', 
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
          background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>
              Your Photo
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
