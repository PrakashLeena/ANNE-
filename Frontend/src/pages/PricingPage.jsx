import React, { useState } from 'react';
import './PricingPage.css';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '1 website',
        '500MB storage',
        'Basic templates',
        'SiteCraft branding',
        'Community support'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 16, yearly: 12 },
      description: 'Best for growing businesses',
      features: [
        'Unlimited websites',
        '10GB storage',
        'All templates',
        'Custom domain',
        'Remove branding',
        'Priority support',
        'Advanced analytics',
        'eCommerce features'
      ],
      buttonText: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Business',
      price: { monthly: 29, yearly: 23 },
      description: 'For established businesses',
      features: [
        'Everything in Pro',
        '50GB storage',
        'Advanced eCommerce',
        'White-label solution',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans.'
    }
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the perfect plan for your business. All plans include our core features.</p>

          <div className="billing-toggle">
            <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={billingCycle === 'yearly'}
                onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              />
              <span className="slider"></span>
            </label>
            <span className={billingCycle === 'yearly' ? 'active' : ''}>Yearly</span>
            <div className="savings-badge">Save 25%</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}

              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price[billingCycle]}</span>
                  <span className="period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <span className="checkmark">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`plan-button ${plan.popular ? 'primary' : 'outline'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-features">
          <h2>All Plans Include</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <div>
                <h4>1000+ Templates</h4>
                <p>Professional designs for every industry</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div>
                <h4>Mobile Responsive</h4>
                <p>Perfect on all devices automatically</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div>
                <h4>SSL Security</h4>
                <p>Free SSL certificates included</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div>
                <h4>Basic Analytics</h4>
                <p>Understand your visitors</p>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;