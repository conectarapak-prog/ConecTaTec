import React from 'react';
import { StatCardProps } from '../types';
import { Icons } from './Icons';

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;

  return (
    <div className="glass-panel rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors text-gray-300 group-hover:text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? (
            <Icons.TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <Icons.TrendingUp className="w-3 h-3 mr-1 rotate-180" />
          )}
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-gray-500 ml-2">vs. mes anterior</span>
      </div>
    </div>
  );
};
