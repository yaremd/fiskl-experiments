import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardMetrics } from '../types/metrics';

interface OldDashboardProps {
  metrics: DashboardMetrics;
}

export const OldDashboard: React.FC<OldDashboardProps> = ({ metrics }) => {
  const formatCurrency = (value: number, currency: string) => {
    return `${currency}${Math.abs(value).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatLargeCurrency = (value: number, currency: string) => {
    // For very large numbers, format them more compactly
    const absValue = Math.abs(value);
    if (absValue >= 1e9) {
      return `${currency}${(absValue / 1e9).toFixed(2)}B`;
    } else if (absValue >= 1e6) {
      return `${currency}${(absValue / 1e6).toFixed(2)}M`;
    } else if (absValue >= 1e3) {
      return `${currency}${(absValue / 1e3).toFixed(2)}K`;
    }
    return formatCurrency(value, currency);
  };

  const TrendIcon = ({ direction }: { direction: 'up' | 'down' | 'neutral' }) => {
    if (direction === 'neutral') return <span style={{ color: '#64748b' }}>→</span>;
    return direction === 'up' ?
      <TrendingUp size={16} style={{ color: '#10b981' }} /> :
      <TrendingDown size={16} style={{ color: '#ef4444' }} />;
  };

  return (
    <div className="old-dashboard">
      <h2>Key Metrics</h2>
      <div className="old-metrics-grid">
        {/* Cash & Cash Equivalents */}
        <div className="old-metric-card">
          <div className="old-metric-header">
            <span className="old-metric-label">{metrics.cash.label}</span>
            {metrics.cash.trend && (
              <span className={`old-trend ${metrics.cash.trend.direction}`}>
                <TrendIcon direction={metrics.cash.trend.direction} />
                {metrics.cash.trend.percentage >= 0 ? '+' : ''}{metrics.cash.trend.percentage}%
              </span>
            )}
          </div>
          <div className="old-metric-date">As of {metrics.cash.asOfDate}</div>
          <div className="old-metric-value">
            {metrics.cash.value < 0 ? '-' : ''}{formatLargeCurrency(metrics.cash.value, metrics.cash.currency)}
          </div>
          <div className="old-metric-details">
            <div className="old-detail-row">
              <span>vs Last Year-to-date ({metrics.cash.dateRange.from} -{metrics.cash.dateRange.to})</span>
            </div>
            {metrics.cash.yoyComparison && (
              <div className="old-detail-row">
                <TrendIcon direction="up" />
                <span>+ {formatCurrency(metrics.cash.yoyComparison.absoluteChange, metrics.cash.currency)}</span>
                <span className="old-previous-value">
                  (Previous: {formatLargeCurrency(metrics.cash.yoyComparison.previousValue, metrics.cash.currency)})
                </span>
              </div>
            )}
            {metrics.cash.fxGainLoss !== undefined && (
              <div className="old-detail-row">
                <span>FX gain/loss:</span>
                <TrendIcon direction="down" />
                <span>{formatCurrency(metrics.cash.fxGainLoss, metrics.cash.currency)}</span>
              </div>
            )}
            {metrics.cash.isNegative && (
              <div className="old-warning">
                ⚠️ Negative cash balance
              </div>
            )}
          </div>
        </div>

        {/* Total Revenue */}
        <div className="old-metric-card">
          <div className="old-metric-header">
            <span className="old-metric-label">{metrics.revenue.label}</span>
            {metrics.revenue.trend && (
              <span className={`old-trend ${metrics.revenue.trend.direction}`}>
                <TrendIcon direction={metrics.revenue.trend.direction} />
                {metrics.revenue.trend.percentage}%
              </span>
            )}
          </div>
          <div className="old-metric-date">
            {metrics.revenue.dateRange.from} -{metrics.revenue.dateRange.to}
          </div>
          <div className="old-metric-value">
            {formatCurrency(metrics.revenue.value, metrics.revenue.currency)}
          </div>
          <div className="old-metric-details">
            <div className="old-detail-row">
              <span>vs Last Year-to-date ({metrics.revenue.dateRange.from} -{metrics.revenue.dateRange.to})</span>
            </div>
            {metrics.revenue.yoyComparison && (
              <div className="old-detail-row">
                <TrendIcon direction="down" />
                <span>{formatCurrency(metrics.revenue.yoyComparison.absoluteChange, metrics.revenue.currency)}</span>
                <span className="old-previous-value">
                  (Previous: {formatCurrency(metrics.revenue.yoyComparison.previousValue, metrics.revenue.currency)})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Total Expenses */}
        <div className="old-metric-card">
          <div className="old-metric-header">
            <span className="old-metric-label">{metrics.expenses.label}</span>
            {metrics.expenses.trend && (
              <span className={`old-trend ${metrics.expenses.trend.direction}`}>
                <TrendIcon direction={metrics.expenses.trend.direction} />
                {metrics.expenses.trend.percentage}%
              </span>
            )}
          </div>
          <div className="old-metric-date">
            {metrics.expenses.dateRange.from} -{metrics.expenses.dateRange.to}
          </div>
          <div className="old-metric-value">
            {formatCurrency(metrics.expenses.value, metrics.expenses.currency)}
          </div>
          <div className="old-metric-details">
            <div className="old-detail-row">
              <span>vs Last Year-to-date ({metrics.expenses.dateRange.from} -{metrics.expenses.dateRange.to})</span>
            </div>
            {metrics.expenses.yoyComparison && (
              <div className="old-detail-row">
                <TrendIcon direction="up" />
                <span>+ {formatCurrency(metrics.expenses.yoyComparison.absoluteChange, metrics.expenses.currency)}</span>
                <span className="old-previous-value">
                  (Previous: {formatCurrency(metrics.expenses.yoyComparison.previousValue, metrics.expenses.currency)})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Net Profit */}
        <div className="old-metric-card">
          <div className="old-metric-header">
            <span className="old-metric-label">{metrics.netProfit.label}</span>
            {metrics.netProfit.trend && (
              <span className={`old-trend ${metrics.netProfit.trend.direction}`}>
                <TrendIcon direction={metrics.netProfit.trend.direction} />
                {metrics.netProfit.trend.percentage}%
              </span>
            )}
          </div>
          <div className="old-metric-date">
            {metrics.netProfit.dateRange.from} -{metrics.netProfit.dateRange.to}
          </div>
          <div className="old-metric-value">
            {metrics.netProfit.value < 0 ? '-' : ''}{formatCurrency(metrics.netProfit.value, metrics.netProfit.currency)}
          </div>
          <div className="old-metric-details">
            <div className="old-detail-row">
              <span>vs Last Year-to-date ({metrics.netProfit.dateRange.from} -{metrics.netProfit.dateRange.to})</span>
            </div>
            {metrics.netProfit.yoyComparison && (
              <div className="old-detail-row">
                <TrendIcon direction="down" />
                <span>{formatCurrency(metrics.netProfit.yoyComparison.absoluteChange, metrics.netProfit.currency)}</span>
                <span className="old-previous-value">
                  (Previous: {formatCurrency(metrics.netProfit.yoyComparison.previousValue, metrics.netProfit.currency)})
                </span>
              </div>
            )}
            {metrics.netProfit.margin && (
              <div className="old-detail-row">
                <span>Margin: {metrics.netProfit.margin.current}% → {metrics.netProfit.margin.previous}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
