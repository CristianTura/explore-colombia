
export interface Login {
    email: string;
    password: string;
}
export interface AuthState {
    accessToken: string | null;
    isLoading: boolean;
    dataUser: Login;
}

export interface DashboardState {
    isLoading: boolean;
    dataCountry: DataCountry | null;
    departments: DataDepartment[] | null;
    pagedDepartments: PagedTable | null;
}

export interface DataCountry {
    stateCapital: string;
    region: string;
    population: string;
    surface: string;
    borders: string[];
    subRegion: string;
    currency: string;
    timeZone: string;
    flags: string[];
}

export interface DataDepartment {
    id?: number | string;
    name: string;
    surface?: string;
    population: number;
    phonePrefix?: string;
}

export interface PagedTable {
    page: number;
    pageSize: number;
    totalRecords: number;
    pageCount: number;
}


export interface PagesState {
    isLoading: boolean;
    dataCities: DataCities[] | null;
    pagedCities: PagedTable | null;
    dataPresidents: DataPresidents[] | null;
    pagedPresidents: PagedTable | null;
    touristicAttraction: DataTouristicAttraction[] | null;
    pagedTouristicAttraction: PagedTable | null;
    touristicByDepartment: DataTouristicAttraction[] | null;
}
  
export interface DataCities {
    id?: number | string;
    name: string;
    surface?: string;
    population: number;
    postalCode?: string;
}

export interface DataPresidents {
    id?: number | string;
    name?: string;
    lastName: string;
    startPeriodDate: number;
    endPeriodDate?: string;
    politicalParty?: string;
}

export interface DataTouristicAttraction {
    id?: number | string;
    name?: string;
    images?: string[];
    description?: string;
}


export interface HeadersTableCities {
    title: string;
    refCol: keyof DataCities;
}

export interface HeadersTableDepartments {
    title: string;
    refCol: keyof DataDepartment;
}


export interface DataCard {
    title: string;
    Capital?: string;
    Region?: string;
    Population?: string | number;
    Surface?: string | number;
    Limites?: string;
    "Sub Region"?: string;
    Currency?: string;
    "Time Zone"?: string;
    bgCustom?: string;
}

export interface SeriesData {
    name: string,
    value: string | number,
}


export interface DataGraphDepartments {
    seriesData: SeriesData[];
    legendData: string[];
}

export interface HeadersTablePresident {
    title: string;
    refCol: keyof DataPresidents;
}

type Data = DataCities | DataDepartment;

export interface Header<T> {
  title: string;
  refCol: keyof T;
}

type AnyHeader = Header<DataCities> | Header<DataDepartment>;

export interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  paged: PagedTable | null;
  handleFetch: (page: number, numberPage: number) => void;
  isLoading: boolean;
}