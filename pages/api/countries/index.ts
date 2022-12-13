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
    const region = req.query.region as string || '';
    const subregion = req.query.subregion as string || '';
    const continent = req.query.continents as string || '';
    const filter : any = {};
    if (region !== undefined && region !== '') { filter.region = region; }
    if (subregion !== undefined && subregion !== '') { filter.subregion = subregion; }
    if (continent !== undefined && continent !== '') { filter.continent = continent; }

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

    const payload = countries.slice(0, 50);
    res.status(200).json({ countries: payload });
    return;

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}
