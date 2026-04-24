import React, { useState } from 'react';
import './SupportPage.css';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'templates', name: 'Templates', icon: '🎨' },
    { id: 'editor', name: 'Editor', icon: '✏️' },
    { id: 'ecommerce', name: 'eCommerce', icon: '🛒' },
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'technical', name: 'Technical', icon: '⚙️' }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create my first website?',
      answer: 'Getting started is easy! Click "Get Started" on our homepage, choose a template, and follow our step-by-step guide. You can customize everything with our drag-and-drop editor.'
    },
    {
      category: 'templates',
      question: 'Can I change templates after publishing?',
      answer: 'Yes! You can switch templates at any time. Your content will be preserved, though you may need to adjust layouts for the new design.'
    },
    {
      category: 'editor',
      question: 'How does the drag-and-drop editor work?',
      answer: 'Simply click on any element to select it, then drag to move or resize. Use the toolbar to change colors, fonts, and add new elements.'
    },
    {
      category: 'ecommerce',
      question: 'How do I set up an online store?',
      answer: 'Go to your dashboard, click "Add eCommerce" and follow the setup wizard. You can add products, set up payments, and manage orders all in one place.'
    },
    {
      category: 'marketing',
      question: 'How can I drive more traffic to my site?',
      answer: 'Use our built-in SEO tools, create social media posts, run ads through our dashboard, and send email campaigns to your subscribers.'
    },
    {
      category: 'billing',
      question: 'Can I change my plan anytime?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing.'
    }
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const searchedFaqs = searchQuery
    ? filteredFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredFaqs;

  return (
    <div className="support-page">
      <div className="support-hero">
        <div className="container">
          <h1>How can we help you?</h1>
          <p>Find answers, get support, and learn how to make the most of SiteCraft.</p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="support-content">
          <div className="categories-sidebar">
            <h3>Browse by Topic</h3>
            <div className="categories-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="faqs-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faqs-list">
              {searchedFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>

            {searchedFaqs.length === 0 && (
              <div className="no-results">
                <p>No results found for "{searchQuery}". Try different keywords or browse by category.</p>
              </div>
            )}
          </div>
        </div>

        <div className="contact-section">
          <h2>Still need help?</h2>
          <div className="contact-options">
            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Get instant help from our support team</p>
              <button className="btn-primary">Start Chat</button>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email Support</h3>
              <p>Send us a detailed message</p>
              <button className="btn-outline">Send Email</button>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📚</div>
              <h3>Help Center</h3>
              <p>Browse our comprehensive guides</p>
              <button className="btn-outline">Browse Help</button>
            </div>
            <div className="contact-card">
              <div className="contact-icon">👥</div>
              <h3>Community</h3>
              <p>Connect with other SiteCraft users</p>
              <button className="btn-outline">Join Community</button>
            </div>
          </div>
        </div>

        <div className="resources-section">
          <h2>Popular Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h4>Getting Started Guide</h4>
              <p>Complete walkthrough for new users</p>
              <a href="#" className="resource-link">Read Guide →</a>
            </div>
            <div className="resource-card">
              <h4>Video Tutorials</h4>
              <p>Step-by-step video guides</p>
              <a href="#" className="resource-link">Watch Videos →</a>
            </div>
            <div className="resource-card">
              <h4>Template Showcase</h4>
              <p>Explore our template collection</p>
              <a href="#" className="resource-link">View Templates →</a>
            </div>
            <div className="resource-card">
              <h4>API Documentation</h4>
              <p>Technical documentation for developers</p>
              <a href="#" className="resource-link">View Docs →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;