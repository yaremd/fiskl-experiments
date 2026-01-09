import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Activity,
  DollarSign,
  CreditCard,
  PieChart
} from 'lucide-react';
import { DashboardMetrics, DashboardInsight } from '../types/metrics';
import { generateInsights } from '../data/mockData';

interface NewDashboardProps {
  metrics: DashboardMetrics;
}

export const NewDashboard: React.FC<NewDashboardProps> = ({ metrics }) => {
  const [showDetails, setShowDetails] = useState(false);
  const insights = generateInsights(metrics);

  const formatCurrency = (value: number, currency: string, compact = false) => {
    const absValue = Math.abs(value);
    if (compact && absValue >= 1e9) {
      return `${currency}${(absValue / 1e9).toFixed(1)}B`;
    } else if (compact && absValue >= 1e6) {
      return `${currency}${(absValue / 1e6).toFixed(1)}M`;
    } else if (compact && absValue >= 1e3) {
      return `${currency}${(absValue / 1e3).toFixed(1)}K`;
    }
    return `${currency}${absValue.toLocaleString('en-GB', {
      minimumFractionDigits: compact ? 0 : 2,
      maximumFractionDigits: compact ? 1 : 2
    })}`;
  };

  const getHealthStatus = (): 'critical' | 'warning' | 'healthy' => {
    if (metrics.cash.isNegative || (metrics.revenue.trend && metrics.revenue.trend.percentage < -90)) {
      return 'critical';
    }
    if (metrics.netProfit.value < 0 || (metrics.revenue.trend && metrics.revenue.trend.percentage < -50)) {
      return 'warning';
    }
    return 'healthy';
  };

  const healthStatus = getHealthStatus();
  const healthConfig = {
    critical: { label: 'CRITICAL', color: '#dc2626', bgColor: '#fee2e2', icon: AlertTriangle },
    warning: { label: 'AT RISK', color: '#f59e0b', bgColor: '#fef3c7', icon: AlertTriangle },
    healthy: { label: 'HEALTHY', color: '#10b981', bgColor: '#d1fae5', icon: Activity }
  };

  const config = healthConfig[healthStatus];
  const HealthIcon = config.icon;

  return (
    <div className="new-dashboard">
      <div className="new-dashboard-header">
        <h2>Business Health Dashboard</h2>
        <div className="period-badge">
          Period: {metrics.cash.dateRange.from} - {metrics.cash.dateRange.to}
        </div>
      </div>

      {/* Critical Alert Banner */}
      {insights.length > 0 && (
        <div className="alert-banner" style={{ borderLeftColor: config.color, backgroundColor: config.bgColor }}>
          <div className="alert-content">
            <div className="alert-header">
              <HealthIcon size={24} color={config.color} />
              <span className="alert-status" style={{ color: config.color }}>
                {config.label}
              </span>
            </div>
            <div className="alert-messages">
              {insights.map((insight, idx) => (
                <div key={idx} className="alert-message">
                  <span>{insight.message}</span>
                  {insight.action && (
                    <button className="alert-action" style={{ color: config.color }}>
                      {insight.action} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="new-metrics-grid">
        {/* Cash Health */}
        <div className={`new-metric-card ${metrics.cash.isNegative ? 'critical' : ''}`}>
          <div className="metric-icon" style={{ backgroundColor: config.bgColor }}>
            <DollarSign size={20} color={config.color} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Cash Position</div>
            <div className="metric-value" style={{ color: metrics.cash.isNegative ? '#dc2626' : '#1f2937' }}>
              {metrics.cash.value < 0 ? '-' : ''}{formatCurrency(metrics.cash.value, metrics.cash.currency, true)}
            </div>
            <div className="metric-trend">
              {metrics.cash.trend && (
                <>
                  {metrics.cash.trend.direction === 'down' ? (
                    <TrendingDown size={14} color="#ef4444" />
                  ) : (
                    <TrendingUp size={14} color="#10b981" />
                  )}
                  <span style={{ color: metrics.cash.trend.direction === 'down' ? '#ef4444' : '#10b981' }}>
                    {metrics.cash.trend.percentage >= 0 ? '+' : ''}{metrics.cash.trend.percentage}% YoY
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Net Profit/Loss */}
        <div className={`new-metric-card ${metrics.netProfit.value < 0 ? 'warning' : ''}`}>
          <div className="metric-icon" style={{ backgroundColor: metrics.netProfit.value < 0 ? '#fef3c7' : '#d1fae5' }}>
            <PieChart size={20} color={metrics.netProfit.value < 0 ? '#f59e0b' : '#10b981'} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Net {metrics.netProfit.value < 0 ? 'Loss' : 'Profit'}</div>
            <div className="metric-value" style={{ color: metrics.netProfit.value < 0 ? '#dc2626' : '#1f2937' }}>
              {metrics.netProfit.value < 0 ? '-' : ''}{formatCurrency(metrics.netProfit.value, metrics.netProfit.currency, true)}
            </div>
            <div className="metric-trend">
              {metrics.netProfit.trend && (
                <>
                  <TrendingDown size={14} color="#ef4444" />
                  <span style={{ color: '#ef4444' }}>
                    {metrics.netProfit.trend.percentage}% YoY
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="new-metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#dbeafe' }}>
            <CreditCard size={20} color="#3b82f6" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Revenue</div>
            <div className="metric-value">
              {formatCurrency(metrics.revenue.value, metrics.revenue.currency, true)}
            </div>
            <div className="metric-trend">
              {metrics.revenue.trend && (
                <>
                  <TrendingDown size={14} color="#ef4444" />
                  <span style={{ color: '#ef4444' }}>
                    {metrics.revenue.trend.percentage}% YoY
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="new-metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#f3e8ff' }}>
            <Activity size={20} color="#a855f7" />
          </div>
          <div className="metric-content">
            <div className="metric-label">Expenses</div>
            <div className="metric-value">
              {formatCurrency(metrics.expenses.value, metrics.expenses.currency, true)}
            </div>
            <div className="metric-trend">
              {metrics.expenses.trend && (
                <>
                  <span style={{ color: '#64748b' }}>→</span>
                  <span style={{ color: '#64748b' }}>
                    {metrics.expenses.trend.percentage}% YoY
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* P&L Summary */}
      <div className="pl-summary">
        <div className="pl-summary-header">
          <h3>P&L Summary</h3>
          <div className="pl-ratio">
            <span className="pl-label">Burn Rate:</span>
            <span className="pl-value" style={{ color: '#dc2626' }}>
              {formatCurrency(Math.abs(metrics.netProfit.value), metrics.netProfit.currency)} / period
            </span>
          </div>
        </div>
        <div className="pl-bars">
          <div className="pl-bar-container">
            <div className="pl-bar-label">
              <span>Revenue</span>
              <span>{formatCurrency(metrics.revenue.value, metrics.revenue.currency, true)}</span>
            </div>
            <div className="pl-bar-track">
              <div
                className="pl-bar revenue"
                style={{
                  width: `${(metrics.revenue.value / metrics.expenses.value) * 100}%`,
                  maxWidth: '100%'
                }}
              />
            </div>
          </div>
          <div className="pl-bar-container">
            <div className="pl-bar-label">
              <span>Expenses</span>
              <span>{formatCurrency(metrics.expenses.value, metrics.expenses.currency, true)}</span>
            </div>
            <div className="pl-bar-track">
              <div className="pl-bar expenses" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className="details-section">
        <button
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
        >
          <span>Detailed Breakdown & YoY Comparison</span>
          {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showDetails && (
          <div className="details-content">
            <div className="details-grid">
              {/* Cash Details */}
              <div className="detail-card">
                <h4>Cash & Cash Equivalents</h4>
                <div className="detail-row">
                  <span>Current Balance:</span>
                  <span className="detail-value">
                    {metrics.cash.value < 0 ? '-' : ''}{formatCurrency(metrics.cash.value, metrics.cash.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Previous Period:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.cash.yoyComparison?.previousValue || 0, metrics.cash.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>YoY Change:</span>
                  <span className="detail-value positive">
                    +{formatCurrency(metrics.cash.yoyComparison?.absoluteChange || 0, metrics.cash.currency)}
                  </span>
                </div>
                {metrics.cash.fxGainLoss !== undefined && (
                  <div className="detail-row">
                    <span>FX Gain/Loss:</span>
                    <span className="detail-value negative">
                      {formatCurrency(metrics.cash.fxGainLoss, metrics.cash.currency)}
                    </span>
                  </div>
                )}
              </div>

              {/* Revenue Details */}
              <div className="detail-card">
                <h4>Revenue</h4>
                <div className="detail-row">
                  <span>Current Period:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.revenue.value, metrics.revenue.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Previous Period:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.revenue.yoyComparison?.previousValue || 0, metrics.revenue.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>YoY Change:</span>
                  <span className="detail-value negative">
                    {formatCurrency(metrics.revenue.yoyComparison?.absoluteChange || 0, metrics.revenue.currency)}
                  </span>
                </div>
              </div>

              {/* Expenses Details */}
              <div className="detail-card">
                <h4>Expenses</h4>
                <div className="detail-row">
                  <span>Current Period:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.expenses.value, metrics.expenses.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Previous Period:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.expenses.yoyComparison?.previousValue || 0, metrics.expenses.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>YoY Change:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.expenses.yoyComparison?.absoluteChange || 0, metrics.expenses.currency)}
                  </span>
                </div>
              </div>

              {/* Net Profit Details */}
              <div className="detail-card">
                <h4>Net Profit</h4>
                <div className="detail-row">
                  <span>Current Period:</span>
                  <span className="detail-value negative">
                    {metrics.netProfit.value < 0 ? '-' : ''}{formatCurrency(metrics.netProfit.value, metrics.netProfit.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Previous Period:</span>
                  <span className="detail-value">
                    {formatCurrency(metrics.netProfit.yoyComparison?.previousValue || 0, metrics.netProfit.currency)}
                  </span>
                </div>
                <div className="detail-row">
                  <span>YoY Change:</span>
                  <span className="detail-value negative">
                    {formatCurrency(metrics.netProfit.yoyComparison?.absoluteChange || 0, metrics.netProfit.currency)}
                  </span>
                </div>
                {metrics.netProfit.margin && (
                  <div className="detail-row">
                    <span>Margin:</span>
                    <span className="detail-value">
                      {metrics.netProfit.margin.current}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
