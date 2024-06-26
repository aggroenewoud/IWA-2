export interface HourlyData {
  date: Date;
  CLDC: string;
  DEWP: string;
  FRSHTT: string;
  PRCP: string;
  SLP: string;
  SNDP: string;
  STP: string;
  TEMP: string;
  VISIB: string;
  WDSP: string;
  WNDDIR: string;
}

export interface StationData {
  StationId: string;
  Latitude: number;
  Longitude: number;
  hourlyData: HourlyData[];
}
