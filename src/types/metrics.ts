export type TrendDirection = 'up' | 'down' | 'neutral';

export type HealthStatus = 'critical' | 'warning' | 'healthy';

export interface YearOverYearComparison {
  percentageChange: number;
  previousValue: number;
  currentValue: number;
  absoluteChange: number;
}

export interface MetricData {
  label: string;
  value: number;
  currency: string;
  dateRange: {
    from: string;
    to: string;
  };
  trend?: {
    direction: TrendDirection;
    percentage: number;
  };
  yoyComparison?: YearOverYearComparison;
}

export interface CashMetric extends MetricData {
  asOfDate: string;
  fxGainLoss?: number;
  isNegative?: boolean;
}

export interface ProfitMetric extends MetricData {
  margin?: {
    current: number;
    previous: number;
  };
}

export interface DashboardMetrics {
  cash: CashMetric;
  revenue: MetricData;
  expenses: MetricData;
  netProfit: ProfitMetric;
}

export interface DashboardInsight {
  type: 'critical' | 'warning' | 'info';
  message: string;
  action?: string;
}
