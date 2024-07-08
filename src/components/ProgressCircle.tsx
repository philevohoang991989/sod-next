import React from 'react';

interface ProgressCircleProps {
  progress: number; // Giá trị progress từ 0 đến 100
  color?: string; // Màu sắc của progress circle
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, color = '#007bff' }) => {
  const strokeDasharray = 283; // 2πr (với r = 45, đường kính = 90, chu vi = 2πr ≈ 283)
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <svg className="progress-circle" width="30" height="30" viewBox="0 0 100 100">
      <circle
        className="progress-circle__background"
        cx="50"
        cy="50"
        r="45"
        stroke="#E7F0F5"
        strokeWidth="10"
        fill="none"
      />
      <circle
        className="progress-circle__progress"
        cx="50"
        cy="50"
        r="45"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      <text x="50" y="50" textAnchor="middle" className='font-medium text-[2rem]' dy=".3em" fontSize="30">
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default ProgressCircle;