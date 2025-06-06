import React, { useEffect, useState } from 'react';
import CountryTable from './Component/CountryTable';

function App() {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const formattedData = data.map((country) => ({
          name: country.name.common,
          capital: country.capital?.[0] ?? 'N/A',
          flag: country.flags.svg,
        }));

        const palestine = formattedData.find(c => c.name === 'Palestine');
        if (palestine) {
          palestine.capital = 'Jerusalem';
        }

        const rest = formattedData.filter(
          c => c.name !== 'Israel' && c.name !== 'Palestine'
        );

        const sortedData = palestine ? [palestine, ...rest] : rest;

        setCountryList(sortedData);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Countries List</h1>
      <CountryTable countries={countryList} />
    </div>
  );
}

export default App;
