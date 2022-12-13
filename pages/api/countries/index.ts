// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CountriesAPI } from '@/utils/countries-api';
import { ICountry } from '@/utils/interfaces';

const api = new CountriesAPI()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = new URL("http://" + req.headers.host + req.url);

    const countryName = url.searchParams.get('country_name') || '';
    const region = url.searchParams.get('region') || '';
    const subregion = url.searchParams.get('subregion') || '';
    const continent = url.searchParams.get('continent') || '';

    let countries : ICountry[] = await api.getCountries();

    // filter all the countries 
    if (region !== '') {
      countries = countries.filter(country => country.region === region);
    }

    if (subregion !== '') {
      countries = countries.filter(country => country.subregion === subregion);
    }

    if (continent !== '') {
      countries = countries.filter(country => country.continents.includes(continent));
    }

    if (countryName !== '') {
      countries = countries.filter(country => country.name.common.includes(countryName));
    }

    const payload = countries.slice(0, 50);
    res.status(200).json({ countries: payload });
    return;

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}
