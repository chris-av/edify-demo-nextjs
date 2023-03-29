import Image from 'next/image';
import getHost from '@/utils/get-host';
import { ICountry } from '@/utils/interfaces';

interface PageProps extends ICountry {
  population: number;
  coatOfArms: {
    png?: string;
    svg?: string;
  }
  independent: boolean;
  status: string;
}

export default function CountryPage({
  name,
  cca3, flags, capital,  
  independent, status,
  region, subregion, continents,
  languages, population, coatOfArms
} : PageProps) {
  console.log({ cca3, flags, capital, independent, status });

  const lang = Object.keys(name.nativeName)[0];

  return (
    <div>
      <h1 className="text-center">{name.common}</h1>
      <h2 className="text-center my-2">{name.nativeName[lang].official}</h2>

      <Image
        src={flags.svg}
        height={320}
        width={400}
        alt={name.common}
        sizes="(max-width:700px) 100%"
        className="mx-auto"
      />

      <Image
        src={coatOfArms.svg as string}
        height={320}
        width={200}
        alt={name.common}
        sizes="(max-width:700px) 100%"
        className="mx-auto"
      />


      <div className="grid grid-cols-2">
        <div className="w-full flex">
          <div className="w-1/2">Official Languages:</div>
          <div className="w-1/2">
            { languages && Object.keys(languages).length > 0 && (
              <div>
                { Object.keys(languages).join(', ') }
              </div>
            ) }
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2">Population:</div>
          <div className="w-1/2">{population}</div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2">Capital(s):</div>
          <div className="w-1/2">{capital.join(', ')}</div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2">Region</div>
          <div className="w-1/2">{region}</div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2">Subregion</div>
          <div className="w-1/2">{subregion}</div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2">Continent</div>
          <div className="w-1/2">{continents.join(', ')}</div>
        </div>

      </div>

    </div>
  );
}



interface serverSideProps {
  query: {
    id: string;
  }
}

export async function getServerSideProps({ query } : serverSideProps) {
  const { id: slug } = query;
  const endpoint = getHost() + "api/countries/" + slug;
  const response = await fetch(endpoint);
  const response_data = await response.json();

  try {
    if (response.status !== 200) {
      throw new Error('got failed response', response_data);
    }

    const { country } = response_data;
    return {
      props: country
    };

  } catch (err) {
    console.log(err);
    return {
      props: {
        error: "did not get a successful response"
      }
    }
  }
}

