import React, { useState } from 'react';
import { OldDashboard } from './components/OldDashboard';
import { NewDashboard } from './components/NewDashboard';
import { mockMetricsData } from './data/mockData';
import './styles/global.css';

function App() {
  const [view, setView] = useState<'comparison' | 'new'>('comparison');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Fiskl Metrics Dashboard</h1>
          <p className="subtitle">Redesign Prototype - Business Owner Perspective</p>
        </div>
        <div className="view-toggle">
          <button
            className={view === 'comparison' ? 'active' : ''}
            onClick={() => setView('comparison')}
          >
            Before & After
          </button>
          <button
            className={view === 'new' ? 'active' : ''}
            onClick={() => setView('new')}
          >
            New Design Only
          </button>
        </div>
      </header>

      <main className="app-main">
        {view === 'comparison' ? (
          <div className="comparison-view">
            <section className="dashboard-section old-section">
              <div className="section-header">
                <h2>❌ Before: Current Design</h2>
                <div className="issues-list">
                  <span className="issue">❌ Critical alerts buried</span>
                  <span className="issue">❌ Too much detail</span>
                  <span className="issue">❌ Poor visual hierarchy</span>
                </div>
              </div>
              <OldDashboard metrics={mockMetricsData} />
            </section>

            <section className="dashboard-section new-section">
              <div className="section-header">
                <h2>✅ After: Redesigned for Business Owners</h2>
                <div className="improvements-list">
                  <span className="improvement">✅ Critical alerts prominent</span>
                  <span className="improvement">✅ Clear visual hierarchy</span>
                  <span className="improvement">✅ Actionable insights</span>
                  <span className="improvement">✅ Details on demand</span>
                </div>
              </div>
              <NewDashboard metrics={mockMetricsData} />
            </section>
          </div>
        ) : (
          <div className="single-view">
            <NewDashboard metrics={mockMetricsData} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="design-notes">
            <h3>Key Design Improvements:</h3>
            <ul>
              <li><strong>Critical First:</strong> Negative cash balance and revenue collapse prominently displayed</li>
              <li><strong>Health Indicators:</strong> Traffic light system (Critical/Warning/Healthy)</li>
              <li><strong>Actionable Insights:</strong> AI-generated business insights, not just raw data</li>
              <li><strong>Visual Hierarchy:</strong> Most important metrics use color, icons, and size to draw attention</li>
              <li><strong>Progressive Disclosure:</strong> Details hidden by default, expandable on demand</li>
              <li><strong>Business Context:</strong> Burn rate and P&L visualization help understand the story</li>
              <li><strong>Cleaner Numbers:</strong> Compact formatting (£79.9B instead of £79,946,838,369.32)</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
