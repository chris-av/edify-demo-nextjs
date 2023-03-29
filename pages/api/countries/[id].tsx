import type { NextApiRequest, NextApiResponse } from 'next'
import { CountriesAPI } from '@/utils/countries-api';
import { ICountry } from '@/utils/interfaces';

const api = new CountriesAPI()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id as string;

    let country : ICountry = await api.getCountryById(id);

    res.status(200).json({ country });

    return;

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}
