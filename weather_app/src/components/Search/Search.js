import { AsyncPaginate } from 'react-select-async-paginate'
import { useState } from 'react';
import { GEO_API_URL, geoAPIoptions } from '../../api';
const Search = ({ onSearchChange }) => {
  //setting up search variable
  const [search, setsearch] = useState(null);

  //function for handling search data
  const handleOnChange = (searchData) => {
    setsearch(searchData);
    onSearchChange(searchData);
  }

  //method for finding the relevant cities
  const loadOption = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?countryIds=LK&namePrefix=${inputValue}`, geoAPIoptions)
      .then(response => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`
            }
          })
        }


      })
      .catch(err => console.error(err));

  };


  return (
    <AsyncPaginate
      placeholder="Search for the city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOption}
    />
  );
}

export default Search;