export interface WeatherData {
    TEMP: string;
    DEWP: string;
    STP: string;
    SLP: string;
    VISIB: string;
    WDSP: string;
    PRCP: string;
    SNDP: string;
    FRSHTT: string;
    CLDC: string;
    WNDDIR: number;
}

export interface StationData {
    STN: number;
    DATA: WeatherData[];
}