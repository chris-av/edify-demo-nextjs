export interface ICountryAll {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      }
    }
  }
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean
  status: string;
  unMember: boolean
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  }
  idd: {
    root: string;
    suffixes: string[];
  }
  capital: string[]
  altSpellings: string[]
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  }
  translations: {
    [key: string]: {
      official: string;
      common: string;
    }
  }
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    [key: string]: {
      f: string;
      m: string;
    }
  }
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  }
  population: number;
  gini: {
    [key: number]: number;
  }
  fifa: string;
  car: {
    signs: string[];
    side: string;
  }
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  }
  coatOfArms: {
    png: string;
    svg: string;
  }
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  }
  postalCode: {
    format: string;
    regex: string;
  }
}


export interface ICountry {
  // appears to be included in every request no matter what
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      }
    }
  }
  capital: string[],
  altSpellings: string[];

  // here are the extra fields
  // fields that I want included on every instance of a country query
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean
  status: string;
  flags: {
    png: string;
    svg: string;
  }
  flag: string;
  languages: {
    [key: string]: string;
  };
}

