import React from 'react';

const Contact = ({ profile }) => {
  return (
    <section id="contact" className="container">
      <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>
          {profile?.contact_title || 'Get In Touch'}
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          {profile?.contact_description || "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="glass" style={{ padding: '1.5rem', width: '250px' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Email</h4>
            <p className="text-gradient">{profile?.email || 'hello@yourname.com'}</p>
          </div>
          <div className="glass" style={{ padding: '1.5rem', width: '250px' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Social</h4>
            <p>{profile?.social_links || 'GitHub / LinkedIn / Twitter'}</p>
          </div>
        </div>
        <div style={{ marginTop: '3rem' }}>
          <a href={`mailto:${profile?.email || 'hello@yourname.com'}`} className="btn-primary">Send Message</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
