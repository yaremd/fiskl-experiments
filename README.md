# Fiskl Metrics Dashboard - Redesign Prototype

A complete redesign of the metrics dashboard from a business owner's perspective, focusing on actionable insights over raw data.

## 🎯 Design Philosophy

**Before:** Information overload with buried critical alerts
**After:** Critical information first, details on demand

### Key Improvements

1. **Critical First** - Negative cash balance and revenue collapse prominently displayed
2. **Health Indicators** - Traffic light system (Critical/Warning/Healthy)
3. **Actionable Insights** - AI-generated business insights, not just raw data
4. **Visual Hierarchy** - Most important metrics use color, icons, and size
5. **Progressive Disclosure** - Details hidden by default, expandable on demand
6. **Business Context** - Burn rate and P&L visualization tell the story
7. **Cleaner Numbers** - Compact formatting (£79.9B vs £79,946,838,369.32)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.

### Build

```bash
npm run build
```

## 📊 What Changed?

### Old Dashboard Problems

❌ **Critical alerts buried** - "Negative cash balance" warning was tiny and at the bottom
❌ **Information overload** - Too many numbers competing for attention
❌ **Poor visual hierarchy** - All widgets equal weight, but not all metrics are equally important
❌ **Hard to parse** - YoY comparisons with previous values difficult to understand quickly
❌ **No actionable insights** - Just data, no guidance on what to do

### New Dashboard Solutions

✅ **Critical alerts prominent** - Negative cash and revenue collapse shown first with clear severity indicators
✅ **Health status system** - Visual traffic light (Critical/Warning/Healthy) with color coding
✅ **Actionable insights** - AI-generated messages like "Revenue down 99% while expenses unchanged"
✅ **Clear visual hierarchy** - Critical metrics larger, color-coded, with icons
✅ **Progressive disclosure** - Detailed YoY comparisons hidden in expandable section
✅ **Business context** - P&L summary with burn rate and visual comparison bars

## 🎨 Design Decisions

### Tier 1: Critical (Always Visible)

- Health status banner with alert icon
- Cash position with negative balance prominently shown
- Net profit/loss
- Trend indicators (% change YoY)

### Tier 2: Important Context (Visible)

- Revenue vs Expenses visualization
- Burn rate calculation
- P&L summary with bar charts

### Tier 3: Details (Collapsible)

- YoY comparison with previous period values
- FX gain/loss
- Detailed margin calculations
- Historical data breakdown

## 💡 Business Owner Perspective

The redesign answers the questions business owners actually ask:

1. **"How is my business doing?"** → Health status banner (Critical/Warning/Healthy)
2. **"Should I be worried?"** → Critical alerts with specific actions
3. **"What's the problem?"** → AI insights explaining the situation
4. **"How long can I survive?"** → Burn rate prominently displayed
5. **"What happened?"** → Details available on demand via expandable section

## 🛠 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with animations and responsive design

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1400px+)
- Tablet (768px - 1400px)
- Mobile (< 768px)

## 🎭 Demo Features

### Before & After Comparison

Toggle between the old and new designs to see the improvements side by side.

### Interactive Elements

- Expandable details section
- Hover effects on metric cards
- Animated alert banner
- Responsive P&L visualization

## 📈 Sample Data

The prototype uses mock data matching the screenshot provided:

- **Cash Balance:** -£79.9B (negative)
- **Revenue:** £1,962 (down 99.2%)
- **Expenses:** £243K (flat)
- **Net Loss:** -£241K (down 147.2%)

This extreme data helps demonstrate how the design handles critical situations.

## 🔮 Future Enhancements

- Real-time data integration
- Customizable alert thresholds
- Drill-down into individual metrics
- Export functionality
- Historical trend charts
- Multi-currency support
- Dark mode

## 📝 License

MIT

## 👨‍💻 Author

Created as a prototype demonstrating UX improvements for accounting platforms from a business owner's perspective.
