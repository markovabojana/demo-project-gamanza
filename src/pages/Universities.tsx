import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { University } from "../models/University";
import { ApiResponse } from "../models/ApiResponse";
import { HeadCell } from "../components/enhanced-table/models";
import EnhancedTable from "../components/enhanced-table/EnhancedTable";
import { getUniversitiesByCountry } from "../services/services";

const Universities = () => {
  const location = useLocation();
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const country = location.search.slice(1).split("&")[0].split("=")[1];
  useEffect(() => {
    getUniversitiesByCountry(country)
      .then((data: ApiResponse[]) => {
        const universitiesResponse = data.map((apiResponse: ApiResponse) => {
          return new University(
            apiResponse.name,
            apiResponse["state-province"],
            apiResponse.web_pages,
            apiResponse.domains
          );
        });
        setUniversities(universitiesResponse);
        setFilteredUniversities(universitiesResponse);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error(error);
      });
  }, [country]);

  const headCells: HeadCell<University>[] = [
    {
      id: "domains",
      label: "Domains",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "state_province",
      label: "State | Location",
    },
    {
      id: "web_pages",
      label: "Web pages",
    },
  ];

  const handleFilter = (searchText: string) => {
    const filtered = universities.filter((university) => {
      return university.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredUniversities(filtered);
  };

  return (
    <div className="App">
      <EnhancedTable
        handleFilter={handleFilter}
        headCells={headCells}
        data={filteredUniversities}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Universities;
