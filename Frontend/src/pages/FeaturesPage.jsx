import React from 'react';
import './FeaturesPage.css';

const FeaturesPage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Design',
      description: 'Our advanced AI analyzes your content and creates stunning designs tailored to your brand and industry.',
      details: [
        'Smart layout suggestions',
        'Color palette generation',
        'Content optimization',
        'Design consistency checking'
      ]
    },
    {
      icon: '🎨',
      title: 'Drag & Drop Editor',
      description: 'Build your website visually with our intuitive drag-and-drop editor. No coding skills required.',
      details: [
        'Pixel-perfect positioning',
        'Responsive design tools',
        'Real-time preview',
        'Undo/redo functionality'
      ]
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Every template is automatically optimized for mobile devices. Your site looks perfect on all screens.',
      details: [
        'Mobile-first design',
        'Touch-friendly interfaces',
        'Fast loading on mobile',
        'Cross-device testing'
      ]
    },
    {
      icon: '🛒',
      title: 'eCommerce Integration',
      description: 'Sell products online with integrated shopping cart, payment processing, and inventory management.',
      details: [
        'Multiple payment gateways',
        'Inventory tracking',
        'Order management',
        'Shipping calculator'
      ]
    },
    {
      icon: '📊',
      title: 'Analytics & SEO',
      description: 'Built-in analytics and SEO tools help you understand your visitors and improve your search rankings.',
      details: [
        'Google Analytics integration',
        'SEO optimization tools',
        'Performance monitoring',
        'Conversion tracking'
      ]
    },
    {
      icon: '📧',
      title: 'Email Marketing',
      description: 'Create and send beautiful email campaigns directly from your dashboard.',
      details: [
        'Email template builder',
        'Subscriber management',
        'Campaign analytics',
        'Automation workflows'
      ]
    },
    {
      icon: '🔒',
      title: 'Security & Reliability',
      description: 'Enterprise-grade security with 99.9% uptime guarantee and SSL certificates included.',
      details: [
        'SSL encryption',
        'Regular backups',
        'DDoS protection',
        '24/7 monitoring'
      ]
    },
    {
      icon: '🎯',
      title: 'Marketing Tools',
      description: 'Integrated marketing tools to grow your business and reach more customers.',
      details: [
        'Social media integration',
        'Google Ads management',
        'Lead capture forms',
        'A/B testing'
      ]
    }
  ];

  return (
    <div className="features-page">
      <div className="features-hero">
        <div className="container">
          <h1>Powerful Features for Every Business</h1>
          <p>Everything you need to create, manage, and grow your online presence</p>
        </div>
      </div>

      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
              </div>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-details">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of businesses already using SiteCraft</p>
          <button className="btn-primary large">Start Building Today</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;