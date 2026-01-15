import React from 'react';

export enum View {
  HOME = 'HOME',
  MAP = 'MAP',
  AI_ASSISTANT = 'AI_ASSISTANT',
  SETTINGS = 'SETTINGS',
  DASHBOARD = 'DASHBOARD',
  ANALYTICS = 'ANALYTICS',
}

export interface RatingMetric {
  category: string;
  score: number; // 0-5
}

export interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price: number; // Base or Daily price
  pricePerHour?: number; // New field for hourly rental
  location: string;
  coordinates: [number, number];
  imageUrl: string;
  images?: string[]; // Array of image URLs for the carousel
  rating: number;
  // New detailed fields
  description?: string;
  sizeM2?: number;
  amenities?: string[]; // e.g., 'wifi', 'parking', 'ac'
  reviewsCount?: number;
  ratingBreakdown?: RatingMetric[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
}
