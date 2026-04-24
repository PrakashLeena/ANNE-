import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Websites', value: '3', change: '+12%' },
    { title: 'Monthly Visitors', value: '12,543', change: '+8%' },
    { title: 'Storage Used', value: '2.4GB', change: '+5%' },
    { title: 'Revenue', value: '$1,234', change: '+15%' }
  ];

  const websites = [
    { name: 'My Business Site', status: 'Published', visitors: '8,432', lastEdited: '2 hours ago' },
    { name: 'Portfolio', status: 'Draft', visitors: '0', lastEdited: '1 day ago' },
    { name: 'Blog', status: 'Published', visitors: '4,111', lastEdited: '3 days ago' }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, John!</h1>
        <p>Here's what's happening with your websites today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-change positive">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="websites-section">
          <div className="section-header">
            <h2>Your Websites</h2>
            <button className="btn-primary">Create New Website</button>
          </div>

          <div className="websites-list">
            {websites.map((website, index) => (
              <div key={index} className="website-card">
                <div className="website-info">
                  <h3>{website.name}</h3>
                  <div className="website-meta">
                    <span className={`status ${website.status.toLowerCase()}`}>
                      {website.status}
                    </span>
                    <span>{website.visitors} visitors</span>
                    <span>Edited {website.lastEdited}</span>
                  </div>
                </div>
                <div className="website-actions">
                  <button className="btn-outline">Edit</button>
                  <button className="btn-outline">View</button>
                  <button className="btn-outline">Settings</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="action-btn">
              <span className="action-icon">🎨</span>
              Choose Template
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              View Analytics
            </button>
            <button className="action-btn">
              <span className="action-icon">🛒</span>
              Manage Store
            </button>
            <button className="action-btn">
              <span className="action-icon">📧</span>
              Email Marketing
            </button>
          </div>

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p>Updated homepage design</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👥</div>
              <div className="activity-content">
                <p>New visitor from Google</p>
                <span>4 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">💰</div>
              <div className="activity-content">
                <p>Order #1234 completed</p>
                <span>1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;