export class CountriesAPI {
  /** 
   * interface with the countries API, to be used in the backend
   * doesn't take any arguments, just initialize the class and use the methods
  */
  baseURL: string;
  params: any;

  constructor() {
    this.baseURL = "https://restcountries.com/v3.1/";
    this.params = {
      fields: [
        'name', 'flags', 'flag',
        'ccn3', 'cca3', 'cioc',
        'capital', 'languages', 'latlng',
        'region', 'subregion', 'continents',
      ].join(','),
    };
  }

  async getCountries() {
    const params = new URLSearchParams({
      ...this.params 
    });

    const response = await fetch(this.baseURL + "all?" + params.toString());
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error('got unexpected status', { cause: { status: response.status, data } });
    }

    return data;

  }

  async getCountriesByRegion({ region } : { region: string }) {

    const params = new URLSearchParams({
      ...this.params,
    });

    if (!region) {
      throw new Error('Need to provide provide both region and subregion to use the getCountriesByRegion method!!');
    }

    const response = await fetch(`${this.baseURL}/region/${region}?${params.toString()}`);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error('got unexpected status', { cause: { status: response.status, data } })
    }

    return data;

  }

  async getCountriesBySubRegion({ subregion } : { subregion: string }) {
    const params = new URLSearchParams({
      ...this.params,
    });

    if (!subregion) {
      throw new Error('Need to provide provide both region and subregion to use the getCountriesBySubRegion method!!');
    }

    const response = await fetch(this.baseURL + `subregion/${subregion}?${params.toString()}`);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error('got unexpected status', { cause: { status: response.status, data } })
    }

    return data;

  }

  async getCountryById(id: string) {

    const params = new URLSearchParams({
      fields: [
        this.params.fields,
        'coatOfArms', 'population',
        'independent', 'status',
      ]
    } as any);

    if (!id) {
      throw new Error('need to provide id for this route');
    }

    const response = await fetch(this.baseURL + `alpha/${id}?${params.toString()}`);
    const data = response.json();

    if (response.status !== 200) {
      throw new Error('got unexpected status', { cause: { status: response.status, data } });
    }

    return data;

  }

  // async getCountryByName(name: string) {
  //   return;
  // }


}


