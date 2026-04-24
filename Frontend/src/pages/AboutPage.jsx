import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'sarah',
      bio: 'Former Google designer with 10+ years experience in web technology.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: 'mike',
      bio: 'Ex-Amazon engineer passionate about making web creation accessible.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'emily',
      bio: 'Award-winning designer focused on user experience and accessibility.'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      image: 'david',
      bio: 'Product leader who has shipped products used by millions.'
    }
  ];

  const milestones = [
    { year: '2018', event: 'SiteCraft founded' },
    { year: '2019', event: 'Launched AI website builder' },
    { year: '2020', event: 'Reached 100K users' },
    { year: '2021', event: 'Added eCommerce features' },
    { year: '2022', event: 'Expanded to 50 countries' },
    { year: '2023', event: '1 million websites created' }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>Empowering Creators Worldwide</h1>
          <p>
            We're on a mission to democratize web creation, making it possible for anyone
            to build beautiful, professional websites without coding knowledge.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="story-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              SiteCraft was born from a simple idea: everyone should be able to create a
              professional website, regardless of their technical background. Our founders,
              frustrated with complex web development tools, set out to build something
              intuitive and powerful.
            </p>
            <p>
              Today, we've helped over 1 million people bring their ideas to life online.
              From small business owners to artists, entrepreneurs to educators – we're
              proud to be part of their success stories.
            </p>
          </div>
          <div className="story-image">
            <div className="placeholder-image"></div>
          </div>
        </section>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <div className="mission-icon">🌍</div>
              <h3>Democratize Web Creation</h3>
              <p>Make professional web design accessible to everyone, regardless of technical skills.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🚀</div>
              <h3>Empower Entrepreneurs</h3>
              <p>Help businesses of all sizes establish their online presence quickly and affordably.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💡</div>
              <h3>Innovate Continuously</h3>
              <p>Push the boundaries of what's possible with AI and modern web technology.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className={`member-image ${member.image}`}></div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h4>{milestone.event}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Simplicity</h3>
              <p>We believe great design should be simple and intuitive.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We're constantly pushing the boundaries of web technology.</p>
            </div>
            <div className="value-item">
              <h3>Accessibility</h3>
              <p>Web creation should be accessible to everyone, everywhere.</p>
            </div>
            <div className="value-item">
              <h3>Quality</h3>
              <p>We never compromise on the quality of our products.</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>We build for our community and with our community.</p>
            </div>
            <div className="value-item">
              <h3>Transparency</h3>
              <p>We're open and honest in everything we do.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Join the SiteCraft Family</h2>
          <p>Ready to start building your website? Join millions of creators worldwide.</p>
          <button className="btn-primary large">Get Started Today</button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;