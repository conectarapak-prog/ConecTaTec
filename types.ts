import React from 'react';

export enum View {
  DASHBOARD = 'DASHBOARD',
  ANALYTICS = 'ANALYTICS',
  AI_CHAT = 'AI_CHAT',
  SETTINGS = 'SETTINGS',
}

export interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue: number;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}