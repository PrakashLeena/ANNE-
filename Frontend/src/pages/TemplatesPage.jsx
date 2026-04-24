import React, { useState } from 'react';
import './TemplatesPage.css';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'business', name: 'Business' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'ecommerce', name: 'eCommerce' },
    { id: 'blog', name: 'Blog' },
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'photography', name: 'Photography' },
    { id: 'events', name: 'Events' },
  ];

  const templates = [
    {
      id: 1,
      title: 'Modern Business',
      category: 'business',
      image: 'business1',
      description: 'Clean and professional design for corporate websites',
      features: ['Contact forms', 'Team section', 'Services showcase']
    },
    {
      id: 2,
      title: 'Creative Portfolio',
      category: 'portfolio',
      image: 'portfolio1',
      description: 'Showcase your work with style and elegance',
      features: ['Gallery layouts', 'Project details', 'Client testimonials']
    },
    {
      id: 3,
      title: 'Online Store',
      category: 'ecommerce',
      image: 'ecommerce1',
      description: 'Sell products online with integrated shopping cart',
      features: ['Product catalog', 'Shopping cart', 'Payment integration']
    },
    {
      id: 4,
      title: 'Fashion Blog',
      category: 'blog',
      image: 'blog1',
      description: 'Share your fashion insights and trends',
      features: ['Blog posts', 'Image galleries', 'Social sharing']
    },
    {
      id: 5,
      title: 'Restaurant Menu',
      category: 'restaurant',
      image: 'restaurant1',
      description: 'Display your menu and attract hungry customers',
      features: ['Menu display', 'Location info', 'Online reservations']
    },
    {
      id: 6,
      title: 'Photography Studio',
      category: 'photography',
      image: 'photography1',
      description: 'Showcase your photography portfolio',
      features: ['Photo galleries', 'Booking system', 'Client reviews']
    },
    {
      id: 7,
      title: 'Event Planning',
      category: 'events',
      image: 'events1',
      description: 'Promote your event planning services',
      features: ['Event galleries', 'Service packages', 'Contact forms']
    },
    {
      id: 8,
      title: 'Tech Startup',
      category: 'business',
      image: 'business2',
      description: 'Modern design for technology companies',
      features: ['Product showcase', 'Team profiles', 'News/blog section']
    },
    {
      id: 9,
      title: 'Artist Portfolio',
      category: 'portfolio',
      image: 'portfolio2',
      description: 'Display your artistic creations beautifully',
      features: ['Artwork galleries', 'Artist bio', 'Exhibition info']
    },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="templates-page">
      <div className="templates-hero">
        <div className="container">
          <h1>Choose Your Perfect Template</h1>
          <p>Start with a professionally designed template and customize it to match your vision</p>
        </div>
      </div>

      <div className="container">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="templates-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className={`template-image ${template.image}`}></div>
              <div className="template-content">
                <h3>{template.title}</h3>
                <p>{template.description}</p>
                <ul className="template-features">
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="template-actions">
                  <button className="btn-outline">Preview</button>
                  <button className="btn-primary">Use Template</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;