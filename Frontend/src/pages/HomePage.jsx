import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <main className="homepage">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Launch your website faster</span>
          <h1>Build stunning websites without code.</h1>
          <p>Create professional sites with an intuitive editor, smart templates, and powerful hosting.</p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/templates">Browse Templates</Link>
            <Link className="btn-secondary" to="/pricing">See Pricing</Link>
          </div>
        </div>
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-header"></div>
            <div className="preview-body">
              <div className="preview-block"></div>
              <div className="preview-block short"></div>
              <div className="preview-block"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section features-overview">
        <div className="container">
          <h2>Everything you need to launch.</h2>
          <p>AI-assisted design, mobile-ready layouts, eCommerce tools, and analytics all in one place.</p>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Custom designs</h3>
              <p>Auto-generate polished layouts and style them in minutes.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile-ready</h3>
              <p>Every site adapts seamlessly to phones, tablets, and desktops.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast hosting</h3>
              <p>Launch with secure, high-performance hosting built for creators.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section template-showcase">
        <div className="container">
          <div className="section-heading">
            <h2>Professional templates for every brand.</h2>
            <p>Choose a starting point and make it your own with zero code.</p>
          </div>
          <div className="template-grid">
            <article className="template-card business">
              <h3>Business</h3>
              <p>Clean, modern layouts for companies and startups.</p>
            </article>
            <article className="template-card portfolio">
              <h3>Portfolio</h3>
              <p>Showcase your work with bold visuals and smooth storytelling.</p>
            </article>
            <article className="template-card ecommerce">
              <h3>eCommerce</h3>
              <p>Sell products online with integrated checkout and catalogs.</p>
            </article>
          </div>
          <div className="section-action">
            <Link className="btn-primary" to="/templates">View All Templates</Link>
          </div>
        </div>
      </section>

      <section className="section pricing-preview">
        <div className="container">
          <div className="section-heading">
            <h2>Simple pricing for every stage.</h2>
            <p>Start free, upgrade when you’re ready, and scale with confidence.</p>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card">
              <h3>Starter</h3>
              <strong></strong>
              <p>Launch a site with SiteCraft branding.</p>
            </article>
            <article className="pricing-card featured">
              <h3>Pro</h3>
              <strong>/mo</strong>
              <p>Custom domain, premium templates, and analytics.</p>
            </article>
            <article className="pricing-card">
              <h3>Business</h3>
              <strong>/mo</strong>
              <p>Advanced commerce, reporting, and priority support.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section cta-strip">
        <div className="container cta-box">
          <h2>Ready to create your new website?</h2>
          <Link className="btn-primary" to="/signup">Start Free</Link>
        </div>
      </section>
    </main>
  );
}
