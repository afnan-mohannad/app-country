import React, { useState } from 'react';

const CountryTable = ({ countries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead className="table-info">
          <tr>
            <th>Country Name</th>
            <th>Capital</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map((country, index) => (
            <tr key={index}>
              <td>{country.name}</td>
              <td>{country.capital || 'N/A'}</td>
              <td>
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <li
              key={number + 1}
              className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
            >
              <button onClick={() => goToPage(number + 1)} className="page-link">
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CountryTable;
