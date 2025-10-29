export interface Guest {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
}

export interface Room {
  uid: string;
  room: string;
  guest?: Guest;
}

export interface PolaroidData {
  images: string[];
  guest: Guest;
  timestamp: string;
}

export type AppStep = 
  | 'welcome'
  | 'scanning'
  | 'consent'
  | 'camera'
  | 'processing'
  | 'preview'
  | 'complete';
