import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EncounterData from "../dataSets/encounters.json";
export default function Encounters() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const consultation_type = searchParams.get("consultation_type") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  
  const encountersArray =
    EncounterData.encounters ||
    EncounterData.data ||
    EncounterData;


  const updateParams = (newParams) => {
    setSearchParams({
      consultation_type,
      from,
      to,
      ...newParams,
    });
  };

  const filteredEncounters = encountersArray.filter((encounter) => {
  const encounterDate = new Date(encounter.date_of_service);

  
  const matchType =
    !consultation_type ||
    encounter.consultation_type === consultation_type;

    const matchFrom =
    !from || encounterDate >= new Date(from);

  const matchTo =
    !to || encounterDate <= new Date(to);

    
  return matchType && matchFrom && matchTo;
});

const lastIndex = currentPage * recordsPerPage;
const firstIndex = lastIndex - recordsPerPage;
const currentData = filteredEncounters.slice(firstIndex, lastIndex);
const totalPages = Math.ceil(filteredEncounters.length / recordsPerPage);


  const handleNavigateToEncounter = (encounterId) => {
    navigate(`/encounters/encounter-details?id=${encounterId}`, {
      state: {
        from: "Encounters",
        query: searchParams.toString()
      },
    });
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Encounters Page</h2>
      <div className="flex flex-wrap gap-4 items-end mb-8 justify-between bg-white p-4 rounded shadow-sm">
        <div className="flex flex-col">
          <label className="mb-1 text-left font-medium">Consultation Type:</label>
          <select
            value={consultation_type}
            onChange={e => updateParams({ consultation_type: e.target.value })}
            className="p-2 rounded border border-gray-300 min-w-45"
          >
            <option value="">Select</option>
            <option value="FH Test">FH Test</option>
            <option value="Get Started - No Results ">Get Started - No Results</option>
            <option value="CDT Consultation">CDT Consultation</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-left font-medium">From</label>
          <input
            type="date"
            value={from}
            onChange={e => updateParams({ from: e.target.value })}
            className="p-2 rounded border border-gray-300 min-w-45"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-left font-medium">To</label>
          <input
            type="date"
            value={to}
            onChange={e => updateParams({ to: e.target.value })}
            className="p-2 rounded border border-gray-300 min-w-45"
          />
        </div>
        <div className="flex flex-col justify-end">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-semibold hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
      {filteredEncounters.length > 0 && (
        <div>
          <h3>Results:</h3>
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
  <table className="min-w-full">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-3 text-left">ID</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Consultation</th>
        <th className="p-3 text-left">Date</th>
        <th className="p-3 text-left">Action</th>
      </tr>
    </thead>

    <tbody>
      {currentData.map((encounter) => (
        <tr key={encounter.id} className="border-b hover:bg-gray-50">
          <td className="p-3">{encounter.id ?? 'Not known'}</td>
          <td className="p-3">{encounter.patient && encounter.patient.name ? encounter.patient.name : 'Not known'}</td>
          <td className="p-3">{encounter.consultation_type ? encounter.consultation_type : 'Not known'}</td>
          <td className="p-3">{encounter.date_of_service ? encounter.date_of_service : 'Not known'}</td>
          <td className="p-3">
            <button
              onClick={() => handleNavigateToEncounter(encounter.id)}
              className="text-blue-600 hover:underline"
            >
              View Encounter
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className="flex justify-center mt-4 gap-2">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-3 py-1 rounded ${
        currentPage === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>
    </div>
      )}
    </div>
  );
}
