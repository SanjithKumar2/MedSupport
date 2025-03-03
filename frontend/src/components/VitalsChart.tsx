import React from 'react';
import { VitalHistory } from '../types';

interface VitalsChartProps {
  history: VitalHistory[];
}

const VitalsChart: React.FC<VitalsChartProps> = ({ history }) => {
  // Only use the last 10 data points for the chart
  const chartData = history.slice(-10);
  
  // Calculate min and max values for scaling
  const heartRates = chartData.map(d => d.heartRate);
  const maxHR = Math.max(...heartRates) + 5;
  const minHR = Math.min(...heartRates) - 5;
  
  const o2Levels = chartData.map(d => d.oxygenSaturation);
  const maxO2 = 100;
  const minO2 = Math.min(...o2Levels) - 2 < 90 ? Math.min(...o2Levels) - 2 : 90;

  // Scale a value to fit in the chart height (0-100)
  const scaleHR = (value: number) => {
    return 100 - ((value - minHR) / (maxHR - minHR) * 100);
  };
  
  const scaleO2 = (value: number) => {
    return 100 - ((value - minO2) / (maxO2 - minO2) * 100);
  };

  // Create SVG path for heart rate
  const hrPoints = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = scaleHR(d.heartRate);
    return `${x},${y}`;
  }).join(' ');

  // Create SVG path for O2 saturation
  const o2Points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = scaleO2(d.oxygenSaturation);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-32 w-full bg-gray-900 rounded-lg p-2 relative">
      {/* Chart title and legend */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center text-xs">
        <div className="text-gray-400">Vitals Trend (Last 30 min)</div>
        <div className="flex space-x-3">
          <div className="flex items-center">
            <span className="inline-block w-3 h-1 bg-red-500 mr-1"></span>
            <span className="text-gray-400">HR</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-1 bg-blue-500 mr-1"></span>
            <span className="text-gray-400">SpO₂</span>
          </div>
        </div>
      </div>

      {/* Grid lines */}
      <svg width="100%" height="100%" className="mt-4">
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* Heart rate line */}
        <polyline
          points={hrPoints}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* O2 saturation line */}
        <polyline
          points={o2Points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
      </svg>
      
      {/* Y-axis labels */}
      <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-[10px] text-gray-500 py-6">
        <div>{Math.round(maxHR)}</div>
        <div>{Math.round(minHR)}</div>
      </div>
      
      <div className="absolute top-0 right-0 h-full flex flex-col justify-between text-[10px] text-gray-500 py-6">
        <div>{Math.round(maxO2)}%</div>
        <div>{Math.round(minO2)}%</div>
      </div>
    </div>
  );
};

export default VitalsChart;