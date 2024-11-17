export interface Location {
    id: number;
    name: string;
    address: string;
    coordinates: [number, number];
    status?: string;
    lastUpdate?: string;
  }