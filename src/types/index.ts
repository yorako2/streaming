export type Platform = 
  | 'Netflix' 
  | 'Disney' 
  | 'Star' 
  | 'Prime Video'
  | 'Max'
  | 'Movistar TV'
  | 'Spotify'
  | 'IP TV'
  | 'Plex'
  | 'Movistar'
  | 'Apple TV'
  | 'Crunchyroll'
  | 'Paramount'
  | 'YouTube Premium'
  | 'DirectV Go'
  | 'Vix'
  | 'Magis TV'
  | 'Win Sports'
  | 'Claro Video'
  | 'Xbox Game Pass'
  | 'PlayStation';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  comment?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Provider {
  id: string;
  name: string;
  contact: string;
}

export interface Account {
  id: string;
  providerId: string;
  providerName: string; // Denormalized for convenience
  providerContact: string; // Denormalized for convenience
  platform: Platform;
  email: string;
  password: string;
  profiles: number;
  cost: number;
  paymentDate: Date;
  daysAvailable: number;
  nextPaymentDate: Date;
  status: 'available' | 'rented' | 'inactive';
}

export interface Renewal {
  id: string;
  saleId: string;
  amount: number;
  paymentMethod: string;
  paymentDate: Date;
  days: number;
  nextPaymentDate: Date;
}

export interface Sale {
  id: string;
  type: 'full' | 'profile';
  customerId: string;
  customerName: string; // Denormalized for convenience
  customerContact: string; // Denormalized for convenience
  accountId: string;
  platform: Platform;
  price: number;
  paymentDate: Date;
  expiryDate: Date;
  days: number;
  profileName?: string;
  profilePin?: string;
  paymentMethod: string;
  status: 'active' | 'expired' | 'cancelled';
  renewalHistory: Renewal[];
}

export interface Recharge {
  id: string;
  customerId: string;
  customerName: string; // Denormalized for convenience
  customerContact: string; // Denormalized for convenience
  providerId: string;
  providerName: string; // Denormalized for convenience
  cost: number;
  price: number;
  paymentDate: Date;
  details: string;
}

export interface User {
  username: string;
  name: string;
}

export type PaymentMethod = 'Cash' | 'Transfer' | 'Credit Card' | 'PayPal' | 'Other';

export interface FinancialSummary {
  income: number;
  expenses: number;
  balance: number;
  platformBreakdown: {
    platform: Platform;
    income: number;
    expenses: number;
    balance: number;
  }[];
}

export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  method: string;
  date: Date;
}