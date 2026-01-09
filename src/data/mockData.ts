import { DashboardMetrics, DashboardInsight } from '../types/metrics';

// Mock data matching the screenshot provided
export const mockMetricsData: DashboardMetrics = {
  cash: {
    label: 'Cash & Cash Equivalents',
    value: -79946838369.32,
    currency: '£',
    asOfDate: '9 Jan 2026',
    dateRange: {
      from: '1 Jan',
      to: '9 Jan'
    },
    trend: {
      direction: 'up',
      percentage: 0.0
    },
    yoyComparison: {
      percentageChange: 0.0,
      currentValue: -79946838369.32,
      previousValue: -79961352400,
      absoluteChange: 14514031
    },
    fxGainLoss: -209522,
    isNegative: true
  },
  revenue: {
    label: 'Total Revenue',
    value: 1962.21,
    currency: '£',
    dateRange: {
      from: '1 Jan',
      to: '9 Jan'
    },
    trend: {
      direction: 'down',
      percentage: -99.2
    },
    yoyComparison: {
      percentageChange: -99.2,
      currentValue: 1962.21,
      previousValue: 237198,
      absoluteChange: -235235.79
    }
  },
  expenses: {
    label: 'Total Expenses',
    value: 243397.36,
    currency: '£',
    dateRange: {
      from: '1 Jan',
      to: '9 Jan'
    },
    trend: {
      direction: 'neutral',
      percentage: 0.0
    },
    yoyComparison: {
      percentageChange: 0.0,
      currentValue: 243397.36,
      previousValue: 274377,
      absoluteChange: 517774
    }
  },
  netProfit: {
    label: 'Net Profit',
    value: -241435.15,
    currency: '£',
    dateRange: {
      from: '1 Jan',
      to: '9 Jan'
    },
    trend: {
      direction: 'down',
      percentage: -147.2
    },
    yoyComparison: {
      percentageChange: -147.2,
      currentValue: -241435.15,
      previousValue: 511574,
      absoluteChange: -753010
    },
    margin: {
      current: 215.7,
      previous: -12304.2
    }
  }
};

// AI-generated insights based on the data
export const generateInsights = (metrics: DashboardMetrics): DashboardInsight[] => {
  const insights: DashboardInsight[] = [];

  // Critical: Negative cash balance
  if (metrics.cash.isNegative) {
    insights.push({
      type: 'critical',
      message: `Critical: Negative cash balance of ${metrics.cash.currency}${Math.abs(metrics.cash.value).toLocaleString()}`,
      action: 'Immediate action required'
    });
  }

  // Warning: Revenue collapse
  if (metrics.revenue.trend && metrics.revenue.trend.percentage < -50) {
    insights.push({
      type: 'critical',
      message: `Revenue down ${Math.abs(metrics.revenue.trend.percentage)}% while expenses unchanged`,
      action: 'Review cost structure'
    });
  }

  // Warning: Negative profit
  if (metrics.netProfit.value < 0) {
    const burnRate = Math.abs(metrics.netProfit.value);
    insights.push({
      type: 'warning',
      message: `Current burn rate: ${metrics.netProfit.currency}${burnRate.toLocaleString()} per period`,
      action: 'View detailed P&L'
    });
  }

  return insights;
};
