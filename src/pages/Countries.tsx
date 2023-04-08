import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadCell, ITableRow } from "../components/enhanced-table/models";
import EnhancedTable from "../components/enhanced-table/EnhancedTable";
import { Country } from "../models/Country";
import { ApiResponse } from "../models/ApiResponse";
import { getCountries } from "../services/services";

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = () => {
      getCountries()
        .then((data) => {
          const countries: Country[] = Array.from(
            new Set(
              data
                .map((apiResponse: ApiResponse) => {
                  return {
                    isoCode: apiResponse.alpha_two_code,
                    name: apiResponse.country,
                  };
                })
                .map((country: Country) => JSON.stringify(country))
            )
          ).map((country: string) => JSON.parse(country));

          setCountries(countries);
          setFilteredCountries(countries);
        })
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCountries();
  }, []);

  const headCells: HeadCell<Country>[] = [
    {
      id: "isoCode",
      label: "Country Flag",
    },
    {
      id: "name",
      label: "Country Name",
    },
  ];

  const handleCountryClick = (row: ITableRow) => {
    console.log("clicked" + row.name);
    navigate({
      pathname: "/universities",
      search: `?country=${row.name}`,
    });
  };

  const handleFilter = (searchText: string) => {
    const filtered = countries.filter((country) => {
      return country.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <EnhancedTable
        handleFilter={handleFilter}
        handleOnClick={handleCountryClick}
        data={filteredCountries}
        headCells={headCells}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Countries;
