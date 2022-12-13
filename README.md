# Edify Demo - NextJS


This is my demo for the coding challenge. It is a simple search for countries using the [REST Countries API](https://restcountries.com/). 


The list view is application when it is first loaded: a simple list of countries with their flags (plus a filter at the top to filter). The detail view can be accessed by clicking on the country.


The Countries API is not directly accessed by the frontend, but rather by my backend code. Within the context of NextJS, the frontend consists of the code defined within the scope of the default page export.

Backend code can be found within the `pages/api` folder. I interface with the api using a helper class defined in `utils/countries-api.ts`. My frontend code merely makes calls to my custom server, while my custom server is the one directly fetching resoures from the REST countries API.




## Instructions
This web application was built with NextJS. Therefore, you only need to install dependencies at the root of the project: 


```bash
npm install    # for regular npm
yarn install   # for yarn
pnpm install   # for pnpm
```

## Notes


Since NextJS is a framework for coupling both frontend and backend code, it can be at times confusing knowing which code is running on the server and what is running on the client. Below is a quick snippet of where code is run within a given page route.

```js

// /pages/index.js

export default function HomePage() {
  // your frontend code here
  useEffect(() => {
    // fetching data here would mean fetching data from the client side
  }, []);

  return (
    <div>...</div>
  );

}


export async function getServerSideProps() {
  // this is code that is run in the backend, in order to fetch data before the code reaches the client
  // server side rendering: pre-render the html to minimize the amount of Javascript that is shipped to the client
  // the window object does not exist here: therefore, we are in the backend
}

```

A proper *backend*, however, is defined within the `pages/api` however. The code within this folder is equivalent to what might be written in a traditional backend framework, like `Express`. The default export take request and response arguments, and backend logic is implemented there, where a status and response is returned.



